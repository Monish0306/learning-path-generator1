// ==================== SCHEDULER GENERATION ====================

function generateSchedule() {
    const profile = currentState.userProfile || loadUserProfile(currentState.userId);
    if (!profile) {
        alert('Profile not found');
        return;
    }
    
    // Get preferences from form
    const dailyHours = parseInt(document.getElementById('daily-hours').value) || 2;
    const timeSlot = document.getElementById('time-slot').value || 'morning';
    const daysPerWeek = parseInt(document.getElementById('days-per-week').value) || 5;
    const sessionDuration = parseInt(document.getElementById('session-duration').value) || 45;
    
    const examDateInput = document.getElementById('exam-date');
    const examDate = examDateInput && examDateInput.value ? new Date(examDateInput.value) : null;
    
    const preferences = {
        dailyStudyHours: dailyHours,
        preferredTimeSlot: timeSlot,
        daysPerWeek: daysPerWeek,
        sessionDuration: sessionDuration
    };
    
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

// ==================== STUDY SCHEDULER CLASS ====================

class StudyScheduler {
    constructor(userProfile) {
        this.profile = userProfile;
        this.forgettingCurveIntervals = [2, 7, 21];
        this.revisionBuffer = 1;
    }
    
    generateSchedule(preferences, examDate = null) {
        const {
            dailyStudyHours = 2,
            preferredTimeSlot = 'morning',
            daysPerWeek = 7,
            sessionDuration = 45
        } = preferences;
        
        const topicsToStudy = this.getTopicsRequiringAttention();
        
        const today = new Date();
        const deadline = examDate || this.addDays(today, 30);
        const availableDays = this.calculateAvailableDays(today, deadline, daysPerWeek);
        
        const schedule = this.allocateTimeSlots(
            topicsToStudy,
            availableDays,
            dailyStudyHours,
            sessionDuration,
            preferredTimeSlot
        );
        
        return {
            schedule,
            summary: this.generateScheduleSummary(schedule),
            revisionDates: this.calculateRevisionSchedule(schedule),
            examDate: deadline
        };
    }
    
    getTopicsRequiringAttention() {
        const topics = [];
        
        this.profile.assessments.forEach(assessment => {
            Object.entries(assessment.topicScores).forEach(([topic, score]) => {
                if (score < 70) {
                    topics.push({
                        subject: assessment.subject,
                        topic,
                        priority: this.calculatePriority(score, null, 'weak'),
                        reason: 'Weak Prerequisite Detected',
                        currentMastery: score,
                        estimatedTime: this.estimateStudyTime(score),
                        type: 'learning'
                    });
                }
            });
        });
        
        const revisionsNeeded = this.getRevisionsDue();
        topics.push(...revisionsNeeded);
        
        return topics.sort((a, b) => b.priority - a.priority);
    }
    
    getRevisionsDue() {
        const today = new Date();
        const revisions = [];
        
        this.profile.quizHistory.forEach(quiz => {
            const lastStudied = new Date(quiz.date);
            const daysSince = this.daysBetween(lastStudied, today);
            const score = parseFloat(quiz.score);
            
            let nextRevisionInterval = null;
            let revisionNumber = 0;
            
            for (let i = 0; i < this.forgettingCurveIntervals.length; i++) {
                const interval = this.forgettingCurveIntervals[i];
                if (daysSince >= interval - this.revisionBuffer && daysSince <= interval + this.revisionBuffer) {
                    nextRevisionInterval = interval;
                    revisionNumber = i + 1;
                    break;
                }
            }
            
            if (nextRevisionInterval) {
                revisions.push({
                    subject: quiz.subject,
                    topic: quiz.topic,
                    subtopic: quiz.subtopic,
                    priority: this.calculatePriority(score, daysSince, 'revision'),
                    reason: `Long Time Since Last Revision (${daysSince} days ago)`,
                    currentMastery: score,
                    estimatedTime: 30,
                    type: 'revision',
                    revisionNumber,
                    lastStudied: quiz.date
                });
            }
        });
        
        return revisions;
    }
    
    calculatePriority(masteryScore, daysSinceLastStudy, type) {
        let priority = 0;
        
        const masteryFactor = (100 - masteryScore) / 10;
        priority += masteryFactor;
        
        if (daysSinceLastStudy !== null) {
            const timeFactor = Math.min(daysSinceLastStudy / 7, 5);
            priority += timeFactor;
        }
        
        const typeWeights = {
            'weak': 3,
            'revision': 2,
            'new': 1
        };
        priority += typeWeights[type] || 0;
        
        return priority;
    }
    
    estimateStudyTime(currentMastery) {
        if (currentMastery < 30) return 90;
        if (currentMastery < 50) return 60;
        if (currentMastery < 70) return 45;
        return 30;
    }
    
    allocateTimeSlots(topics, availableDays, dailyHours, sessionDuration, timeSlot) {
        const schedule = [];
        const sessionsPerDay = Math.floor((dailyHours * 60) / sessionDuration);
        
        let topicIndex = 0;
        
        for (let day = 0; day < availableDays.length && topicIndex < topics.length; day++) {
            const daySchedule = {
                date: availableDays[day],
                sessions: [],
                totalMinutes: 0
            };
            
            for (let session = 0; session < sessionsPerDay && topicIndex < topics.length; session++) {
                const topic = topics[topicIndex];
                const sessionTime = Math.min(sessionDuration, topic.estimatedTime);
                
                daySchedule.sessions.push({
                    ...topic,
                    sessionNumber: session + 1,
                    duration: sessionTime,
                    timeSlot: this.getTimeSlotRange(timeSlot, session),
                    taskType: topic.type === 'revision' ? 'Revision' : 'Learning'
                });
                
                daySchedule.totalMinutes += sessionTime;
                topic.estimatedTime -= sessionTime;
                
                if (topic.estimatedTime <= 0) {
                    topicIndex++;
                }
            }
            
            if (daySchedule.sessions.length > 0) {
                schedule.push(daySchedule);
            }
        }
        
        return schedule;
    }
    
    calculateRevisionSchedule(schedule) {
        const revisionSchedule = [];
        
        schedule.forEach(day => {
            day.sessions.forEach(session => {
                if (session.type === 'learning') {
                    this.forgettingCurveIntervals.forEach((interval, index) => {
                        const revisionDate = this.addDays(new Date(day.date), interval);
                        revisionSchedule.push({
                            date: revisionDate,
                            topic: session.topic,
                            subject: session.subject,
                            revisionNumber: index + 1,
                            originalStudyDate: day.date,
                            duration: 20,
                            reason: `Revision ${index + 1} (Forgetting Curve)`
                        });
                    });
                }
            });
        });
        
        return revisionSchedule.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    generateScheduleSummary(schedule) {
        const totalDays = schedule.length;
        const totalSessions = schedule.reduce((sum, day) => sum + day.sessions.length, 0);
        const totalMinutes = schedule.reduce((sum, day) => sum + day.totalMinutes, 0);
        const totalHours = (totalMinutes / 60).toFixed(1);
        
        const topicCounts = {};
        schedule.forEach(day => {
            day.sessions.forEach(session => {
                const key = session.subject;
                topicCounts[key] = (topicCounts[key] || 0) + 1;
            });
        });
        
        return {
            totalDays,
            totalSessions,
            totalHours,
            averageSessionsPerDay: (totalSessions / totalDays).toFixed(1),
            subjectDistribution: topicCounts
        };
    }
    
    getTimeSlotRange(slot, sessionNumber) {
        const slots = {
            'morning': ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM'],
            'afternoon': ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
            'evening': ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
            'night': ['9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM']
        };
        
        return slots[slot] ? slots[slot][sessionNumber % 4] : '9:00 AM';
    }
    
    calculateAvailableDays(startDate, endDate, daysPerWeek) {
        const days = [];
        const current = new Date(startDate);
        
        while (current <= endDate) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        
        if (daysPerWeek < 7) {
            return days.filter((_, index) => index % Math.ceil(7 / daysPerWeek) === 0);
        }
        
        return days;
    }
    
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    
    daysBetween(date1, date2) {
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}

console.log('✅ scheduler.js loaded');