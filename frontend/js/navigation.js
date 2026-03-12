// ==================== NAVIGATION SYSTEM ====================

// Initialize navigation after login
function initializeNavigation() {
    console.log('🧭 Initializing navigation for user:', currentState.userName);
    
    // Show menu toggle button
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.classList.remove('hidden');
    }
    
    // Update navigation header with user info
    updateNavHeader();
    
    // Setup navigation item clicks
    setupNavigationItems();
}

// Update navigation header with user information
function updateNavHeader() {
    const navUsername = document.getElementById('nav-username');
    const navEmail = document.getElementById('nav-email');
    const navAvatar = document.getElementById('nav-avatar');
    
    if (navUsername) navUsername.textContent = currentState.userName || 'User';
    if (navEmail) navEmail.textContent = currentState.email || '';
    if (navAvatar) {
        navAvatar.textContent = (currentState.userName || 'U').charAt(0).toUpperCase();
    }
}

// Setup navigation item click handlers
function setupNavigationItems() {
    // My Learning
    const myLearningNav = document.getElementById('nav-my-learning');
    if (myLearningNav) {
        myLearningNav.onclick = () => {
            console.log('📚 Opening My Learning');
            closeNavMenu();
            showMyLearning();
        };
    }
    
    // My Profile
    const myProfileNav = document.getElementById('nav-my-profile');
    if (myProfileNav) {
        myProfileNav.onclick = () => {
            console.log('👤 Opening My Profile');
            closeNavMenu();
            showMyProfile();
        };
    }
    
    // Subjects
    const subjectsNav = document.getElementById('nav-subjects');
    if (subjectsNav) {
        subjectsNav.onclick = () => {
            console.log('📖 Opening Subjects');
            closeNavMenu();
            loadSubjects();
        };
    }
    
    // Logout
    const logoutNav = document.getElementById('nav-logout');
    if (logoutNav) {
        logoutNav.onclick = () => {
            console.log('🚪 Logging out');
            handleLogout();
        };
    }
}

// Toggle navigation menu
function toggleNavMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Close navigation menu
function closeNavMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

// Show My Learning (Dashboard)
function showMyLearning() {
    console.log('📊 Displaying My Learning Dashboard');
    
    if (!currentState.userProfile) {
        // Load profile if not loaded
        currentState.userProfile = loadUserProfile(currentState.userId);
    }
    
    if (!currentState.userProfile) {
        alert('❌ Profile not found. Please login again.');
        showAuthScreen();
        return;
    }
    
    // Display dashboard
    displayDashboard(currentState.userProfile);
    showScreen('dashboard-screen');
}

// Show My Profile
function showMyProfile() {
    console.log('👤 Displaying My Profile');
    
    if (!currentState.userProfile) {
        // Load profile if not loaded
        currentState.userProfile = loadUserProfile(currentState.userId);
    }
    
    if (!currentState.userProfile) {
        alert('❌ Profile not found. Please login again.');
        showAuthScreen();
        return;
    }
    
    // Display profile
    displayProfileScreen(currentState.userProfile);
    showScreen('profile-screen');
}

// Display Profile Screen
function displayProfileScreen(profile) {
    const container = document.getElementById('profile-content');
    if (!container) {
        console.error('❌ Profile content container not found');
        return;
    }
    
    const totalAssessments = profile.assessments.length;
    const totalQuizzes = profile.quizHistory.length;
    const subjects = [...new Set(profile.assessments.map(a => a.subject))];
    const avgScore = calculateOverallAverage(profile);
    
    container.innerHTML = `
        <div class="profile-header-section">
            <div class="profile-avatar-large">
                <div class="avatar-circle-large">${profile.name.charAt(0).toUpperCase()}</div>
            </div>
            <div class="profile-details">
                <h1>${profile.name}</h1>
                <p class="profile-university">🎓 ${profile.university}</p>
                <p class="profile-email">📧 ${profile.email}</p>
                <p class="profile-joined">📅 Member since ${formatDate(new Date(profile.createdAt))}</p>
            </div>
        </div>
        
        <div class="profile-stats-grid">
            <div class="profile-stat-card">
                <div class="stat-icon">📚</div>
                <div class="stat-number">${totalAssessments}</div>
                <div class="stat-text">Assessments</div>
            </div>
            <div class="profile-stat-card">
                <div class="stat-icon">✏️</div>
                <div class="stat-number">${totalQuizzes}</div>
                <div class="stat-text">Quizzes</div>
            </div>
            <div class="profile-stat-card">
                <div class="stat-icon">🎯</div>
                <div class="stat-number">${subjects.length}</div>
                <div class="stat-text">Subjects</div>
            </div>
            <div class="profile-stat-card">
                <div class="stat-icon">⭐</div>
                <div class="stat-number">${avgScore}%</div>
                <div class="stat-text">Avg Score</div>
            </div>
        </div>
        
        <div class="profile-actions">
            <button class="btn-primary" onclick="loadSubjects()">📖 Browse Subjects</button>
            <button class="btn-secondary" onclick="showMyLearning()">📊 My Learning Dashboard</button>
            <button class="btn-secondary" onclick="handleLogout()">🚪 Logout</button>
        </div>
    `;
}

// Handle Logout
function handleLogout() {
    const confirmed = confirm('Are you sure you want to logout?');
    if (!confirmed) return;
    
    console.log('🚪 Logging out user');
    
    // Clear current state
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
    
    // Hide menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.classList.add('hidden');
    }
    
    // Close navigation menu
    closeNavMenu();
    
    // Return to welcome screen
    showWelcome();
}

console.log('✅ navigation.js loaded');