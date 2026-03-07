// ==================== NAVIGATION SYSTEM ====================

function initializeNavigation() {
    // Show menu toggle after login
    if (currentState.userId) {
        document.getElementById('menu-toggle').classList.remove('hidden');
        document.getElementById('nav-menu').classList.remove('hidden');
        updateNavProfile();
    }
}

function updateNavProfile() {
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (profile) {
        document.getElementById('nav-avatar').textContent = profile.name.charAt(0).toUpperCase();
        document.getElementById('nav-user-info').innerHTML = `
            <div class="nav-username">${profile.name}</div>
            <div class="nav-email">${profile.email}</div>
        `;
    }
}

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
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
        document.getElementById('menu-toggle').classList.add('hidden');
        document.getElementById('nav-menu').classList.remove('active');
        showWelcome();
    }
}

// ==================== STUDY SCHEDULER UI ====================

function showScheduler() {
    if (!currentState.userId) {
        alert('Please login first');
        showUserForm();
        return;
    }
    
    showScreen('scheduler-screen');
    toggleMenu();
}

function generateSchedule() {
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (!profile) {
        alert('Profile not found');
        return;
    }
    
    // Get preferences from form
    const preferences = {
        dailyStudyHours: parseInt(document.getElementById('daily-hours').value),
        preferredTimeSlot: document.getElementById('time-slot').value,
        daysPerWeek: parseInt(document.getElementById('days-per-week').value),
        sessionDuration: parseInt(document.getElementById('session-duration').value)
    };
    
    const examDateInput = document.getElementById('exam-date').value;
    const examDate = examDateInput ? new Date(examDateInput) : null;
    
    // Create scheduler and generate schedule
    const scheduler = new StudyScheduler(profile);
    const schedule = scheduler.generateSchedule(preferences, examDate);
    
    // Display schedule
    displayGeneratedSchedule(schedule);
    
    // Save preferences to profile
    profile.preferences = preferences;
    profile.studySchedule = schedule;
    saveUserProfile(profile);
}

