// ==================== GLOBAL STATE ====================
const API_BASE_URL = 'http://localhost:3000/api';

let currentState = {
    userId: null,
    userName: null,
    university: null,
    email: null,
    currentSubject: null,
    currentQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    assessmentResults: null,
    learningPath: [],
    currentTopic: null,
    currentSubtopic: null,
    userProfile: null // NEW: UserProfile instance
};

// ==================== UTILITY FUNCTIONS ====================
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showLoading() {
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-spinner').classList.add('hidden');
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
        console.log(`🌐 API Call: ${method} ${endpoint}`);
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
        console.error('Endpoint:', endpoint);
        console.error('Method:', method);
        console.error('Data:', data);
        alert('Error: ' + error.message + '\n\nCheck browser console (F12) for details.');
        throw error;
    }
}

function backToSubjectSelection() {
    // Confirm before going back
    if (currentState.currentQuestions.length > 0) {
        const confirmed = confirm('Are you sure you want to change subject? Your current progress will be lost.');
        if (!confirmed) return;
    }
    
    // Reset assessment state
    currentState.currentQuestions = [];
    currentState.currentQuestionIndex = 0;
    currentState.userAnswers = [];
    currentState.currentSubject = null;
    
    // Show subject selection
    loadSubjects();
}

// ==================== NAVIGATION FUNCTIONS ====================
function showWelcome() {
    showScreen('welcome-screen');
}

function showUserForm() {
    showScreen('user-form-screen');
}

function submitUserInfo(event) {
    event.preventDefault();
    
    const username = document.getElementById('name').value;
    const university = document.getElementById('university').value;
    const email = document.getElementById('email').value;
    
    // Validate username
    const validation = validateUsername(username);
    if (!validation.isValid) {
        alert('Username does not meet requirements:\n\n' + validation.errors.join('\n'));
        return false;
    }
    
    // Generate user ID
    currentState.userId = generateUserId();
    currentState.userName = username;
    currentState.university = university;
    currentState.email = email;
    
    // Create or load user profile
    let profile = loadUserProfile(currentState.userId);
    if (!profile) {
        profile = new UserProfile(currentState.userId, username, university, email);
        saveUserProfile(profile);
        console.log('✅ New profile created');
    } else {
        console.log('✅ Existing profile loaded');
    }
    
    currentState.userProfile = profile;
    
    // Initialize navigation menu
    initializeNavigation();
    
    loadSubjects();
    return false;
}

async function loadSubjects() {
    try {
        showLoading();
        const subjects = await apiCall('/subjects');
        
        const subjectsGrid = document.getElementById('subjects-grid');
        subjectsGrid.innerHTML = '';
        
        subjects.forEach(subject => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `
                <span class="subject-icon">${subject.icon}</span>
                <h3 class="subject-name">${subject.name}</h3>
            `;
            card.onclick = () => startAssessment(subject.id, subject.name);
            subjectsGrid.appendChild(card);
        });
        
        showScreen('subject-selection-screen');
    } catch (error) {
        console.error('Error loading subjects:', error);
    } finally {
        hideLoading();
    }
}

// ==================== ASSESSMENT FUNCTIONS ====================
async function startAssessment(subjectId, subjectName) {
    try {
        showLoading();
        currentState.currentSubject = subjectId;
        
        const data = await apiCall('/assessment/start', 'POST', {
            userId: currentState.userId,
            subject: subjectId
        });
        
        currentState.currentQuestions = data.questions;
        currentState.currentQuestionIndex = 0;
        currentState.userAnswers = new Array(data.questions.length).fill(null);
        
        document.getElementById('assessment-title').textContent = `${subjectName} - Initial Assessment`;
        
        displayQuestion();
        showScreen('assessment-screen');
    } catch (error) {
        console.error('Error starting assessment:', error);
    } finally {
        hideLoading();
    }
}

