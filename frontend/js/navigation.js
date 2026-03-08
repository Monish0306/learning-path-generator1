// ==================== NAVIGATION SYSTEM ====================

function initializeNavigation() {
    console.log('🧭 Initializing navigation');
    if (currentState.userId) {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (menuToggle) menuToggle.classList.remove('hidden');
        if (navMenu) navMenu.classList.remove('hidden');
        
        updateNavProfile();
    }
}

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

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// ==================== NAVIGATION MENU ACTIONS ====================

// MY PROFILE = DASHBOARD
function showMyProfile() {
    console.log('👤 Opening My Profile (Dashboard)');
    showDashboard();
}

function showDashboard() {
    console.log('📊 Opening Dashboard');
    toggleMenu();
    
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

function showMyLearning() {
    console.log('📚 Opening My Learning');
    toggleMenu();
    
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

function showScheduler() {
    console.log('📅 Opening Study Schedule');
    toggleMenu();
    
    if (!currentState.userId) {
        alert('Please login first');
        showWelcome();
        return;
    }
    
    showScreen('scheduler-screen');
}

function showRevisionTracker() {
    console.log('🔄 Opening Revision Tracker');
    toggleMenu();
    
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

function showAnalytics() {
    console.log('📊 Opening Analytics');
    toggleMenu();
    
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

function showSettings() {
    console.log('⚙️ Opening Settings');
    toggleMenu();
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

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        console.log('👋 Logging out');
        currentState = {
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
            userProfile: null
        };
        
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (menuToggle) menuToggle.classList.add('hidden');
        if (navMenu) navMenu.classList.remove('active');
        
        showWelcome();
    }
}

// ==================== MY LEARNING ====================

function displayMyLearning(profile) {
    const container = document.getElementById('my-learning-content');
    if (!container) return;
    
    const subjects = [...new Set(profile.assessments.map(a => a.subject))];
    
    if (subjects.length === 0) {
        container.innerHTML = '<p class="empty-state">No active learning paths. Start an assessment to begin!</p>';
        return;
    }
    
    let html = '<div class="learning-paths-grid">';
    
    subjects.forEach(subject => {
        const progress = profile.getSubjectProgress(subject);
        const weakTopics = profile.getWeakTopics(subject, 60);
        
        html += `
            <div class="learning-path-card">
                <h3>${formatSubjectName(subject)}</h3>
                <div class="path-stats">
                    <div class="path-stat">
                        <span>Avg Score:</span>
                        <span class="score-${getScoreClass(parseFloat(progress.avgScore))}">${progress.avgScore}%</span>
                    </div>
                    <div class="path-stat">
                        <span>Quizzes:</span>
                        <span>${progress.quizzes}</span>
                    </div>
                </div>
                ${weakTopics.length > 0 ? `
                    <div class="weak-topics-mini">
                        <strong>Focus on:</strong> ${formatTopicName(weakTopics[0].topic)}
                    </div>
                ` : ''}
                <button class="btn-continue" onclick="continueSubject('${subject}')">
                    Continue Learning →
                </button>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// ==================== ANALYTICS ====================

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

// ==================== REVISION TRACKER ====================

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

console.log('✅ navigation.js loaded');