function displayGeneratedSchedule(scheduleData) {
    const container = document.getElementById('schedule-output');
    
    if (!scheduleData || !scheduleData.schedule || scheduleData.schedule.length === 0) {
        container.innerHTML = '<p class="empty-state">No schedule generated. Please check your preferences.</p>';
        return;
    }
    
    const summary = scheduleData.summary;
    
    let html = `
        <div class="schedule-summary">
            <h4>📊 Schedule Summary</h4>
            <div class="summary-stats">
                <div class="summary-stat">
                    <span class="stat-value">${summary.totalDays}</span>
                    <span class="stat-label">Days</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-value">${summary.totalSessions}</span>
                    <span class="stat-label">Sessions</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-value">${summary.totalHours}h</span>
                    <span class="stat-label">Total Time</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-value">${summary.averageSessionsPerDay}</span>
                    <span class="stat-label">Avg/Day</span>
                </div>
            </div>
        </div>
        
        <div class="schedule-timeline">
            <h4>📅 Daily Schedule</h4>
    `;
    
    scheduleData.schedule.forEach((day, index) => {
        const date = new Date(day.date);
        const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        html += `
            <div class="schedule-day">
                <div class="schedule-day-header">
                    <span class="day-date">${dateStr}</span>
                    <span class="day-total">${day.totalMinutes} mins total</span>
                </div>
                <div class="schedule-sessions">
        `;
        
        day.sessions.forEach(session => {
            const reasonClass = session.type === 'revision' ? 'revision' : 'learning';
            html += `
                <div class="schedule-session ${reasonClass}">
                    <div class="session-header">
                        <span class="session-topic">${formatTopicName(session.topic)}</span>
                        <span class="session-time">${session.timeSlot} (${session.duration} min)</span>
                    </div>
                    <div class="session-details">
                        <span class="session-tag">${session.taskType}</span>
                        <span>${formatSubjectName(session.subject)}</span>
                        <span>Priority: ${Math.round(session.priority)}</span>
                    </div>
                    <div class="session-reason">
                        💡 ${session.reason}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    // Add revision schedule
    if (scheduleData.revisionDates && scheduleData.revisionDates.length > 0) {
        html += `
            <div class="revision-schedule">
                <h4>🔄 Upcoming Revisions (Forgetting Curve)</h4>
                <div class="revision-list">
        `;
        
        scheduleData.revisionDates.slice(0, 10).forEach(revision => {
            const date = new Date(revision.date);
            const dateStr = date.toLocaleDateString();
            
            html += `
                <div class="revision-item upcoming">
                    <div class="revision-info">
                        <div class="revision-subject">${formatSubjectName(revision.subject)}</div>
                        <div class="revision-topic">${formatTopicName(revision.topic)}</div>
                        <div class="revision-date">📅 ${dateStr} - ${revision.reason}</div>
                    </div>
                    <span class="revision-number">R${revision.revisionNumber}</span>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// ==================== REVISION TRACKER ====================

function showRevisionTracker() {
    if (!currentState.userId) {
        alert('Please login first');
        showUserForm();
        return;
    }
    
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (!profile) {
        alert('Profile not found');
        return;
    }
    
    displayRevisionTracker(profile);
    showScreen('revision-tracker-screen');
    toggleMenu();
}

function displayRevisionTracker(profile) {
    const today = new Date();
    
    // Get all revisions due
    const scheduler = new StudyScheduler(profile);
    const revisionsDue = scheduler.getRevisionsDue();
    
    // Separate into due, upcoming, and completed
    const dueRevisions = [];
    const upcomingRevisions = [];
    
    profile.quizHistory.forEach(quiz => {
        const lastStudied = new Date(quiz.date);
        const daysSince = Math.floor((today - lastStudied) / (1000 * 60 * 60 * 24));
        
        // Check each revision interval
        [2, 7, 21].forEach((interval, index) => {
            const targetDate = new Date(lastStudied);
            targetDate.setDate(targetDate.getDate() + interval);
            
            const daysUntilRevision = Math.floor((targetDate - today) / (1000 * 60 * 60 * 24));
            
            const revisionItem = {
                subject: quiz.subject,
                topic: quiz.topic,
                subtopic: quiz.subtopic,
                lastStudied: quiz.date,
                targetDate: targetDate,
                revisionNumber: index + 1,
                daysUntil: daysUntilRevision,
                score: quiz.score
            };
            
            if (daysUntilRevision < 0) {
                // Overdue
                dueRevisions.push(revisionItem);
            } else if (daysUntilRevision <= 7) {
                // Upcoming in next 7 days
                upcomingRevisions.push(revisionItem);
            }
        });
    });
    
    // Display due revisions
    const dueList = document.getElementById('due-revisions-list');
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
                <button class="btn-revise" onclick="startRevisionQuiz('${rev.subject}', '${rev.topic}', '${rev.subtopic}')">
                    Revise Now
                </button>
            </div>
        `).join('');
    }
    
    // Display upcoming revisions
    const upcomingList = document.getElementById('upcoming-revisions-list');
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
    
    // Display completed revisions (simplified)
    const completedList = document.getElementById('completed-revisions-list');
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

function startRevisionQuiz(subject, topic, subtopic) {
    currentState.currentSubject = subject;
    startSubtopicQuiz(topic, subtopic, subtopic);
}

// ==================== ANALYTICS ====================

function showAnalytics() {
    if (!currentState.userId) {
        alert('Please login first');
        showUserForm();
        return;
    }
    
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (!profile) {
        alert('Profile not found');
        return;
    }
    
    displayAnalytics(profile);
    showScreen('analytics-screen');
    toggleMenu();
}

function displayAnalytics(profile) {
    const container = document.getElementById('analytics-content');
    
    const totalQuizzes = profile.quizHistory.length;
    const avgScore = totalQuizzes > 0 
        ? (profile.quizHistory.reduce((sum, q) => sum + parseFloat(q.score), 0) / totalQuizzes).toFixed(1)
        : 0;
    
    // Calculate learning streak
    const streak = calculateStreak(profile);
    
    // Get subject-wise performance
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
    const today = new Date().toDateString();
    
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

// ==================== MY LEARNING ====================

function showMyLearning() {
    if (!currentState.userId) {
        alert('Please login first');
        showUserForm();
        return;
    }
    
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (!profile) {
        alert('Profile not found');
        return;
    }
    
    displayMyLearning(profile);
    showScreen('my-learning-screen');
    toggleMenu();
}

function displayMyLearning(profile) {
    const container = document.getElementById('my-learning-content');
    
    const subjects = [...new Set(profile.assessments.map(a => a.subject))];
    
    if (subjects.length === 0) {
        container.innerHTML = '<p class="empty-state">No active learning paths. Start an assessment to begin!</p>';
        return;
    }
    
    let html = '<div class="learning-paths-grid">';
    
    subjects.forEach(subject => {
        const progress = profile.getSubjectProgress(subject);
        const assessment = profile.assessments.find(a => a.subject === subject);
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

// ==================== SETTINGS ====================

function showSettings() {
    showScreen('settings-screen');
    toggleMenu();
    
    // Load current settings
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (profile && profile.preferences) {
        document.getElementById('mastery-threshold').value = profile.preferences.masteryThreshold || 70;
        document.getElementById('study-goal').value = profile.preferences.studyGoal || 'exam';
    }
}

function saveSettings() {
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (!profile) return;
    
    profile.preferences = profile.preferences || {};
    profile.preferences.masteryThreshold = parseInt(document.getElementById('mastery-threshold').value);
    profile.preferences.studyGoal = document.getElementById('study-goal').value;
    profile.preferences.revisionReminders = document.getElementById('revision-reminders').checked;
    profile.preferences.dailyReminders = document.getElementById('daily-reminders').checked;
    
    saveUserProfile(profile);
    currentState.userProfile = profile;
    
    alert('✅ Settings saved successfully!');
}