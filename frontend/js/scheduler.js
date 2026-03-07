// ==================== SMART STUDY SCHEDULER ====================
// Implements: Forgetting Curve + Spaced Repetition + Constraint-based Scheduling

class StudyScheduler {
    constructor(userProfile) {
        this.profile = userProfile;
        this.forgettingCurveIntervals = [2, 7, 21]; // Days: 1st, 2nd, 3rd revision
        this.revisionBuffer = 1; // Extra day buffer for flexibility
    }
    
    /**
     * Generate personalized study schedule
     * @param {Object} preferences - User study preferences
     * @param {Date} examDate - Target exam/deadline date
     * @returns {Object} Complete study schedule
     */
    generateSchedule(preferences, examDate = null) {
        const {
            dailyStudyHours = 2,
            preferredTimeSlot = 'morning', // morning, afternoon, evening, night
            daysPerWeek = 7,
            sessionDuration = 45 // minutes per session
        } = preferences;
        
        // Get all topics that need study/revision
        const topicsToStudy = this.getTopicsRequiringAttention();
        
        // Calculate available study days
        const today = new Date();
        const deadline = examDate || this.addDays(today, 30); // Default 30 days
        const availableDays = this.calculateAvailableDays(today, deadline, daysPerWeek);
        
        // Allocate time slots
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
    
    /**
     * Identify topics needing study based on:
     * 1. Weak performance (< 60%)
     * 2. Never studied
     * 3. Due for revision (Forgetting Curve)
     * 4. Prerequisites for future topics
     */
    getTopicsRequiringAttention() {
        const topics = [];
        
        // Weak topics from assessments
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
        
        // Topics due for revision (Forgetting Curve)
        const revisionsNeeded = this.getRevisionsDue();
        topics.push(...revisionsNeeded);
        
        // Sort by priority
        return topics.sort((a, b) => b.priority - a.priority);
    }
    
    /**
     * Calculate revision schedule using Forgetting Curve
     * Revisions at: 2 days, 7 days, 21 days after initial study
     */
    getRevisionsDue() {
        const today = new Date();
        const revisions = [];
        
        this.profile.quizHistory.forEach(quiz => {
            const lastStudied = new Date(quiz.date);
            const daysSince = this.daysBetween(lastStudied, today);
            const score = parseFloat(quiz.score);
            
            // Determine which revision interval
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
                    estimatedTime: 30, // Revisions typically shorter
                    type: 'revision',
                    revisionNumber,
                    lastStudied: quiz.date
                });
            }
        });
        
        return revisions;
    }
    
    /**
     * Calculate priority score for topic
     * Higher score = higher priority
     */
    calculatePriority(masteryScore, daysSinceLastStudy, type) {
        let priority = 0;
        
        // Factor 1: Mastery level (lower mastery = higher priority)
        const masteryFactor = (100 - masteryScore) / 10; // 0-10 points
        priority += masteryFactor;
        
        // Factor 2: Time since last study (for revisions)
        if (daysSinceLastStudy !== null) {
            const timeFactor = Math.min(daysSinceLastStudy / 7, 5); // Max 5 points
            priority += timeFactor;
        }
        
        // Factor 3: Type weight
        const typeWeights = {
            'weak': 3,
            'revision': 2,
            'new': 1
        };
        priority += typeWeights[type] || 0;
        
        return priority;
    }
    
    /**
     * Estimate study time needed based on current mastery
     */
    estimateStudyTime(currentMastery) {
        if (currentMastery < 30) return 90; // 1.5 hours
        if (currentMastery < 50) return 60; // 1 hour
        if (currentMastery < 70) return 45; // 45 mins
        return 30; // 30 mins for touch-up
    }
    
    /**
     * Allocate topics to time slots
     */
    allocateTimeSlots(topics, availableDays, dailyHours, sessionDuration, timeSlot) {
        const schedule = [];
        const sessionsPerDay = Math.floor((dailyHours * 60) / sessionDuration);
        
        let topicIndex = 0;
        let currentDay = new Date();
        
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
                
                // Move to next topic if current is complete
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
    
    /**
     * Calculate revision schedule using Forgetting Curve
     */
    calculateRevisionSchedule(schedule) {
        const revisionSchedule = [];
        
        schedule.forEach(day => {
            day.sessions.forEach(session => {
                if (session.type === 'learning') {
                    // Schedule 3 revisions based on forgetting curve
                    this.forgettingCurveIntervals.forEach((interval, index) => {
                        const revisionDate = this.addDays(new Date(day.date), interval);
                        revisionSchedule.push({
                            date: revisionDate,
                            topic: session.topic,
                            subject: session.subject,
                            revisionNumber: index + 1,
                            originalStudyDate: day.date,
                            duration: 20, // Shorter for revision
                            reason: `Revision ${index + 1} (Forgetting Curve)`
                        });
                    });
                }
            });
        });
        
        return revisionSchedule.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    /**
     * Generate schedule summary
     */
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
    
    // ==================== HELPER FUNCTIONS ====================
    
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
        
        // If not studying all 7 days, filter to desired days
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

// ==================== EXPLAINABLE LEARNING PATH ====================

class ExplainableLearningPath {
    constructor(learningPath, profile) {
        this.path = learningPath;
        this.profile = profile;
    }
    
    /**
     * Generate explanations for why each topic is in the path
     */
    explainTopic(topic) {
        const explanations = [];
        
        // Check 1: Weak prerequisite
        const topicScore = this.getTopicScore(topic.id);
        if (topicScore !== null && topicScore < 60) {
            explanations.push({
                type: 'weak_prerequisite',
                icon: '⚠️',
                title: 'Weak Prerequisite Detected',
                description: `You scored ${Math.round(topicScore)}% in this topic, which is below the required 70% mastery level.`,
                priority: 'high'
            });
        }
        
        // Check 2: Required for future topics
        const dependents = this.getTopicsThatRequire(topic.id);
        if (dependents.length > 0) {
            explanations.push({
                type: 'required_for_future',
                icon: '🔗',
                title: 'Required for Future Topics',
                description: `This topic is required to understand: ${dependents.join(', ')}`,
                priority: 'medium'
            });
        }
        
        // Check 3: Time since last revision
        const daysSinceStudy = this.getDaysSinceLastStudy(topic.id);
        if (daysSinceStudy !== null && daysSinceStudy > 14) {
            explanations.push({
                type: 'revision_needed',
                icon: '🔄',
                title: 'Long Time Since Last Revision',
                description: `You last studied this topic ${daysSinceStudy} days ago. Regular revision prevents forgetting.`,
                priority: 'medium'
            });
        }
        
        // Check 4: High importance
        if (topic.prerequisites && topic.prerequisites.length === 0) {
            explanations.push({
                type: 'foundation',
                icon: '🏗️',
                title: 'Foundation Topic',
                description: 'This is a fundamental topic with no prerequisites. It\'s essential for building advanced knowledge.',
                priority: 'high'
            });
        }
        
        return explanations;
    }
    
    getTopicScore(topicId) {
        for (const assessment of this.profile.assessments) {
            if (assessment.topicScores[topicId] !== undefined) {
                return assessment.topicScores[topicId];
            }
        }
        return null;
    }
    
    getTopicsThatRequire(topicId) {
        const dependents = [];
        this.path.forEach(topic => {
            if (topic.prerequisites && topic.prerequisites.includes(topicId)) {
                dependents.push(topic.name);
            }
        });
        return dependents;
    }
    
    getDaysSinceLastStudy(topicId) {
        const quizzes = this.profile.quizHistory.filter(q => q.topic === topicId);
        if (quizzes.length === 0) return null;
        
        const lastQuiz = quizzes.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        const daysDiff = Math.floor((new Date() - new Date(lastQuiz.date)) / (1000 * 60 * 60 * 24));
        return daysDiff;
    }
}