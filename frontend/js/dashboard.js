// ==================== USER DASHBOARD ====================

function showDashboard() {
    if (!currentState.userId) {
        alert('Please log in first');
        showAuthScreen();
        return;
    }
    
    const profile = loadUserProfile(currentState.userId) || currentState.userProfile;
    
    if (!profile) {
        alert('Profile not found');
        showAuthScreen();
        return;
    }
    
    displayDashboard(profile);
    showScreen('dashboard-screen');
}

function displayDashboard(profile) {
    const container = document.getElementById('dashboard-content');
    
    // Calculate statistics
    const totalAssessments = profile.assessments.length;
    const totalQuizzes = profile.quizHistory.length;
    const subjects = [...new Set(profile.assessments.map(a => a.subject))];
    const avgScore = calculateOverallAverage(profile);
    
    container.innerHTML = `
        <div class="dashboard-header">
            <div class="profile-avatar">
                <div class="avatar-circle">${profile.name.charAt(0).toUpperCase()}</div>
            </div>
            <div class="profile-info">
                <h2>${profile.name}</h2>
                <p class="profile-meta">${profile.university}</p>
                <p class="profile-meta">${profile.email}</p>
                <p class="profile-meta-small">Member since ${formatDate(new Date(profile.createdAt))}</p>
            </div>
            <button class="btn-secondary" onclick="showWelcome()">← Back to Home</button>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">📚</div>
                <div class="stat-value">${totalAssessments}</div>
                <div class="stat-label">Assessments Taken</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">✏️</div>
                <div class="stat-value">${totalQuizzes}</div>
                <div class="stat-label">Quizzes Attempted</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🎯</div>
                <div class="stat-value">${subjects.length}</div>
                <div class="stat-label">Subjects Studied</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">⭐</div>
                <div class="stat-value">${avgScore}%</div>
                <div class="stat-label">Average Score</div>
            </div>
        </div>
        
        <div class="dashboard-sections">
            <div class="dashboard-section">
                <h3>📊 Assessment History</h3>
                <div class="assessment-history">
                    ${displayAssessmentHistory(profile.assessments)}
                </div>
            </div>
            
            <div class="dashboard-section">
                <h3>📝 Recent Quiz Activity</h3>
                <div class="quiz-history">
                    ${displayQuizHistory(profile.quizHistory)}
                </div>
            </div>
            
            <div class="dashboard-section">
                <h3>📈 Subject Progress</h3>
                <div class="subject-progress">
                    ${displaySubjectProgress(profile, subjects)}
                </div>
            </div>
            
            <div class="dashboard-section">
                <h3>🎯 Weak Areas & Recommendations</h3>
                <div class="weak-areas">
                    ${displayWeakAreas(profile)}
                </div>
            </div>
        </div>
    `;
}

function calculateOverallAverage(profile) {
    if (profile.quizHistory.length === 0) return 0;
    
    const total = profile.quizHistory.reduce((sum, quiz) => sum + parseFloat(quiz.score), 0);
    return (total / profile.quizHistory.length).toFixed(1);
}

function displayAssessmentHistory(assessments) {
    if (assessments.length === 0) {
        return '<p class="empty-state">No assessments taken yet. Start your first assessment!</p>';
    }
    
    const sorted = assessments.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return sorted.map(assessment => {
        const scoreClass = getScoreClass(parseFloat(assessment.score));
        return `
            <div class="history-item">
                <div class="history-info">
                    <div class="history-subject">${formatSubjectName(assessment.subject)}</div>
                    <div class="history-date">${formatDate(new Date(assessment.date))}</div>
                </div>
                <div class="history-score ${scoreClass}">
                    ${Math.round(assessment.score)}%
                </div>
            </div>
        `;
    }).join('');
}

function displayQuizHistory(quizzes) {
    if (quizzes.length === 0) {
        return '<p class="empty-state">No quizzes attempted yet. Take your first quiz!</p>';
    }
    
    const sorted = quizzes.slice(-10).reverse(); // Last 10 quizzes
    
    return sorted.map(quiz => {
        const scoreClass = getScoreClass(parseFloat(quiz.score));
        return `
            <div class="history-item">
                <div class="history-info">
                    <div class="history-subject">${formatSubjectName(quiz.subject)}</div>
                    <div class="history-subtopic">${quiz.subtopic}</div>
                    <div class="history-date">${formatDate(new Date(quiz.date))}</div>
                </div>
                <div class="history-score ${scoreClass}">
                    ${Math.round(quiz.score)}%
                </div>
            </div>
        `;
    }).join('');
}

