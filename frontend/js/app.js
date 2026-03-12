// API Configuration for Production
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://learning-path-backend-5v2v.onrender.com';

// Global state
let currentState = {
    userId: null,
    userName: null,
    university: null,
    email: null,
    currentSubject: null,
    currentSubjectName: null,
    currentDifficulty: null,
    currentQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    assessmentResults: null,
    learningPath: [],
    currentTopic: null,
    currentSubtopic: null,
    currentSubtopicName: null,
    userProfile: null
};

// ==================== UTILITY FUNCTIONS ====================
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function showScreen(screenId) {
    console.log('📺 Showing screen:', screenId);
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    } else {
        console.error('❌ Screen not found:', screenId);
    }
}

function showLoading() {
    const loader = document.getElementById('loading-spinner');
    if (loader) loader.classList.remove('hidden');
}

function hideLoading() {
    const loader = document.getElementById('loading-spinner');
    if (loader) loader.classList.add('hidden');
}

// ADDED: Helper function to get score class
function getScoreClass(score) {
    if (score >= 75) return 'score-high';
    if (score >= 50) return 'score-medium';
    return 'score-low';
}

// ADDED: Helper function to format date
function formatDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
}

async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        console.log(`🌐 API Call: ${method} ${API_BASE_URL}${endpoint}`);
        if (data) console.log('📦 Request data:', data);
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        console.log(`📡 Response status: ${response.status}`);
        
        if (!response.ok) {
            const error = await response.json();
            console.error('❌ API Error:', error);
            throw new Error(error.error || 'API request failed');
        }
        
        const result = await response.json();
        console.log('✅ API Success:', result);
        return result;
    } catch (error) {
        console.error('❌ API Call Failed:', error);
        alert('Error: ' + error.message);
        throw error;
    }
}

// ==================== NAVIGATION FUNCTIONS ====================

function showWelcome() {
    console.log('🏠 Showing welcome screen');
    showScreen('welcome-screen');
}

function showAuthScreen() {
    showScreen('auth-screen');
    showLoginForm();
}

function backToSubjectSelection() {
    if (currentState.currentQuestions.length > 0) {
        const confirmed = confirm('Are you sure you want to change subject? Your current progress will be lost.');
        if (!confirmed) return;
    }
    
    currentState.currentQuestions = [];
    currentState.currentQuestionIndex = 0;
    currentState.userAnswers = [];
    currentState.currentSubject = null;
    currentState.currentDifficulty = null;
    
    loadSubjects();
}

// ==================== SUBJECT LOADING ====================

async function loadSubjects() {
    try {
        showLoading();
        const subjects = await apiCall('/api/subjects');
        
        const subjectsGrid = document.getElementById('subjects-grid');
        if (subjectsGrid) {
            subjectsGrid.innerHTML = '';
            
            subjects.forEach(subject => {
                const card = document.createElement('div');
                card.className = 'subject-card';
                card.innerHTML = `
                    <span class="subject-icon">${subject.icon}</span>
                    <h3 class="subject-name">${subject.name}</h3>
                `;
                card.onclick = () => showDifficultySelection(subject.id, subject.name);
                subjectsGrid.appendChild(card);
            });
        }
        
        showScreen('subject-selection-screen');
    } catch (error) {
        console.error('Error loading subjects:', error);
    } finally {
        hideLoading();
    }
}

// ==================== DIFFICULTY SELECTION ====================

function showDifficultySelection(subjectId, subjectName) {
    currentState.currentSubject = subjectId;
    currentState.currentSubjectName = subjectName;
    
    const subjectNameEl = document.getElementById('difficulty-subject-name');
    if (subjectNameEl) {
        subjectNameEl.textContent = `Choose your knowledge level for ${subjectName}`;
    }
    
    showScreen('difficulty-selection-screen');
}

async function selectDifficulty(difficulty) {
    currentState.currentDifficulty = difficulty;
    
    console.log(`📊 Selected difficulty: ${difficulty} for ${currentState.currentSubjectName}`);
    
    await startAssessmentWithDifficulty(
        currentState.currentSubject,
        currentState.currentSubjectName,
        difficulty
    );
}

function getDifficultyBadge(difficulty) {
    const badges = {
        'basic': '<span class="difficulty-badge basic">📚 Basic</span>',
        'medium': '<span class="difficulty-badge medium">⚡ Medium</span>',
        'advanced': '<span class="difficulty-badge advanced">🔥 Advanced</span>'
    };
    return badges[difficulty] || badges['medium'];
}