function displayQuestion() {
    const question = currentState.currentQuestions[currentState.currentQuestionIndex];
    const totalQuestions = currentState.currentQuestions.length;
    const currentIndex = currentState.currentQuestionIndex;
    
    // Update progress
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
    document.getElementById('assessment-progress').style.width = `${progress}%`;
    
    // Update question counter
    document.getElementById('question-counter').textContent = 
        `Question ${currentIndex + 1} of ${totalQuestions}`;
    
    // Display question
    document.getElementById('question-text').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('options-container');
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
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    
    const nextBtn = document.getElementById('next-btn');
    if (currentIndex === totalQuestions - 1) {
        nextBtn.textContent = 'Submit Assessment';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function selectOption(optionIndex) {
    currentState.userAnswers[currentState.currentQuestionIndex] = optionIndex;
    
    // Update UI
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
    
    // Check if answer is selected
    if (currentState.userAnswers[currentIndex] === null) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (currentIndex < totalQuestions - 1) {
        currentState.currentQuestionIndex++;
        displayQuestion();
    } else {
        // Submit assessment
        submitAssessment();
    }
}

async function submitAssessment() {
    try {
        showLoading();
        
        console.log('📝 Submitting assessment...');
        console.log('User ID:', currentState.userId);
        console.log('Subject:', currentState.currentSubject);
        console.log('Total questions:', currentState.currentQuestions.length);
        
        // Prepare answers
        const answers = currentState.currentQuestions.map((question, index) => ({
            questionId: question.id,
            selectedOption: currentState.userAnswers[index]
        }));
        
        console.log('Answers prepared:', answers.length);
        
        const results = await apiCall('/assessment/submit', 'POST', {
            userId: currentState.userId,
            subject: currentState.currentSubject,
            answers: answers
        });
        
        console.log('✅ Results received:', results);
        
        currentState.assessmentResults = results;
        currentState.learningPath = results.learningPath;
        
        // Save assessment to user profile
        if (currentState.userProfile) {
            currentState.userProfile.addAssessment(
                currentState.currentSubject,
                results.overallScore,
                results.topicScores,
                new Date()
            );
            saveUserProfile(currentState.userProfile);
            console.log('✅ Assessment saved to profile');
        }
        
        displayResults(results);
        showScreen('results-screen');
    } catch (error) {
        console.error('❌ Error submitting assessment:', error);
        alert('Error submitting assessment. Please check console for details.');
    } finally {
        hideLoading();
    }
}

function displayResults(results) {
    // Animate score circle
    const scoreValue = parseFloat(results.overallScore);
    const circumference = 2 * Math.PI * 90; // radius = 90
    const offset = circumference - (scoreValue / 100) * circumference;
    
    document.getElementById('overall-score').textContent = Math.round(scoreValue) + '%';
    
    // Add SVG gradient
    const svg = document.querySelector('.score-svg');
    if (!document.getElementById('scoreGradient')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.id = 'scoreGradient';
        gradient.innerHTML = `
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
        `;
        defs.appendChild(gradient);
        svg.appendChild(defs);
    }
    
    setTimeout(() => {
        document.getElementById('score-circle').style.strokeDashoffset = offset;
    }, 100);
    
    // Display topic scores
    const topicScoresContainer = document.getElementById('topic-scores');
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
    
    // Update message
    const message = document.getElementById('results-message');
    if (scoreValue >= 75) {
        message.textContent = '🎉 Excellent work! Here\'s your optimized learning path.';
    } else if (scoreValue >= 50) {
        message.textContent = '👍 Good effort! Let\'s strengthen your weak areas.';
    } else {
        message.textContent = '💪 Let\'s build your knowledge step by step.';
    }
}

function formatTopicName(topicId) {
    return topicId
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function showLearningPath() {
    displayLearningPath();
    showScreen('learning-path-screen');
}

function displayLearningPath() {
    const container = document.getElementById('learning-path-container');
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
            <div class="subtopics-list" id="subtopics-${topic.id}">
                ${topic.subtopics.map((subtopic, subIndex) => {
                    // Get reference links for this subtopic
                    const refLinks = getReferenceLinks(currentState.currentSubject, topic.id, subtopic.id);
                    const uniqueId = `${topic.id}-${subtopic.id}`;
                    
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
                }).join('')}
            </div>
        `;
        container.appendChild(topicDiv);
    });
}

function restartAssessment() {
    currentState.currentQuestions = [];
    currentState.currentQuestionIndex = 0;
    currentState.userAnswers = [];
    currentState.assessmentResults = null;
    
    loadSubjects();
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎓 Learning Path Generator Initialized');
    showWelcome();
});

// Toggle subtopic reference links
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