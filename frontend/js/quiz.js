// ==================== QUIZ STATE ====================
let quizState = {
    currentQuizQuestions: [],
    currentQuizIndex: 0,
    quizAnswers: [],
    quizResults: null,
    currentTopicId: null,
    currentSubtopicId: null,
    currentSubtopicName: null
};

// ==================== SUBTOPIC QUIZ FUNCTIONS ====================
async function startSubtopicQuiz(topicId, subtopicId, subtopicName) {
    try {
        showLoading();
        
        quizState.currentTopicId = topicId;
        quizState.currentSubtopicId = subtopicId;
        quizState.currentSubtopicName = subtopicName;
        
        const data = await apiCall('/quiz/subtopic', 'POST', {
            userId: currentState.userId,
            subject: currentState.currentSubject,
            topicId: topicId,
            subtopicId: subtopicId
        });
        
        quizState.currentQuizQuestions = data.questions;
        quizState.currentQuizIndex = 0;
        quizState.quizAnswers = new Array(data.questions.length).fill(null);
        
        document.getElementById('subtopic-title').textContent = `${data.subtopicName} Quiz`;
        
        displayQuizQuestion();
        showScreen('subtopic-quiz-screen');
    } catch (error) {
        console.error('Error starting quiz:', error);
    } finally {
        hideLoading();
    }
}

function displayQuizQuestion() {
    const question = quizState.currentQuizQuestions[quizState.currentQuizIndex];
    const totalQuestions = quizState.currentQuizQuestions.length;
    const currentIndex = quizState.currentQuizIndex;
    
    // Update progress
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
    document.getElementById('quiz-progress').style.width = `${progress}%`;
    
    // Update question counter
    document.getElementById('quiz-question-counter').textContent = 
        `Question ${currentIndex + 1} of ${totalQuestions}`;
    
    // Display question
    document.getElementById('quiz-question-text').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (quizState.quizAnswers[currentIndex] === index) {
            optionDiv.classList.add('selected');
        }
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectQuizOption(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('quiz-prev-btn').disabled = currentIndex === 0;
    
    const nextBtn = document.getElementById('quiz-next-btn');
    if (currentIndex === totalQuestions - 1) {
        nextBtn.textContent = 'Submit Quiz';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function selectQuizOption(optionIndex) {
    quizState.quizAnswers[quizState.currentQuizIndex] = optionIndex;
    
    // Update UI
    const options = document.querySelectorAll('#quiz-options-container .option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

function previousQuizQuestion() {
    if (quizState.currentQuizIndex > 0) {
        quizState.currentQuizIndex--;
        displayQuizQuestion();
    }
}

function nextQuizQuestion() {
    const currentIndex = quizState.currentQuizIndex;
    const totalQuestions = quizState.currentQuizQuestions.length;
    
    // Check if answer is selected
    if (quizState.quizAnswers[currentIndex] === null) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (currentIndex < totalQuestions - 1) {
        quizState.currentQuizIndex++;
        displayQuizQuestion();
    } else {
        // Submit quiz
        submitQuiz();
    }
}

async function submitQuiz() {
    try {
        showLoading();
        
        // Prepare answers
        const answers = quizState.currentQuizQuestions.map((question, index) => ({
            questionId: question.id,
            selectedOption: quizState.quizAnswers[index]
        }));
        
        const results = await apiCall('/quiz/submit', 'POST', {
            userId: currentState.userId,
            subject: currentState.currentSubject,
            topicId: quizState.currentTopicId,
            subtopicId: quizState.currentSubtopicId,
            answers: answers
        });
        
        quizState.quizResults = results;
        
        // Save quiz result to user profile
        if (currentState.userProfile) {
            currentState.userProfile.addQuizResult(
                currentState.currentSubject,
                quizState.currentTopicId,
                quizState.currentSubtopicId,
                results.score,
                results.total,
                new Date()
            );
            saveUserProfile(currentState.userProfile);
            console.log('✅ Quiz result saved to profile');
        }
        
        displayQuizResults(results);
        showScreen('quiz-results-screen');
    } catch (error) {
        console.error('Error submitting quiz:', error);
    } finally {
        hideLoading();
    }
}

function displayQuizResults(results) {
    // Animate score circle
    const scoreValue = parseFloat(results.score);
    const circumference = 2 * Math.PI * 90; // radius = 90
    const offset = circumference - (scoreValue / 100) * circumference;
    
    document.getElementById('quiz-score').textContent = Math.round(scoreValue) + '%';
    
    setTimeout(() => {
        const circle = document.getElementById('quiz-score-circle');
        if (circle) {
            circle.style.strokeDashoffset = offset;
        }
    }, 100);
    
    // Update title and message
    const title = document.getElementById('quiz-result-title');
    const message = document.getElementById('quiz-result-message');
    
    if (results.passed) {
        title.textContent = '🎉 Great Job!';
        message.textContent = `You scored ${Math.round(scoreValue)}% on ${quizState.currentSubtopicName}. You're ready to move forward!`;
    } else {
        title.textContent = '📚 Keep Learning!';
        message.textContent = `You scored ${Math.round(scoreValue)}% on ${quizState.currentSubtopicName}. Review the material and try again.`;
    }
    
    // Display answer review
    const reviewContainer = document.getElementById('quiz-answer-review');
    reviewContainer.innerHTML = '<h3 style="margin-bottom: 1rem;">Answer Review</h3>';
    
    results.results.forEach((result, index) => {
        const question = quizState.currentQuizQuestions[index];
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${result.correct ? 'correct' : 'incorrect'}`;
        
        const correctSymbol = result.correct ? '✅' : '❌';
        const resultClass = result.correct ? 'correct' : 'incorrect';
        
        reviewItem.innerHTML = `
            <div class="review-question">
                ${correctSymbol} ${question.question}
            </div>
            <div class="review-answer ${resultClass}">
                Your answer: ${question.options[result.selectedOption]}
                ${!result.correct ? `<br>Correct answer: ${question.options[result.correctOption]}` : ''}
            </div>
        `;
        reviewContainer.appendChild(reviewItem);
    });
}

function backToLearningPath() {
    // Clear quiz state
    quizState.currentQuizQuestions = [];
    quizState.currentQuizIndex = 0;
    quizState.quizAnswers = [];
    quizState.quizResults = null;
    
    showScreen('learning-path-screen');
}

function retryQuiz() {
    // Restart the same quiz
    startSubtopicQuiz(
        quizState.currentTopicId,
        quizState.currentSubtopicId,
        quizState.currentSubtopicName
    );
}