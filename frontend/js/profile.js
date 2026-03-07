// ==================== USER VALIDATION & PROFILE MANAGEMENT ====================

// Username Validation Rules
const usernameValidation = {
    minLength: 9,
    rules: {
        hasUpperCase: /[A-Z]/,
        hasLowerCase: /[a-z]/,
        hasDigit: /[0-9]/,
        hasSpecialChar: /[@#$%^&*!]/,
        validFormat: /^[A-Za-z0-9@#$%^&*!]{9,}$/
    }
};

// Validate username
function validateUsername(username) {
    const errors = [];
    
    if (!username || username.length < usernameValidation.minLength) {
        errors.push(`Username must be at least ${usernameValidation.minLength} characters long`);
    }
    
    if (!usernameValidation.rules.hasUpperCase.test(username)) {
        errors.push('Username must contain at least one uppercase letter');
    }
    
    if (!usernameValidation.rules.hasLowerCase.test(username)) {
        errors.push('Username must contain at least one lowercase letter');
    }
    
    if (!usernameValidation.rules.hasDigit.test(username)) {
        errors.push('Username must contain at least one digit');
    }
    
    if (!usernameValidation.rules.hasSpecialChar.test(username)) {
        errors.push('Username must contain at least one special character (@, #, $, %, ^, &, *, !)');
    }
    
    if (!usernameValidation.rules.validFormat.test(username)) {
        errors.push('Username contains invalid characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Real-time validation feedback
function setupUsernameValidation() {
    const usernameInput = document.getElementById('name');
    const validationFeedback = document.createElement('div');
    validationFeedback.id = 'username-validation';
    validationFeedback.className = 'validation-feedback';
    usernameInput.parentNode.appendChild(validationFeedback);
    
    usernameInput.addEventListener('input', (e) => {
        const username = e.target.value;
        const validation = validateUsername(username);
        
        if (username.length === 0) {
            validationFeedback.innerHTML = '';
            validationFeedback.className = 'validation-feedback';
            return;
        }
        
        if (validation.isValid) {
            validationFeedback.innerHTML = '<span class="valid-check">✅ Username is valid!</span>';
            validationFeedback.className = 'validation-feedback valid';
        } else {
            const errorList = validation.errors.map(err => `<li>${err}</li>`).join('');
            validationFeedback.innerHTML = `
                <div class="validation-header">❌ Username requirements:</div>
                <ul class="validation-list">${errorList}</ul>
            `;
            validationFeedback.className = 'validation-feedback invalid';
        }
    });
}

// User Profile Data Structure
class UserProfile {
    constructor(userId, name, university, email) {
        this.userId = userId;
        this.name = name;
        this.university = university;
        this.email = email;
        this.createdAt = new Date().toISOString();
        this.assessments = [];
        this.quizHistory = [];
        this.studySchedule = null;
        this.revisionSchedule = [];
        this.preferences = {
            dailyStudyHours: 2,
            preferredTimeSlot: 'morning',
            studyGoal: 'exam'
        };
    }
    
    addAssessment(subject, score, topicScores, date = new Date()) {
        this.assessments.push({
            subject,
            score,
            topicScores,
            date: date.toISOString(),
            id: 'assess_' + Date.now()
        });
    }
    
    addQuizResult(subject, topic, subtopic, score, questions, date = new Date()) {
        this.quizHistory.push({
            subject,
            topic,
            subtopic,
            score,
            questionsCount: questions,
            date: date.toISOString(),
            id: 'quiz_' + Date.now()
        });
    }
    
    getTotalQuizzesAttempted() {
        return this.quizHistory.length;
    }
    
    getSubjectProgress(subject) {
        const subjectAssessments = this.assessments.filter(a => a.subject === subject);
        const subjectQuizzes = this.quizHistory.filter(q => q.subject === subject);
        
        return {
            assessments: subjectAssessments.length,
            quizzes: subjectQuizzes.length,
            avgScore: this.calculateAverageScore(subject),
            lastStudied: this.getLastStudyDate(subject)
        };
    }
    
    calculateAverageScore(subject) {
        const scores = this.quizHistory
            .filter(q => q.subject === subject)
            .map(q => parseFloat(q.score));
        
        if (scores.length === 0) return 0;
        return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
    }
    
    getLastStudyDate(subject) {
        const subjectHistory = this.quizHistory
            .filter(q => q.subject === subject)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return subjectHistory.length > 0 ? new Date(subjectHistory[0].date) : null;
    }
    
    getWeakTopics(subject, threshold = 60) {
        const assessment = this.assessments.find(a => a.subject === subject);
        if (!assessment) return [];
        
        return Object.entries(assessment.topicScores)
            .filter(([topic, score]) => score < threshold)
            .map(([topic, score]) => ({ topic, score }))
            .sort((a, b) => a.score - b.score);
    }
}

// Save user profile to localStorage
function saveUserProfile(profile) {
    try {
        localStorage.setItem('userProfile_' + profile.userId, JSON.stringify(profile));
        console.log('✅ Profile saved:', profile.userId);
    } catch (error) {
        console.error('❌ Error saving profile:', error);
    }
}

// Load user profile from localStorage
function loadUserProfile(userId) {
    try {
        const data = localStorage.getItem('userProfile_' + userId);
        if (data) {
            const profileData = JSON.parse(data);
            const profile = new UserProfile(
                profileData.userId,
                profileData.name,
                profileData.university,
                profileData.email
            );
            Object.assign(profile, profileData);
            console.log('✅ Profile loaded:', userId);
            return profile;
        }
    } catch (error) {
        console.error('❌ Error loading profile:', error);
    }
    return null;
}

// Get all user profiles
function getAllUserProfiles() {
    const profiles = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('userProfile_')) {
            const data = localStorage.getItem(key);
            if (data) {
                profiles.push(JSON.parse(data));
            }
        }
    }
    return profiles;
}

// Initialize validation on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('user-info-form')) {
        setupUsernameValidation();
    }
});