function displaySubjectProgress(profile, subjects) {
    if (subjects.length === 0) {
        return '<p class="empty-state">No subjects started yet.</p>';
    }
    
    return subjects.map(subject => {
        const progress = profile.getSubjectProgress(subject);
        const scoreValue = parseFloat(progress.avgScore);
        const scoreClass = getScoreClass(scoreValue);
        
        return `
            <div class="progress-card">
                <div class="progress-header">
                    <h4>${formatSubjectName(subject)}</h4>
                    <span class="progress-score ${scoreClass}">${progress.avgScore}%</span>
                </div>
                <div class="progress-stats">
                    <div class="progress-stat">
                        <span class="stat-label">Assessments:</span>
                        <span class="stat-value">${progress.assessments}</span>
                    </div>
                    <div class="progress-stat">
                        <span class="stat-label">Quizzes:</span>
                        <span class="stat-value">${progress.quizzes}</span>
                    </div>
                    <div class="progress-stat">
                        <span class="stat-label">Last Studied:</span>
                        <span class="stat-value">${progress.lastStudied ? formatDate(progress.lastStudied) : 'Never'}</span>
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill ${scoreClass}" style="width: ${scoreValue}%"></div>
                </div>
                <button class="btn-start-learning" onclick="continueSubject('${subject}')">
                    Continue Learning →
                </button>
            </div>
        `;
    }).join('');
}

function displayWeakAreas(profile) {
    const allWeakTopics = [];
    
    profile.assessments.forEach(assessment => {
        const weakTopics = Object.entries(assessment.topicScores)
            .filter(([topic, score]) => score < 60)
            .map(([topic, score]) => ({
                subject: assessment.subject,
                topic,
                score,
                date: assessment.date
            }));
        allWeakTopics.push(...weakTopics);
    });
    
    if (allWeakTopics.length === 0) {
        return '<p class="empty-state">🎉 Great job! No weak areas detected.</p>';
    }
    
    const sorted = allWeakTopics.sort((a, b) => a.score - b.score).slice(0, 5);
    
    return `
        <div class="weak-areas-list">
            ${sorted.map((area, index) => {
                // Get reference links for this weak topic
                const refLinks = getReferenceLinks(area.subject, area.topic, area.topic);
                
                return `
                <div class="weak-area-item-enhanced">
                    <div class="weak-area-header">
                        <div class="weak-area-info">
                            <div class="weak-area-rank-badge">#${index + 1}</div>
                            <div>
                                <div class="weak-area-topic-name">${formatTopicName(area.topic)}</div>
                                <div class="weak-area-subject">${formatSubjectName(area.subject)}</div>
                                <div class="weak-area-score">${Math.round(area.score)}%</div>
                            </div>
                        </div>
                        <div class="weak-area-actions">
                            <button class="btn-study-resources" onclick="toggleWeakAreaResources('weak-${index}')">
                                📚 Study Resources
                            </button>
                            <button class="btn-practice" onclick="practiceWeakTopic('${area.subject}', '${area.topic}')">
                                Practice
                            </button>
                        </div>
                    </div>
                    
                    <div id="weak-${index}" class="reference-links-dropdown" style="display: none;">
                        <div class="reference-links-dropdown-title">📖 Learn ${formatTopicName(area.topic)} from these resources:</div>
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
        
        <div class="recommendation-box">
            <h4>💡 Top Priority Recommendation</h4>
            <p>Focus on <strong>${formatTopicName(sorted[0].topic)}</strong> in ${formatSubjectName(sorted[0].subject)}. 
            Your current mastery is ${Math.round(sorted[0].score)}%. Use the study resources above to reach at least 70% before moving to advanced topics.</p>
        </div>
    `;
}

// Toggle visibility of reference links for weak areas
function toggleWeakAreaResources(resourceId) {
    const resourcesDiv = document.getElementById(resourceId);
    const button = event.target;
    
    if (!resourcesDiv) {
        console.error('Resources div not found:', resourceId);
        return;
    }
    
    if (resourcesDiv.style.display === 'none') {
        resourcesDiv.style.display = 'block';
        button.textContent = '📚 Hide Resources';
    } else {
        resourcesDiv.style.display = 'none';
        button.textContent = '📚 Study Resources';
    }
}

// Helper Functions
function getScoreClass(score) {
    if (score >= 75) return 'score-high';
    if (score >= 50) return 'score-medium';
    return 'score-low';
}

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
        'c': 'C Programming'
    };
    return names[subjectId] || subjectId;
}

function formatTopicName(topicId) {
    return topicId
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function continueSubject(subject) {
    currentState.currentSubject = subject;
    
    // Check if user has taken assessment
    const profile = loadUserProfile(currentState.userId) || currentState.userProfile;
    const hasAssessment = profile.assessments.some(a => a.subject === subject);
    
    if (hasAssessment) {
        // Load existing learning path
        showLearningPath();
    } else {
        // Start new assessment
        startAssessment(subject, formatSubjectName(subject));
    }
}

function practiceWeakTopic(subject, topic) {
    currentState.currentSubject = subject;
    // Find and start quiz for weak topic
    alert(`Starting practice quiz for ${formatTopicName(topic)} in ${formatSubjectName(subject)}`);
    // Navigate to quiz
    showLearningPath();
}