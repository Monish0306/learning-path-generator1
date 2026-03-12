// ==================== NAVIGATION SYSTEM - COMPLETE ====================

// Initialize navigation after login
function initializeNavigation() {
    console.log('🧭 Initializing navigation for user:', currentState.userName);
    
    // Show menu toggle button
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.classList.remove('hidden');
    }
    
    // Show nav menu
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.remove('hidden');
    }
    
    // Update navigation header with user info
    updateNavProfile();
}

// Update navigation profile info
function updateNavProfile() {
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (profile) {
        const avatar = document.getElementById('nav-avatar');
        const userInfo = document.getElementById('nav-user-info');
        
        if (avatar) {
            avatar.textContent = profile.name.charAt(0).toUpperCase();
        }
        
        if (userInfo) {
            userInfo.innerHTML = `
                <div class="nav-username">${profile.name}</div>
                <div class="nav-email">${profile.email}</div>
            `;
        }
    }
}

// Toggle navigation menu
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Close navigation menu
function closeNavMenu() {
    const menu = document.getElementById('nav-menu');
    if (menu) {
        menu.classList.remove('active');
    }
}

// ==================== MY PROFILE (DASHBOARD) ====================

function showDashboard() {
    console.log('👤 Opening My Profile (Dashboard)');
    toggleMenu(); // Close menu
    
    if (!currentState.userId) {
        alert('Please login first');
        showWelcome();
        return;
    }
    
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (!profile) {
        alert('Profile not found');
        showWelcome();
        return;
    }
    
    displayDashboard(profile);
    showScreen('dashboard-screen');
}

// ==================== MY LEARNING ====================

function showMyLearning() {
    console.log('📚 Opening My Learning');
    toggleMenu(); // Close menu
    
    if (!currentState.userId) {
        alert('Please login first');
        showWelcome();
        return;
    }
    
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (!profile) {
        alert('Profile not found');
        return;
    }
    
    displayMyLearning(profile);
    showScreen('my-learning-screen');
}

