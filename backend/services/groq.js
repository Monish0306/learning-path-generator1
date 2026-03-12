const Groq = require('groq-sdk');

// Initialize Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Subject metadata for better question generation
const SUBJECT_METADATA = {
    'python': {
        name: 'Python Programming',
        topics: 'variables, data types, control flow, functions, OOP, file handling, exceptions, modules',
        context: 'Python is a high-level, interpreted programming language known for its simplicity and readability.'
    },
    'daa': {
        name: 'Design and Analysis of Algorithms',
        topics: 'time complexity, space complexity, sorting, searching, greedy algorithms, dynamic programming, graph algorithms, backtracking',
        context: 'DAA focuses on analyzing algorithm efficiency and designing optimal solutions to computational problems.'
    },
    'ml': {
        name: 'Machine Learning',
        topics: 'supervised learning, unsupervised learning, regression, classification, neural networks, decision trees, evaluation metrics',
        context: 'Machine Learning is a subset of AI that enables systems to learn and improve from experience without explicit programming.'
    },
    'ai': {
        name: 'Artificial Intelligence',
        topics: 'search algorithms, knowledge representation, logic, reasoning, planning, neural networks, NLP, computer vision',
        context: 'Artificial Intelligence involves creating intelligent agents that can perceive, reason, learn, and act autonomously.'
    },
    'dbms': {
        name: 'Database Management Systems',
        topics: 'data models, SQL, normalization, transactions, ACID properties, indexing, concurrency control, recovery',
        context: 'DBMS are software systems that manage databases, ensuring data integrity, security, and efficient access.'
    },
    'java': {
        name: 'Java Programming',
        topics: 'OOP, classes, objects, inheritance, polymorphism, exception handling, collections, multithreading, JDBC',
        context: 'Java is an object-oriented, platform-independent programming language widely used for enterprise applications.'
    },
    'c': {
        name: 'C Programming',
        topics: 'variables, data types, operators, control structures, functions, pointers, arrays, strings, structures, file handling',
        context: 'C is a procedural programming language known for its efficiency and close-to-hardware capabilities.'
    },
    'cpp': {
        name: 'C++ Programming',
        topics: 'OOP, classes, objects, inheritance, polymorphism, templates, STL, pointers, memory management',
        context: 'C++ extends C with object-oriented features, making it powerful for system and application software.'
    }
};

// Difficulty level configurations
const DIFFICULTY_CONFIGS = {
    'basic': {
        description: 'fundamental concepts, definitions, simple syntax, basic operations',
        questionTypes: 'simple MCQs focusing on definitions, basic syntax, and fundamental concepts',
        complexity: 'straightforward and easy to understand'
    },
    'medium': {
        description: 'practical applications, code analysis, problem-solving, implementation details',
        questionTypes: 'MCQs with code snippets, scenario-based questions, and moderate problem-solving',
        complexity: 'moderate difficulty requiring understanding of concepts and their application'
    },
    'advanced': {
        description: 'complex algorithms, optimization, edge cases, design patterns, advanced techniques',
        questionTypes: 'complex coding scenarios, algorithm optimization, architecture design, and advanced concepts',
        complexity: 'challenging questions requiring deep understanding and critical thinking'
    }
};

/**
 * Generate assessment questions using Groq AI
 */
