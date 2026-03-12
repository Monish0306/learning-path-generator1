require('dotenv').config();

console.log('📝 Testing Groq API Key...\n');
console.log('Key found:', !!process.env.GROQ_API_KEY);
console.log('Key starts with:', process.env.GROQ_API_KEY?.substring(0, 10) || 'NOT FOUND');
console.log('Key length:', process.env.GROQ_API_KEY?.length || 0);

if (!process.env.GROQ_API_KEY) {
    console.log('\n❌ GROQ_API_KEY not found in .env file!');
    process.exit(1);
}

if (!process.env.GROQ_API_KEY.startsWith('gsk_')) {
    console.log('\n❌ Invalid key format! Groq keys start with "gsk_"');
    console.log('Your key starts with:', process.env.GROQ_API_KEY.substring(0, 10));
    process.exit(1);
}

const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testGroq() {
    try {
        console.log('\n🧪 Testing Groq API...');
        
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'Say "Hello World"' }],
            model: 'llama-3.3-70b-versatile',
            max_tokens: 10
        });
        
        console.log('✅ SUCCESS! Groq API is working!');
        console.log('Response:', completion.choices[0]?.message?.content);
        
    } catch (error) {
        console.log('\n❌ FAILED! Error:', error.message);
        if (error.status === 401) {
            console.log('\n🔴 Your API key is invalid!');
            console.log('Go to: https://console.groq.com/keys');
            console.log('Create a NEW key and update .env file');
        }
    }
}

testGroq();