// ==================== ASSESSMENT FUNCTIONS ====================

async function startAssessmentWithDifficulty(subjectId, subjectName, difficulty) {
    try {
        showLoading();
        currentState.currentSubject = subjectId;
        currentState.currentDifficulty = difficulty;
        
        console.log(`🎯 Starting ${difficulty} assessment for ${subjectName}`);
        
        const data = await apiCall('/api/assessment/start', 'POST', {
            userId: currentState.userId,
            subject: subjectId,
            difficulty: difficulty
        });
        
        currentState.currentQuestions = data.questions;
        currentState.currentQuestionIndex = 0;
        currentState.userAnswers = new Array(data.questions.length).fill(null);
        
        const title = document.getElementById('assessment-title');
        if (title) {
            const difficultyBadge = getDifficultyBadge(difficulty);
            title.innerHTML = `${subjectName} - ${difficultyBadge} Assessment`;
        }
        
        // REMOVED: AI badge code - no more showAIBadge()
        
        displayQuestion();
        showScreen('assessment-screen');
    } catch (error) {
        console.error('Error starting assessment:', error);
        alert('Error starting assessment. Please try again.');
    } finally {
        hideLoading();
    }
}

async function startAssessment(subjectId, subjectName) {
    await startAssessmentWithDifficulty(subjectId, subjectName, 'medium');
}

function displayQuestion() {
    const question = currentState.currentQuestions[currentState.currentQuestionIndex];
    const totalQuestions = currentState.currentQuestions.length;
    const currentIndex = currentState.currentQuestionIndex;
    
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
    const progressBar = document.getElementById('assessment-progress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    const counter = document.getElementById('question-counter');
    if (counter) {
        counter.textContent = `Question ${currentIndex + 1} of ${totalQuestions}`;
    }
    
    const questionText = document.getElementById('question-text');
    if (questionText) {
        questionText.textContent = question.question;
    }
    
    const optionsContainer = document.getElementById('options-container');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            if (currentState.userAnswers[currentIndex] === index) {
                optionDiv.classList.add('selected');
            }
            optionDiv.textContent = option;
            optionDiv.onclick = () => selectOption(index);
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
    }
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        if (currentIndex === totalQuestions - 1) {
            nextBtn.textContent = 'Submit Assessment';
        } else {
            nextBtn.textContent = 'Next';
        }
    }
}