async function generateAssessmentQuestions(subject, difficulty = 'medium', count = 10) {
    try {
        const subjectInfo = SUBJECT_METADATA[subject.toLowerCase()] || {
            name: subject,
            topics: 'general topics',
            context: `${subject} concepts and fundamentals`
        };
        
        const difficultyInfo = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS['medium'];
        
        const prompt = `You are an expert ${subjectInfo.name} educator creating an assessment quiz.

**Subject:** ${subjectInfo.name}
**Context:** ${subjectInfo.context}
**Topics to cover:** ${subjectInfo.topics}
**Difficulty Level:** ${difficulty.toUpperCase()}
**Question Type:** ${difficultyInfo.questionTypes}
**Complexity:** ${difficultyInfo.complexity}

**CRITICAL INSTRUCTIONS:**
1. Generate EXACTLY ${count} unique, high-quality multiple-choice questions
2. Each question must have EXACTLY 4 options (A, B, C, D)
3. Questions should cover DIFFERENT topics from: ${subjectInfo.topics}
4. Focus on ${difficultyInfo.description}
5. Mark the correct answer clearly
6. Ensure questions are clear, unambiguous, and educational

**REQUIRED JSON FORMAT (STRICT):**
Return ONLY a valid JSON array with this exact structure:

[
  {
    "id": "q1",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "topic": "topic_name",
    "explanation": "Brief explanation of the correct answer"
  }
]

**IMPORTANT:**
- "correct" must be an integer (0=A, 1=B, 2=C, 3=D)
- "topic" should be a lowercase topic name with underscores (e.g., "time_complexity")
- Do NOT include markdown code blocks or any text outside the JSON
- Return ONLY the JSON array

Generate ${count} questions now:`;

        console.log(`🤖 Generating ${count} ${difficulty} questions for ${subjectInfo.name} using Groq...`);
        
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile", // Fast and powerful model
            temperature: 0.7,
            max_tokens: 4000,
        });

        let text = completion.choices[0]?.message?.content || '';
        
        // Clean up the response - remove markdown code blocks if present
        text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        
        // Parse JSON
        let questions;
        try {
            questions = JSON.parse(text);
        } catch (parseError) {
            console.error('❌ JSON Parse Error:', parseError);
            console.log('📄 Raw response:', text.substring(0, 500));
            throw new Error('Failed to parse AI response. Please try again.');
        }
        
        // Validate and sanitize questions
        if (!Array.isArray(questions)) {
            throw new Error('AI response is not an array');
        }
        
        const validQuestions = questions
            .filter(q => 
                q.question && 
                Array.isArray(q.options) && 
                q.options.length === 4 &&
                typeof q.correct === 'number' &&
                q.correct >= 0 && q.correct <= 3
            )
            .map((q, index) => ({
                id: q.id || `q${index + 1}`,
                question: q.question.trim(),
                options: q.options.map(opt => opt.trim()),
                correct: q.correct,
                topic: q.topic || 'general',
                explanation: q.explanation || ''
            }));
        
        if (validQuestions.length < Math.floor(count * 0.8)) {
            throw new Error(`Generated only ${validQuestions.length} valid questions, expected ${count}`);
        }
        
        console.log(`✅ Successfully generated ${validQuestions.length} questions`);
        return validQuestions.slice(0, count);
        
    } catch (error) {
        console.error('❌ Groq API Error:', error);
        throw new Error(`Question generation failed: ${error.message}`);
    }
}

/**
 * Generate subtopic quiz questions
 */
async function generateSubtopicQuestions(subject, topicName, subtopicName, difficulty = 'medium', count = 6) {
    try {
        const subjectInfo = SUBJECT_METADATA[subject.toLowerCase()] || { name: subject };
        const difficultyInfo = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS['medium'];
        
        const prompt = `You are an expert ${subjectInfo.name} educator creating a focused quiz.

**Subject:** ${subjectInfo.name}
**Topic:** ${topicName}
**Subtopic:** ${subtopicName}
**Difficulty Level:** ${difficulty.toUpperCase()}
**Question Type:** ${difficultyInfo.questionTypes}

**CRITICAL INSTRUCTIONS:**
1. Generate EXACTLY ${count} questions SPECIFICALLY about "${subtopicName}"
2. Each question must have EXACTLY 4 options
3. All questions must focus ONLY on ${subtopicName}
4. Difficulty: ${difficultyInfo.complexity}
5. Include practical examples and scenarios

**REQUIRED JSON FORMAT:**
[
  {
    "id": "q1",
    "question": "Question about ${subtopicName}?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Why this answer is correct"
  }
]

Return ONLY the JSON array, no markdown:`;

        console.log(`🤖 Generating ${count} ${difficulty} questions for ${subtopicName} using Groq...`);
        
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 3000,
        });

        let text = completion.choices[0]?.message?.content || '';
        
        // Clean response
        text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        
        const questions = JSON.parse(text);
        
        const validQuestions = questions
            .filter(q => 
                q.question && 
                Array.isArray(q.options) && 
                q.options.length === 4 &&
                typeof q.correct === 'number' &&
                q.correct >= 0 && q.correct <= 3
            )
            .map((q, index) => ({
                id: q.id || `sq${index + 1}`,
                question: q.question.trim(),
                options: q.options.map(opt => opt.trim()),
                correct: q.correct,
                explanation: q.explanation || ''
            }))
            .slice(0, count);
        
        console.log(`✅ Generated ${validQuestions.length} subtopic questions`);
        return validQuestions;
        
    } catch (error) {
        console.error('❌ Subtopic question generation error:', error);
        throw error;
    }
}

module.exports = {
    generateAssessmentQuestions,
    generateSubtopicQuestions
};