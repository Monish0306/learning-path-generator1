// Load environment variables - MUST BE FIRST!
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { generateAssessmentQuestions, generateSubtopicQuestions } = require('./services/groq');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Store for user sessions (in production, use a proper database)
const userSessions = new Map();

// Cache for generated questions to avoid re-generating during same session
const questionCache = new Map();

// FIXED: Utility function to load question data (fallback for basic level or when AI fails)
function loadQuestionData(subject) {
    const subjectMap = {
        'python': 'python.json',
        'daa': 'daa.json',
        'ml': 'ml.json',
        'ai': 'ai.json',
        'dbms': 'dbms.json',
        'java': 'java.json',
        'cpp': 'cpp.json',
        'c': 'c.json'
    };

    const filename = subjectMap[subject.toLowerCase()];
    if (!filename) {
        throw new Error('Invalid subject');
    }

    const filePath = path.join(__dirname, 'data', 'questions', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Question file not found: ${filePath}`);
        return null;
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Shuffle array utility
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Generate unique questions
function generateUniqueQuestions(questions, count, usedQuestionIds = new Set()) {
    const availableQuestions = questions.filter(q => !usedQuestionIds.has(q.id));
    
    if (availableQuestions.length < count) {
        // If not enough unused questions, reset and shuffle all
        const shuffled = shuffleArray(questions);
        return shuffled.slice(0, count);
    }
    
    const shuffled = shuffleArray(availableQuestions);
    return shuffled.slice(0, count);
}

// API Routes

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        groqEnabled: !!process.env.GROQ_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// Get all available subjects
app.get('/api/subjects', (req, res) => {
    const subjects = [
        { id: 'python', name: 'Python Programming', icon: '🐍' },
        { id: 'daa', name: 'Design and Analysis of Algorithms', icon: '⚡' },
        { id: 'ml', name: 'Machine Learning', icon: '🤖' },
        { id: 'ai', name: 'Artificial Intelligence', icon: '🧠' },
        { id: 'dbms', name: 'Database Management Systems', icon: '🗄️' },
        { id: 'java', name: 'Java Programming', icon: '☕' },
        { id: 'cpp', name: 'C++ Programming', icon: '⚙️' },
        { id: 'c', name: 'C Programming', icon: '💻' }
    ];
    res.json(subjects);
});

// Start initial assessment with difficulty level
app.post('/api/assessment/start', async (req, res) => {
    try {
        const { userId, subject, difficulty } = req.body;
        
        if (!userId || !subject) {
            return res.status(400).json({ error: 'Missing userId or subject' });
        }

        // Default to 'medium' if difficulty not specified
        const selectedDifficulty = difficulty || 'medium';
        
        console.log(`📝 Starting ${selectedDifficulty} assessment for ${subject}`);

        let selectedQuestions = [];

        // Check if Groq API key is available
        const hasGroqKey = !!process.env.GROQ_API_KEY;
        
        if (hasGroqKey) {
            try {
                // Generate questions using Groq AI
                console.log(`🤖 Using Groq AI for ${selectedDifficulty} level questions`);
                selectedQuestions = await generateAssessmentQuestions(subject, selectedDifficulty, 10);
            } catch (groqError) {
                console.error('❌ Groq generation failed, falling back to question bank:', groqError);
                // Fall back to question bank
                selectedQuestions = getFallbackQuestions(subject, selectedDifficulty);
            }
        } else {
            console.log('📚 Using question bank (Groq API key not configured)');
            selectedQuestions = getFallbackQuestions(subject, selectedDifficulty);
        }

        if (selectedQuestions.length === 0) {
            return res.status(404).json({ error: 'No questions available for this subject' });
        }
        
        // Initialize user session
        if (!userSessions.has(userId)) {
            userSessions.set(userId, {});
        }
        
        const userSession = userSessions.get(userId);
        userSession[subject] = {
            usedQuestionIds: new Set(),
            topicScores: {},
            completedTopics: new Set(),
            learningPath: [],
            currentAssessment: selectedQuestions.map(q => q.id),
            currentQuestions: selectedQuestions, // Store full questions for grading
            difficulty: selectedDifficulty
        };

        // Return questions without correct answers
        const questionsForClient = selectedQuestions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options
        }));

        res.json({
            questions: questionsForClient,
            totalQuestions: selectedQuestions.length,
            difficulty: selectedDifficulty,
            generatedByAI: hasGroqKey
        });

    } catch (error) {
        console.error('Error starting assessment:', error);
        res.status(500).json({ error: 'Failed to start assessment: ' + error.message });
    }
});

// Helper function to get fallback questions from question bank
function getFallbackQuestions(subject, difficulty) {
    const questionData = loadQuestionData(subject);
    
    if (!questionData || !questionData.initialAssessment) {
        return [];
    }

    let questions = questionData.initialAssessment || [];
    
    // Filter by difficulty if the question bank has difficulty tags
    if (difficulty && questions.some(q => q.difficulty)) {
        const filtered = questions.filter(q => q.difficulty === difficulty);
        if (filtered.length >= 10) {
            questions = filtered;
        }
    }
    
    return shuffleArray(questions).slice(0, 10);
}

// Submit assessment and get learning path
app.post('/api/assessment/submit', async (req, res) => {
    try {
        const { userId, subject, answers } = req.body;

        if (!userId || !subject || !answers) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const userSession = userSessions.get(userId)?.[subject];

        if (!userSession) {
            return res.status(400).json({ error: 'No active session found' });
        }

        // Get stored questions from session
        const sessionQuestions = userSession.currentQuestions || [];

        // Calculate scores for each topic
        const topicScores = {};
        
        answers.forEach((answer) => {
            const question = sessionQuestions.find(q => q.id === answer.questionId);
            if (question) {
                const isCorrect = answer.selectedOption === question.correct;
                const topic = question.topic || 'general';
                
                if (!topicScores[topic]) {
                    topicScores[topic] = { correct: 0, total: 0 };
                }
                topicScores[topic].total++;
                if (isCorrect) {
                    topicScores[topic].correct++;
                }
            }
        });

        // Calculate percentage for each topic
        const topicPercentages = {};
        Object.keys(topicScores).forEach(topic => {
            const score = topicScores[topic];
            topicPercentages[topic] = (score.correct / score.total) * 100;
        });

        // Generate learning path
        const questionData = loadQuestionData(subject);
        let learningPath = [];
        
        if (questionData && questionData.topics) {
            learningPath = generateLearningPath(questionData, topicPercentages);
        } else {
            // If no question data, create basic learning path from topics
            learningPath = Object.keys(topicPercentages).map((topic, index) => ({
                id: topic,
                name: formatTopicName(topic),
                score: topicPercentages[topic],
                subtopics: []
            }));
        }

        // Update user session
        userSession.topicScores = topicPercentages;
        userSession.learningPath = learningPath;

        // Calculate overall score
        const totalCorrect = answers.filter((answer) => {
            const question = sessionQuestions.find(q => q.id === answer.questionId);
            return question && answer.selectedOption === question.correct;
        }).length;

        const overallScore = (totalCorrect / answers.length) * 100;

        res.json({
            overallScore: overallScore.toFixed(2),
            topicScores: topicPercentages,
            learningPath: learningPath,
            weakTopics: Object.keys(topicPercentages).filter(t => topicPercentages[t] < 60)
        });

    } catch (error) {
        console.error('Error submitting assessment:', error);
        res.status(500).json({ error: 'Failed to submit assessment: ' + error.message });
    }
});

// Generate learning path using topological sort
function generateLearningPath(questionData, topicScores) {
    const topics = questionData.topics;
    const graph = new Map();
    const inDegree = new Map();
    const topicData = new Map();

    // Build graph and calculate in-degrees
    topics.forEach(topic => {
        graph.set(topic.id, topic.prerequisites || []);
        topicData.set(topic.id, topic);
        
        if (!inDegree.has(topic.id)) {
            inDegree.set(topic.id, 0);
        }

        (topic.prerequisites || []).forEach(prereq => {
            if (!graph.has(prereq)) {
                graph.set(prereq, []);
            }
            inDegree.set(topic.id, (inDegree.get(topic.id) || 0) + 1);
        });
    });

    // Topological sort with priority based on weak topics
    const queue = [];
    const result = [];

    // Add all topics with no prerequisites
    for (const [topicId, degree] of inDegree.entries()) {
        if (degree === 0) {
            queue.push(topicId);
        }
    }

    // Sort queue by score (prioritize weak topics)
    queue.sort((a, b) => (topicScores[a] || 100) - (topicScores[b] || 100));

    while (queue.length > 0) {
        const current = queue.shift();
        const topic = topicData.get(current);
        
        if (topic) {
            result.push({
                id: topic.id,
                name: topic.name,
                score: topicScores[topic.id] || 0,
                subtopics: topic.subtopics || []
            });
        }

        // Process dependent topics
        topics.forEach(topic => {
            if (topic.prerequisites && topic.prerequisites.includes(current)) {
                inDegree.set(topic.id, inDegree.get(topic.id) - 1);
                if (inDegree.get(topic.id) === 0) {
                    queue.push(topic.id);
                    // Re-sort queue to prioritize weak topics
                    queue.sort((a, b) => (topicScores[a] || 100) - (topicScores[b] || 100));
                }
            }
        });
    }

    return result;
}

// Get quiz for a specific subtopic with difficulty
app.post('/api/quiz/subtopic', async (req, res) => {
    try {
        const { userId, subject, topicId, subtopicId, difficulty } = req.body;

        if (!userId || !subject || !topicId || !subtopicId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const selectedDifficulty = difficulty || 'medium';
        
        console.log(`📝 Starting ${selectedDifficulty} subtopic quiz for ${subtopicId}`);

        let quizQuestions = [];
        const hasGroqKey = !!process.env.GROQ_API_KEY;

        if (hasGroqKey) {
            try {
                // Get topic and subtopic names for better context
                const questionData = loadQuestionData(subject);
                let topicName = topicId;
                let subtopicName = subtopicId;
                
                if (questionData && questionData.topics) {
                    const topic = questionData.topics.find(t => t.id === topicId);
                    if (topic) {
                        topicName = topic.name;
                        const subtopic = topic.subtopics?.find(st => st.id === subtopicId);
                        if (subtopic) {
                            subtopicName = subtopic.name;
                        }
                    }
                }

                console.log(`🤖 Generating AI questions for ${subtopicName} using Groq`);
                quizQuestions = await generateSubtopicQuestions(
                    subject,
                    topicName,
                    subtopicName,
                    selectedDifficulty,
                    6
                );
            } catch (groqError) {
                console.error('❌ Groq failed, using question bank:', groqError);
                quizQuestions = getFallbackSubtopicQuestions(subject, topicId, subtopicId, selectedDifficulty);
            }
        } else {
            quizQuestions = getFallbackSubtopicQuestions(subject, topicId, subtopicId, selectedDifficulty);
        }

        if (quizQuestions.length === 0) {
            return res.status(404).json({ error: 'No questions found for this subtopic' });
        }

        // Get user session to track used questions
        let userSession = userSessions.get(userId)?.[subject];
        if (!userSession) {
            if (!userSessions.has(userId)) {
                userSessions.set(userId, {});
            }
            userSession = {
                usedQuestionIds: new Set(),
                topicScores: {},
                completedTopics: new Set(),
                learningPath: [],
                difficulty: selectedDifficulty
            };
            userSessions.get(userId)[subject] = userSession;
        }

        // Store questions in session for later verification
        userSession.currentQuestions = quizQuestions;

        // Return questions without correct answers
        const questionsForClient = quizQuestions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options
        }));

        res.json({
            questions: questionsForClient,
            subtopicName: subtopicId,
            totalQuestions: questionsForClient.length,
            difficulty: selectedDifficulty,
            generatedByAI: hasGroqKey
        });

    } catch (error) {
        console.error('Error getting subtopic quiz:', error);
        res.status(500).json({ error: 'Failed to get quiz: ' + error.message });
    }
});

// Helper function for fallback subtopic questions
function getFallbackSubtopicQuestions(subject, topicId, subtopicId, difficulty) {
    const questionData = loadQuestionData(subject);
    
    if (!questionData || !questionData.topics) {
        return [];
    }

    const topic = questionData.topics.find(t => t.id === topicId);
    if (!topic) {
        return [];
    }

    const subtopic = topic.subtopics?.find(st => st.id === subtopicId);
    if (!subtopic || !subtopic.questions) {
        return [];
    }

    let questions = subtopic.questions;
    
    // Filter by difficulty if available
    if (difficulty && questions.some(q => q.difficulty)) {
        const filtered = questions.filter(q => q.difficulty === difficulty);
        if (filtered.length >= 3) {
            questions = filtered;
        }
    }

    return shuffleArray(questions).slice(0, 6);
}

// Submit subtopic quiz
app.post('/api/quiz/submit', async (req, res) => {
    try {
        const { userId, subject, topicId, subtopicId, answers } = req.body;

        if (!userId || !subject || !answers) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const userSession = userSessions.get(userId)?.[subject];
        const sessionQuestions = userSession?.currentQuestions || [];

        // Calculate score
        let correct = 0;
        const results = answers.map(answer => {
            const question = sessionQuestions.find(q => q.id === answer.questionId);
            if (question) {
                const isCorrect = answer.selectedOption === question.correct;
                if (isCorrect) correct++;
                return {
                    questionId: answer.questionId,
                    correct: isCorrect,
                    selectedOption: answer.selectedOption,
                    correctOption: question.correct,
                    explanation: question.explanation || ''
                };
            }
            return null;
        }).filter(r => r !== null);

        const score = (correct / answers.length) * 100;

        // Update user session
        if (userSession && subtopicId) {
            userSession.topicScores[subtopicId] = score;
            if (score >= 60) {
                userSession.completedTopics.add(subtopicId);
            }
        }

        res.json({
            score: score.toFixed(2),
            correct: correct,
            total: answers.length,
            passed: score >= 60,
            results: results
        });

    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Failed to submit quiz: ' + error.message });
    }
});

// Get learning path for user
app.get('/api/learning-path/:userId/:subject', (req, res) => {
    try {
        const { userId, subject } = req.params;
        
        const userSession = userSessions.get(userId)?.[subject];
        
        if (!userSession || !userSession.learningPath) {
            return res.status(404).json({ error: 'No learning path found. Please complete the initial assessment first.' });
        }

        res.json({
            learningPath: userSession.learningPath,
            completedTopics: Array.from(userSession.completedTopics || []),
            topicScores: userSession.topicScores || {},
            difficulty: userSession.difficulty || 'medium'
        });

    } catch (error) {
        console.error('Error getting learning path:', error);
        res.status(500).json({ error: 'Failed to get learning path: ' + error.message });
    }
});

// Helper function to format topic names
function formatTopicName(topicId) {
    return topicId
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 Learning Path Generator is ready!`);
    console.log(`🤖 Groq AI: ${process.env.GROQ_API_KEY ? '✅ Enabled' : '❌ Disabled (using question bank)'}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});