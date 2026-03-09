const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Store for user sessions (in production, use a proper database)
const userSessions = new Map();

// Utility function to load question data
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

// Health check endpoint for Render (IMPORTANT!)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
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

// Start initial assessment
app.post('/api/assessment/start', (req, res) => {
    try {
        const { userId, subject } = req.body;
        
        if (!userId || !subject) {
            return res.status(400).json({ error: 'Missing userId or subject' });
        }

        const questionData = loadQuestionData(subject);
        
        // Get initial assessment questions
        const assessmentQuestions = questionData.initialAssessment || [];
        
        if (assessmentQuestions.length === 0) {
            return res.status(404).json({ error: 'No assessment questions found for this subject' });
        }

        // Shuffle and select questions
        const selectedQuestions = shuffleArray(assessmentQuestions).slice(0, 10);
        
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
            currentAssessment: selectedQuestions.map(q => q.id)
        };

        // Return questions without correct answers
        const questionsForClient = selectedQuestions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options
        }));

        res.json({
            questions: questionsForClient,
            totalQuestions: selectedQuestions.length
        });

    } catch (error) {
        console.error('Error starting assessment:', error);
        res.status(500).json({ error: 'Failed to start assessment: ' + error.message });
    }
});

// Submit assessment and get learning path
app.post('/api/assessment/submit', (req, res) => {
    try {
        const { userId, subject, answers } = req.body;

        if (!userId || !subject || !answers) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const questionData = loadQuestionData(subject);
        const userSession = userSessions.get(userId)?.[subject];

        if (!userSession) {
            return res.status(400).json({ error: 'No active session found' });
        }

        // Calculate scores for each topic
        const topicScores = {};
        const assessmentQuestions = questionData.initialAssessment;

        answers.forEach((answer, index) => {
            const question = assessmentQuestions.find(q => q.id === answer.questionId);
            if (question) {
                const isCorrect = answer.selectedOption === question.correct;
                const topics = Array.isArray(question.topics) ? question.topics : [question.topics];
                
                topics.forEach(topic => {
                    if (!topicScores[topic]) {
                        topicScores[topic] = { correct: 0, total: 0 };
                    }
                    topicScores[topic].total++;
                    if (isCorrect) {
                        topicScores[topic].correct++;
                    }
                });
            }
        });

        // Calculate percentage for each topic
        const topicPercentages = {};
        Object.keys(topicScores).forEach(topic => {
            const score = topicScores[topic];
            topicPercentages[topic] = (score.correct / score.total) * 100;
        });

        // Generate learning path using topological sort
        const learningPath = generateLearningPath(questionData, topicPercentages);

        // Update user session
        userSession.topicScores = topicPercentages;
        userSession.learningPath = learningPath;

        // Calculate overall score
        const totalCorrect = answers.filter((answer, index) => {
            const question = assessmentQuestions.find(q => q.id === answer.questionId);
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

// Get quiz for a specific subtopic
app.post('/api/quiz/subtopic', (req, res) => {
    try {
        const { userId, subject, topicId, subtopicId } = req.body;

        if (!userId || !subject || !topicId || !subtopicId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const questionData = loadQuestionData(subject);
        const topic = questionData.topics.find(t => t.id === topicId);

        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        let subtopic = null;
        for (const st of topic.subtopics) {
            if (st.id === subtopicId) {
                subtopic = st;
                break;
            }
        }

        if (!subtopic || !subtopic.questions || subtopic.questions.length === 0) {
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
                learningPath: []
            };
            userSessions.get(userId)[subject] = userSession;
        }

        // Generate unique questions
        const quizQuestions = generateUniqueQuestions(
            subtopic.questions,
            Math.min(6, subtopic.questions.length),
            userSession.usedQuestionIds
        );

        // Mark questions as used
        quizQuestions.forEach(q => userSession.usedQuestionIds.add(q.id));

        // Return questions without correct answers
        const questionsForClient = quizQuestions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options
        }));

        res.json({
            questions: questionsForClient,
            subtopicName: subtopic.name,
            totalQuestions: questionsForClient.length
        });

    } catch (error) {
        console.error('Error getting subtopic quiz:', error);
        res.status(500).json({ error: 'Failed to get quiz: ' + error.message });
    }
});

// Submit subtopic quiz
app.post('/api/quiz/submit', (req, res) => {
    try {
        const { userId, subject, topicId, subtopicId, answers } = req.body;

        if (!userId || !subject || !answers) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const questionData = loadQuestionData(subject);
        
        // Find all questions from all subtopics
        let allQuestions = [];
        questionData.topics.forEach(topic => {
            topic.subtopics.forEach(subtopic => {
                allQuestions = allQuestions.concat(subtopic.questions);
            });
        });

        // Calculate score
        let correct = 0;
        const results = answers.map(answer => {
            const question = allQuestions.find(q => q.id === answer.questionId);
            if (question) {
                const isCorrect = answer.selectedOption === question.correct;
                if (isCorrect) correct++;
                return {
                    questionId: answer.questionId,
                    correct: isCorrect,
                    selectedOption: answer.selectedOption,
                    correctOption: question.correct
                };
            }
            return null;
        }).filter(r => r !== null);

        const score = (correct / answers.length) * 100;

        // Update user session
        const userSession = userSessions.get(userId)?.[subject];
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
            topicScores: userSession.topicScores || {}
        });

    } catch (error) {
        console.error('Error getting learning path:', error);
        res.status(500).json({ error: 'Failed to get learning path: ' + error.message });
    }
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server - IMPORTANT: Listen on 0.0.0.0 for Render
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 Learning Path Generator is ready!`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});