function selectOption(optionIndex) {
    currentState.userAnswers[currentState.currentQuestionIndex] = optionIndex;
    
    const options = document.querySelectorAll('#options-container .option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

function previousQuestion() {
    if (currentState.currentQuestionIndex > 0) {
        currentState.currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    const currentIndex = currentState.currentQuestionIndex;
    const totalQuestions = currentState.currentQuestions.length;
    
    if (currentState.userAnswers[currentIndex] === null) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (currentIndex < totalQuestions - 1) {
        currentState.currentQuestionIndex++;
        displayQuestion();
    } else {
        submitAssessment();
    }
}

async function submitAssessment() {
    try {
        showLoading();
        
        const answers = currentState.currentQuestions.map((question, index) => ({
            questionId: question.id,
            selectedOption: currentState.userAnswers[index]
        }));
        
        const results = await apiCall('/api/assessment/submit', 'POST', {
            userId: currentState.userId,
            subject: currentState.currentSubject,
            answers: answers
        });
        
        currentState.assessmentResults = results;
        currentState.learningPath = results.learningPath;
        
        if (currentState.userProfile) {
            currentState.userProfile.addAssessment(
                currentState.currentSubject,
                results.overallScore,
                results.topicScores,
                new Date()
            );
            saveUserProfile(currentState.userProfile);
        }
        
        displayResults(results);
        showScreen('results-screen');
    } catch (error) {
        console.error('Error submitting assessment:', error);
        alert('Error submitting assessment. Please try again.');
    } finally {
        hideLoading();
    }
}

function displayResults(results) {
    const scoreValue = parseFloat(results.overallScore);
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (scoreValue / 100) * circumference;
    
    const scoreDisplay = document.getElementById('overall-score');
    if (scoreDisplay) {
        scoreDisplay.textContent = Math.round(scoreValue) + '%';
    }
    
    setTimeout(() => {
        const circle = document.getElementById('score-circle');
        if (circle) {
            circle.style.strokeDashoffset = offset;
        }
    }, 100);
    
    const topicScoresContainer = document.getElementById('topic-scores');
    if (topicScoresContainer) {
        topicScoresContainer.innerHTML = '';
        
        Object.entries(results.topicScores).forEach(([topic, score]) => {
            const scorePercent = Math.round(score);
            let scoreClass = 'low';
            if (scorePercent >= 75) scoreClass = 'high';
            else if (scorePercent >= 50) scoreClass = 'medium';
            
            const card = document.createElement('div');
            card.className = 'topic-score-card';
            card.innerHTML = `
                <div class="topic-score-header">
                    <span class="topic-name">${formatTopicName(topic)}</span>
                    <span class="topic-percentage ${scoreClass}">${scorePercent}%</span>
                </div>
                <div class="topic-progress-bar">
                    <div class="topic-progress-fill ${scoreClass}" style="width: ${scorePercent}%"></div>
                </div>
            `;
            topicScoresContainer.appendChild(card);
        });
    }
    
    const message = document.getElementById('results-message');
    if (message) {
        if (scoreValue >= 75) {
            message.textContent = '🎉 Excellent work! Here\'s your optimized learning path.';
        } else if (scoreValue >= 50) {
            message.textContent = '👍 Good effort! Let\'s strengthen your weak areas.';
        } else {
            message.textContent = '💪 Let\'s build your knowledge step by step.';
        }
    }
}

// ==================== LEARNING PATH ====================

function showLearningPath() {
    console.log('🗺️ Showing learning path');
    
    if (!currentState.learningPath || currentState.learningPath.length === 0) {
        alert('No learning path available. Please complete an assessment first.');
        loadSubjects();
        return;
    }
    
    displayLearningPath();
    showScreen('learning-path-screen');
}

function displayLearningPath() {
    const container = document.getElementById('learning-path-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    currentState.learningPath.forEach((topic, index) => {
        const score = topic.score || 0;
        let statusClass = 'weak';
        let statusText = '⚠️ Needs Focus';
        
        if (score >= 75) {
            statusClass = 'strong';
            statusText = '✅ Strong';
        } else if (score >= 50) {
            statusClass = 'moderate';
            statusText = '⚡ Moderate';
        }
        
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic-item';
        topicDiv.innerHTML = `
            <div class="topic-header">
                <div class="topic-info">
                    <h3>${index + 1}. ${topic.name}</h3>
                    <span class="topic-status ${statusClass}">${statusText}</span>
                </div>
            </div>
            <div class="subtopics-list">
                ${topic.subtopics && topic.subtopics.length > 0 ? topic.subtopics.map((subtopic) => {
                    const uniqueId = `${topic.id}-${subtopic.id}`;
                    const refLinks = getReferenceLinks(currentState.currentSubject, topic.id, subtopic.name);
                    
                    return `
                    <div class="subtopic-item">
                        <div class="subtopic-header">
                            <span class="subtopic-name">${subtopic.name}</span>
                            <div class="subtopic-actions">
                                <button class="start-quiz-btn" onclick="startSubtopicQuiz('${topic.id}', '${subtopic.id}', '${subtopic.name}')">
                                    Start Quiz →
                                </button>
                                <button class="topic-resources-toggle" onclick="toggleSubtopicResources('${uniqueId}')">
                                    📚 Study Resources ▼
                                </button>
                            </div>
                        </div>
                        
                        <div id="resources-${uniqueId}" class="reference-links-dropdown" style="display: none;">
                            <div class="reference-links-dropdown-title">📖 Study ${subtopic.name} from these resources:</div>
                            ${refLinks.map(link => `
                                <a href="${link.url}" target="_blank" class="reference-link-external">
                                    <span class="external-link-icon">${link.title.includes('YouTube') || link.title.includes('📺') ? '🎥' : '📚'}</span>
                                    <span>${link.title}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    `;
                }).join('') : '<p class="empty-state">No subtopics available</p>'}
            </div>
        `;
        container.appendChild(topicDiv);
    });
}

function toggleSubtopicResources(resourceId) {
    const resourcesDiv = document.getElementById(`resources-${resourceId}`);
    const button = event.target;
    
    if (!resourcesDiv) {
        console.error('Resources div not found:', resourceId);
        return;
    }
    
    if (resourcesDiv.style.display === 'none') {
        resourcesDiv.style.display = 'block';
        button.textContent = '📚 Hide Resources ▲';
    } else {
        resourcesDiv.style.display = 'none';
        button.textContent = '📚 Study Resources ▼';
    }
}

function restartAssessment() {
    currentState.currentQuestions = [];
    currentState.currentQuestionIndex = 0;
    currentState.userAnswers = [];
    currentState.assessmentResults = null;
    currentState.currentDifficulty = null;
    
    loadSubjects();
}

// ==================== SUBTOPIC QUIZ FUNCTIONS ====================

async function startSubtopicQuiz(topicId, subtopicId, subtopicName) {
    currentState.currentTopic = topicId;
    currentState.currentSubtopic = subtopicId;
    currentState.currentSubtopicName = subtopicName;
    
    showSubtopicDifficultySelection(subtopicName);
}

function showSubtopicDifficultySelection(subtopicName) {
    const message = `Select difficulty level for "${subtopicName}" quiz:\n\n1. Basic (Fundamental concepts)\n2. Medium (Practical applications) ← Recommended\n3. Advanced (Complex scenarios)\n\nEnter 1, 2, or 3:`;
    
    const choice = prompt(message, '2');
    
    const difficultyMap = {
        '1': 'basic',
        '2': 'medium',
        '3': 'advanced'
    };
    
    const difficulty = difficultyMap[choice] || 'medium';
    
    if (difficulty) {
        startSubtopicQuizWithDifficulty(
            currentState.currentTopic,
            currentState.currentSubtopic,
            currentState.currentSubtopicName,
            difficulty
        );
    }
}

async function startSubtopicQuizWithDifficulty(topicId, subtopicId, subtopicName, difficulty) {
    try {
        showLoading();
        currentState.currentTopic = topicId;
        currentState.currentSubtopic = subtopicId;
        currentState.currentDifficulty = difficulty;
        
        console.log(`🎯 Starting ${difficulty} quiz for ${subtopicName}`);
        
        const data = await apiCall('/api/quiz/subtopic', 'POST', {
            userId: currentState.userId,
            subject: currentState.currentSubject,
            topicId: topicId,
            subtopicId: subtopicId,
            difficulty: difficulty
        });
        
        currentState.currentQuestions = data.questions;
        currentState.currentQuestionIndex = 0;
        currentState.userAnswers = new Array(data.questions.length).fill(null);
        
        const title = document.getElementById('subtopic-quiz-title');
        if (title) {
            const difficultyBadge = getDifficultyBadge(difficulty);
            title.innerHTML = `${subtopicName} - ${difficultyBadge} Quiz`;
        }
        
        // REMOVED: AI badge code - no more showSubtopicAIBadge()
        
        displaySubtopicQuestion();
        showScreen('subtopic-quiz-screen');
    } catch (error) {
        console.error('Error starting subtopic quiz:', error);
        alert('Error loading quiz. Please try again.');
    } finally {
        hideLoading();
    }
}

function displaySubtopicQuestion() {
    const question = currentState.currentQuestions[currentState.currentQuestionIndex];
    const totalQuestions = currentState.currentQuestions.length;
    const currentIndex = currentState.currentQuestionIndex;
    
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
    const progressBar = document.getElementById('subtopic-quiz-progress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    const counter = document.getElementById('subtopic-question-counter');
    if (counter) {
        counter.textContent = `Question ${currentIndex + 1} of ${totalQuestions}`;
    }
    
    const questionText = document.getElementById('subtopic-question-text');
    if (questionText) {
        questionText.textContent = question.question;
    }
    
    const optionsContainer = document.getElementById('subtopic-options-container');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            if (currentState.userAnswers[currentIndex] === index) {
                optionDiv.classList.add('selected');
            }
            optionDiv.textContent = option;
            optionDiv.onclick = () => selectSubtopicOption(index);
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    const prevBtn = document.getElementById('subtopic-prev-btn');
    if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
    }
    
    const nextBtn = document.getElementById('subtopic-next-btn');
    if (nextBtn) {
        if (currentIndex === totalQuestions - 1) {
            nextBtn.textContent = 'Submit Quiz';
        } else {
            nextBtn.textContent = 'Next';
        }
    }
}

function selectSubtopicOption(optionIndex) {
    currentState.userAnswers[currentState.currentQuestionIndex] = optionIndex;
    
    const options = document.querySelectorAll('#subtopic-options-container .option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

function previousSubtopicQuestion() {
    if (currentState.currentQuestionIndex > 0) {
        currentState.currentQuestionIndex--;
        displaySubtopicQuestion();
    }
}

function nextSubtopicQuestion() {
    const currentIndex = currentState.currentQuestionIndex;
    const totalQuestions = currentState.currentQuestions.length;
    
    if (currentState.userAnswers[currentIndex] === null) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (currentIndex < totalQuestions - 1) {
        currentState.currentQuestionIndex++;
        displaySubtopicQuestion();
    } else {
        submitSubtopicQuiz();
    }
}

async function submitSubtopicQuiz() {
    try {
        showLoading();
        
        const answers = currentState.currentQuestions.map((question, index) => ({
            questionId: question.id,
            selectedOption: currentState.userAnswers[index]
        }));
        
        const results = await apiCall('/api/quiz/submit', 'POST', {
            userId: currentState.userId,
            subject: currentState.currentSubject,
            topicId: currentState.currentTopic,
            subtopicId: currentState.currentSubtopic,
            answers: answers
        });
        
        displaySubtopicQuizResults(results);
        showScreen('quiz-results-screen');
    } catch (error) {
        console.error('Error submitting quiz:', error);
        alert('Error submitting quiz. Please try again.');
    } finally {
        hideLoading();
    }
}

function displaySubtopicQuizResults(results) {
    const scoreValue = parseFloat(results.score);
    
    const scoreDisplay = document.getElementById('quiz-score');
    if (scoreDisplay) {
        scoreDisplay.textContent = Math.round(scoreValue) + '%';
    }
    
    const message = document.getElementById('quiz-results-message');
    if (message) {
        if (results.passed) {
            message.textContent = '🎉 Great job! You passed this quiz!';
            message.className = 'quiz-message success';
        } else {
            message.textContent = '📚 Keep practicing! Review the materials and try again.';
            message.className = 'quiz-message needs-work';
        }
    }
}

function backToLearningPath() {
    currentState.currentQuestions = [];
    currentState.currentQuestionIndex = 0;
    currentState.userAnswers = [];
    currentState.currentDifficulty = null;
    
    showLearningPath();
}

function retryQuiz() {
    startSubtopicQuizWithDifficulty(
        currentState.currentTopic,
        currentState.currentSubtopic,
        currentState.currentSubtopicName,
        currentState.currentDifficulty || 'medium'
    );
}

// ==================== HELPER FUNCTIONS ====================

function formatTopicName(topicId) {
    if (!topicId) return '';
    return topicId
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatSubjectName(subjectId) {
    const names = {
        'python': 'Python Programming',
        'dsa': 'Design & Analysis of Algorithms',
        'daa': 'Design & Analysis of Algorithms',
        'ml': 'Machine Learning',
        'ai': 'Artificial Intelligence',
        'dbms': 'Database Management Systems',
        'java': 'Java Programming',
        'cpp': 'C++ Programming',
        'c': 'C Programming',
        'data_science': 'Data Science'
    };
    return names[subjectId] || subjectId;
}

function continueSubject(subject) {
    currentState.currentSubject = subject;
    
    const profile = loadUserProfile(currentState.userId) || currentState.userProfile;
    const hasAssessment = profile && profile.assessments.some(a => a.subject === subject);
    
    if (hasAssessment) {
        showLearningPath();
    } else {
        const subjectName = formatSubjectName(subject);
        showDifficultySelection(subject, subjectName);
    }
}

// ADDED: getReferenceLinks function
function getReferenceLinks(subject, topic, subtopicName) {
    // Generic reference links - you can customize per subject/topic
    return [
        { 
            title: '📚 GeeksforGeeks', 
            url: `https://www.geeksforgeeks.org/${subtopicName.toLowerCase().replace(/ /g, '-')}/`
        },
        { 
            title: '📺 YouTube Tutorial', 
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(subtopicName + ' ' + formatSubjectName(subject))}`
        },
        { 
            title: '📖 W3Schools', 
            url: `https://www.w3schools.com/`
        },
        { 
            title: '🌐 MDN Web Docs', 
            url: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(subtopicName)}`
        }
    ];
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎓 Learning Path Generator Initialized');
    console.log('🌐 API URL:', API_BASE_URL);
    console.log('✨ Groq AI-Powered Question Generation Enabled');
    
    // Generate userId if not exists
    if (!currentState.userId) {
        currentState.userId = generateUserId();
        console.log('👤 Generated User ID:', currentState.userId);
    }
    
    showWelcome();
});

console.log('✅ app.js loaded successfully with Groq AI features');