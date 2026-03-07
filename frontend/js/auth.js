// ==================== AUTHENTICATION SYSTEM ====================

// Global users database (in localStorage)
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users') || '{}');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Password validation: 9+ chars, 1 uppercase, 1 lowercase, 1 special (@, #, etc)
function validatePassword(password) {
    const rules = {
        minLength: password.length >= 9,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasSpecial: /[@#$%^&*!]/.test(password)
    };
    
    const isValid = Object.values(rules).every(Boolean);
    
    return {
        isValid,
        rules,
        errors: getPasswordErrors(rules)
    };
}

function getPasswordErrors(rules) {
    const errors = [];
    if (!rules.minLength) errors.push('At least 9 characters');
    if (!rules.hasUpperCase) errors.push('One uppercase letter');
    if (!rules.hasLowerCase) errors.push('One lowercase letter');
    if (!rules.hasSpecial) errors.push('One special character (@, #, $, %, ^, &, *, !)');
    return errors;
}

// ==================== PASSWORD VISIBILITY TOGGLE ====================

function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);
    
    if (!passwordInput || !eyeIcon) return;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '👁️'; // Open eye
        eyeIcon.title = 'Hide password';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️‍🗨️'; // Closed eye
        eyeIcon.title = 'Show password';
    }
}

function setupPasswordToggles() {
    // Add eye icons to password fields
    const passwordFields = [
        { inputId: 'login-password', iconId: 'login-password-toggle' },
        { inputId: 'signup-password', iconId: 'signup-password-toggle' },
        { inputId: 'signup-confirm-password', iconId: 'signup-confirm-password-toggle' }
    ];
    
    passwordFields.forEach(field => {
        const input = document.getElementById(field.inputId);
        if (!input) return;
        
        // Check if toggle already exists
        if (document.getElementById(field.iconId)) return;
        
        // Create password toggle wrapper
        const wrapper = input.parentElement;
        const originalInput = wrapper.querySelector('input');
        
        // Create new structure
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'password-input-wrapper';
        
        const newInput = originalInput.cloneNode(true);
        const eyeIcon = document.createElement('span');
        eyeIcon.id = field.iconId;
        eyeIcon.className = 'password-toggle-icon';
        eyeIcon.textContent = '👁️‍🗨️';
        eyeIcon.title = 'Show password';
        eyeIcon.onclick = () => togglePasswordVisibility(field.inputId, field.iconId);
        
        toggleContainer.appendChild(newInput);
        toggleContainer.appendChild(eyeIcon);
        
        // Replace original input with wrapper
        originalInput.replaceWith(toggleContainer);
    });
}

// Real-time password validation feedback
function setupPasswordValidation() {
    const passwordInput = document.getElementById('signup-password');
    const feedback = document.getElementById('password-validation');
    
    if (!passwordInput || !feedback) return;
    
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        
        if (password.length === 0) {
            feedback.innerHTML = '';
            feedback.className = 'validation-feedback';
            return;
        }
        
        const validation = validatePassword(password);
        
        if (validation.isValid) {
            feedback.innerHTML = '<span class="valid-check">✅ Password is strong!</span>';
            feedback.className = 'validation-feedback valid';
        } else {
            const errorList = validation.errors.map(err => `<li>${err}</li>`).join('');
            feedback.innerHTML = `
                <div class="validation-header">Password must have:</div>
                <ul class="validation-list">${errorList}</ul>
            `;
            feedback.className = 'validation-feedback invalid';
        }
    });
}

// Show login form
function showLoginForm() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-tab')[0].classList.add('active');
    
    // Setup password toggles
    setTimeout(setupPasswordToggles, 100);
}

// Show signup form
function showSignupForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
    
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-tab')[1].classList.add('active');
    
    // Setup password validation and toggles
    setTimeout(() => {
        setupPasswordValidation();
        setupPasswordToggles();
    }, 100);
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return false;
    }
    
    const users = getAllUsers();
    const user = users[email];
    
    if (!user) {
        alert('❌ Account not found. Please sign up first.');
        return false;
    }
    
    if (user.password !== password) {
        alert('❌ Incorrect password. Please try again.');
        return false;
    }
    
    // Login successful
    console.log('✅ Login successful:', user.name);
    
    currentState.userId = user.id;
    currentState.userName = user.name;
    currentState.university = user.university;
    currentState.email = user.email;
    
    // Load or create profile
    let profile = loadUserProfile(user.id);
    if (!profile) {
        profile = new UserProfile(user.id, user.name, user.university, user.email);
        saveUserProfile(profile);
    }
    currentState.userProfile = profile;
    
    // Initialize navigation and show subjects
    initializeNavigation();
    loadSubjects();
    
    return false;
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const university = document.getElementById('signup-university').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validate all fields
    if (!name || !email || !university || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return false;
    }
    
    // Validate password
    const validation = validatePassword(password);
    if (!validation.isValid) {
        alert('❌ Password requirements not met:\n\n' + validation.errors.join('\n'));
        return false;
    }
    
    // Check password match
    if (password !== confirmPassword) {
        alert('❌ Passwords do not match');
        return false;
    }
    
    // Check if user already exists
    const users = getAllUsers();
    if (users[email]) {
        alert('❌ Account with this email already exists. Please login instead.');
        return false;
    }
    
    // Create new user
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    users[email] = {
        id: userId,
        name: name,
        email: email,
        university: university,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    saveUsers(users);
    
    // Create user profile
    const profile = new UserProfile(userId, name, university, email);
    saveUserProfile(profile);
    
    console.log('✅ Account created:', name);
    
    // Show success and switch to login
    alert('✅ Account created successfully!\n\nPlease login to continue.');
    
    // Switch to login form and pre-fill email
    showLoginForm();
    document.getElementById('login-email').value = email;
    document.getElementById('login-password').focus();
    
    return false;
}

// Show auth screen
function showAuthScreen() {
    showScreen('auth-screen');
    showLoginForm();
}

// Initialize auth screen when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Setup password toggles
    setupPasswordToggles();
    
    // Setup password validation if on signup form
    if (document.getElementById('signup-password')) {
        setupPasswordValidation();
    }
});