function displayMyLearning(profile) {
    const container = document.getElementById('my-learning-content');
    if (!container) return;
    
    const subjects = [...new Set(profile.assessments.map(a => a.subject))];
    
    if (subjects.length === 0) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">📚</div>
                <h3>No Active Learning Paths Yet</h3>
                <p>Start your first assessment to create a personalized learning path!</p>
                <button class="btn-primary" onclick="loadSubjects()">Browse Subjects</button>
            </div>
        `;
        return;
    }
    
    let html = '<div class="learning-paths-grid">';
    
    subjects.forEach(subject => {
        const progress = profile.getSubjectProgress(subject);
        const weakTopics = profile.getWeakTopics(subject, 60);
        const scoreValue = parseFloat(progress.avgScore);
        const scoreClass = getScoreClass(scoreValue);
        
        html += `
            <div class="learning-path-card">
                <div class="learning-card-header">
                    <h3>${formatSubjectName(subject)}</h3>
                    <span class="learning-score ${scoreClass}">${progress.avgScore}%</span>
                </div>
                
                <div class="learning-stats-grid">
                    <div class="learning-stat">
                        <span class="stat-label">Assessments:</span>
                        <span class="stat-value">${progress.assessments}</span>
                    </div>
                    <div class="learning-stat">
                        <span class="stat-label">Quizzes:</span>
                        <span class="stat-value">${progress.quizzes}</span>
                    </div>
                    <div class="learning-stat">
                        <span class="stat-label">Last Studied:</span>
                        <span class="stat-value">${progress.lastStudied ? formatDate(progress.lastStudied) : 'Never'}</span>
                    </div>
                </div>
                
                ${weakTopics.length > 0 ? `
                    <div class="weak-topics-preview">
                        <strong>⚠️ Focus Areas:</strong>
                        <div class="weak-topic-tag">${formatTopicName(weakTopics[0].topic)} (${Math.round(weakTopics[0].score)}%)</div>
                        ${weakTopics.length > 1 ? `<div class="weak-topic-tag">${formatTopicName(weakTopics[1].topic)} (${Math.round(weakTopics[1].score)}%)</div>` : ''}
                    </div>
                ` : '<div class="no-weak-topics">🎉 All topics mastered!</div>'}
                
                <button class="btn-continue" onclick="continueSubject('${subject}')">
                    Continue Learning →
                </button>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function continueSubject(subject) {
    currentState.currentSubject = subject;
    currentState.currentSubjectName = formatSubjectName(subject);
    console.log('📖 Continuing subject:', subject);
    
    // Check if assessment exists
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    const assessment = profile.assessments.find(a => a.subject === subject);
    
    if (assessment) {
        // Show learning path directly
        currentState.assessmentResults = assessment;
        showLearningPath();
    } else {
        // Take new assessment
        showDifficultySelection(subject);
    }
}

// ==================== SCHEDULER ====================

function showScheduler() {
    console.log('📅 Opening Study Schedule');
    toggleMenu(); // Close menu
    
    if (!currentState.userId) {
        alert('Please login first');
        showWelcome();
        return;
    }
    
    showScreen('scheduler-screen');
}

// ==================== REVISION TRACKER ====================

function showRevisionTracker() {
    console.log('🔄 Opening Revision Tracker');
    toggleMenu(); // Close menu
    
    if (!currentState.userId) {
        alert('Please login first');
        showWelcome();
        return;
    }
    
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (profile) {
        displayRevisionTracker(profile);
    }
    
    showScreen('revision-tracker-screen');
}

function displayRevisionTracker(profile) {
    const today = new Date();
    
    const dueRevisions = [];
    const upcomingRevisions = [];
    
    profile.quizHistory.forEach(quiz => {
        const lastStudied = new Date(quiz.date);
        const daysSince = Math.floor((today - lastStudied) / (1000 * 60 * 60 * 24));
        
        [2, 7, 21].forEach((interval, index) => {
            const targetDate = new Date(lastStudied);
            targetDate.setDate(targetDate.getDate() + interval);
            
            const daysUntilRevision = Math.floor((targetDate - today) / (1000 * 60 * 60 * 24));
            
            const revisionItem = {
                subject: quiz.subject,
                topic: quiz.topic,
                subtopic: quiz.subtopic,
                targetDate: targetDate,
                revisionNumber: index + 1,
                daysUntil: daysUntilRevision,
                score: quiz.score
            };
            
            if (daysUntilRevision < 0) {
                dueRevisions.push(revisionItem);
            } else if (daysUntilRevision <= 7) {
                upcomingRevisions.push(revisionItem);
            }
        });
    });
    
    // Due Revisions
    const dueList = document.getElementById('due-revisions-list');
    if (dueList) {
        if (dueRevisions.length === 0) {
            dueList.innerHTML = '<p class="empty-state">🎉 No overdue revisions! Great job!</p>';
        } else {
            dueList.innerHTML = dueRevisions.slice(0, 10).map(rev => `
                <div class="revision-item overdue">
                    <div class="revision-info">
                        <div class="revision-subject">${formatSubjectName(rev.subject)}</div>
                        <div class="revision-topic">${rev.subtopic}</div>
                        <div class="revision-date">⚠️ Overdue by ${Math.abs(rev.daysUntil)} days</div>
                    </div>
                    <span class="revision-number">R${rev.revisionNumber}</span>
                </div>
            `).join('');
        }
    }
    
    // Upcoming Revisions
    const upcomingList = document.getElementById('upcoming-revisions-list');
    if (upcomingList) {
        if (upcomingRevisions.length === 0) {
            upcomingList.innerHTML = '<p class="empty-state">No revisions scheduled for the next 7 days.</p>';
        } else {
            upcomingList.innerHTML = upcomingRevisions.slice(0, 10).map(rev => `
                <div class="revision-item upcoming">
                    <div class="revision-info">
                        <div class="revision-subject">${formatSubjectName(rev.subject)}</div>
                        <div class="revision-topic">${rev.subtopic}</div>
                        <div class="revision-date">📅 In ${rev.daysUntil} days (${rev.targetDate.toLocaleDateString()})</div>
                    </div>
                    <span class="revision-number">R${rev.revisionNumber}</span>
                </div>
            `).join('');
        }
    }
    
    // Completed Revisions
    const completedList = document.getElementById('completed-revisions-list');
    if (completedList) {
        const recentQuizzes = profile.quizHistory.slice(-5).reverse();
        if (recentQuizzes.length === 0) {
            completedList.innerHTML = '<p class="empty-state">No revisions completed yet.</p>';
        } else {
            completedList.innerHTML = recentQuizzes.map(quiz => `
                <div class="revision-item completed">
                    <div class="revision-info">
                        <div class="revision-subject">${formatSubjectName(quiz.subject)}</div>
                        <div class="revision-topic">${quiz.subtopic}</div>
                        <div class="revision-date">✅ Completed ${formatDate(new Date(quiz.date))}</div>
                    </div>
                    <span class="score-${getScoreClass(quiz.score)}">${Math.round(quiz.score)}%</span>
                </div>
            `).join('');
        }
    }
}

// ==================== ANALYTICS ====================

function showAnalytics() {
    console.log('📊 Opening Analytics');
    toggleMenu(); // Close menu
    
    if (!currentState.userId) {
        alert('Please login first');
        showWelcome();
        return;
    }
    
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (profile) {
        displayAnalytics(profile);
    }
    
    showScreen('analytics-screen');
}

function displayAnalytics(profile) {
    const container = document.getElementById('analytics-content');
    if (!container) return;
    
    const totalQuizzes = profile.quizHistory.length;
    const avgScore = totalQuizzes > 0 
        ? (profile.quizHistory.reduce((sum, q) => sum + parseFloat(q.score), 0) / totalQuizzes).toFixed(1)
        : 0;
    
    const streak = calculateStreak(profile);
    
    const subjectPerformance = {};
    profile.quizHistory.forEach(quiz => {
        if (!subjectPerformance[quiz.subject]) {
            subjectPerformance[quiz.subject] = {
                count: 0,
                totalScore: 0
            };
        }
        subjectPerformance[quiz.subject].count++;
        subjectPerformance[quiz.subject].totalScore += parseFloat(quiz.score);
    });
    
    let html = `
        <div class="analytics-grid">
            <div class="analytics-card">
                <h3>🔥 Learning Streak</h3>
                <div class="streak-display">
                    <div class="streak-number">${streak}</div>
                    <div class="streak-label">Days in a row</div>
                </div>
            </div>
            
            <div class="analytics-card">
                <h3>📈 Overall Performance</h3>
                <div class="performance-stats">
                    <div class="perf-stat">
                        <span class="perf-label">Total Quizzes:</span>
                        <span class="perf-value">${totalQuizzes}</span>
                    </div>
                    <div class="perf-stat">
                        <span class="perf-label">Average Score:</span>
                        <span class="perf-value">${avgScore}%</span>
                    </div>
                    <div class="perf-stat">
                        <span class="perf-label">Subjects Studied:</span>
                        <span class="perf-value">${Object.keys(subjectPerformance).length}</span>
                    </div>
                </div>
            </div>
            
            <div class="analytics-card">
                <h3>📊 Subject-wise Performance</h3>
                <div class="subject-performance">
    `;
    
    Object.entries(subjectPerformance).forEach(([subject, data]) => {
        const avg = (data.totalScore / data.count).toFixed(1);
        const scoreClass = getScoreClass(parseFloat(avg));
        html += `
            <div class="subject-perf-item">
                <div class="subject-perf-name">${formatSubjectName(subject)}</div>
                <div class="subject-perf-bar">
                    <div class="perf-bar-fill ${scoreClass}" style="width: ${avg}%"></div>
                </div>
                <div class="subject-perf-score">${avg}%</div>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function calculateStreak(profile) {
    if (profile.quizHistory.length === 0) return 0;
    
    const dates = profile.quizHistory
        .map(q => new Date(q.date).toDateString())
        .filter((date, index, self) => self.indexOf(date) === index)
        .sort((a, b) => new Date(b) - new Date(a));
    
    let streak = 0;
    
    for (let i = 0; i < dates.length; i++) {
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - i);
        
        if (dates[i] === expectedDate.toDateString()) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// ==================== SETTINGS ====================

function showSettings() {
    console.log('⚙️ Opening Settings');
    toggleMenu(); // Close menu
    showScreen('settings-screen');
    
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (profile && profile.preferences) {
        const masteryInput = document.getElementById('mastery-threshold');
        const goalSelect = document.getElementById('study-goal');
        
        if (masteryInput) masteryInput.value = profile.preferences.masteryThreshold || 70;
        if (goalSelect) goalSelect.value = profile.preferences.studyGoal || 'exam';
    }
}

function saveSettings() {
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (!profile) return;
    
    profile.preferences = profile.preferences || {};
    
    const masteryInput = document.getElementById('mastery-threshold');
    const goalSelect = document.getElementById('study-goal');
    const revisionCheck = document.getElementById('revision-reminders');
    const dailyCheck = document.getElementById('daily-reminders');
    
    if (masteryInput) profile.preferences.masteryThreshold = parseInt(masteryInput.value);
    if (goalSelect) profile.preferences.studyGoal = goalSelect.value;
    if (revisionCheck) profile.preferences.revisionReminders = revisionCheck.checked;
    if (dailyCheck) profile.preferences.dailyReminders = dailyCheck.checked;
    
    saveUserProfile(profile);
    currentState.userProfile = profile;
    
    alert('✅ Settings saved successfully!');
}

// ==================== LOGOUT ====================

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        console.log('👋 Logging out');
        currentState = {
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
        
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (menuToggle) menuToggle.classList.add('hidden');
        if (navMenu) {
            navMenu.classList.remove('active');
            navMenu.classList.add('hidden');
        }
        
        showWelcome();
    }
}

console.log('✅ navigation.js loaded');