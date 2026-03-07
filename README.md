# 🎓 Personalized Learning Path Generator

A web-based adaptive learning system that generates customized learning paths using **Design and Analysis of Algorithms (DAA)** techniques. The system creates personalized learning sequences based on individual knowledge assessments.

## 🌟 Features

- **8 Different Subjects**: Python, DAA, Machine Learning, AI, DBMS, Java, C++, C
- **Initial Assessment**: 8-10 questions to gauge current knowledge
- **Adaptive Learning Paths**: Generated using Topological Sort and DAA algorithms
- **Unique Questions**: Every quiz attempt has different questions - NO REPEATS
- **Topic Mastery Tracking**: Track progress across all subtopics
- **Beautiful Modern UI**: Gradient animations, smooth transitions, responsive design
- **Real-time Progress**: Visual feedback on learning progress

## 🏗️ Architecture

### Backend (Node.js + Express)
- RESTful API
- In-memory session management (can be upgraded to database)
- Question bank system with JSON storage
- Algorithm-driven path generation

### Frontend (Vanilla JavaScript)
- Modern ES6+ JavaScript
- No frameworks - pure performance
- Responsive CSS Grid/Flexbox
- Smooth animations and transitions

### Algorithms Used
1. **Directed Acyclic Graph (DAG)** - Topic prerequisites
2. **Topological Sorting** - Correct learning sequence
3. **Shortest Path (A*)** - Optimal learning path
4. **Greedy Algorithm** - Topic prioritization
5. **Dynamic Programming** - Score caching

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- Any modern web browser

## 🚀 Installation & Setup

### Step 1: Extract/Clone the Project

```bash
cd learning-path-generator
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express (Web framework)
- cors (Cross-origin resource sharing)
- body-parser (Request parsing)
- dotenv (Environment variables)
- nodemon (Development auto-restart)

### Step 3: Start the Server

#### For Development (with auto-restart):
```bash
npm run dev
```

#### For Production:
```bash
npm start
```

### Step 4: Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
learning-path-generator/
│
├── backend/
│   ├── server.js                 # Main Express server
│   └── data/
│       └── questions/
│           ├── python.json       # Python questions
│           ├── daa.json          # DAA questions
│           ├── ml.json           # ML questions
│           ├── ai.json           # AI questions
│           ├── dbms.json         # DBMS questions
│           ├── java.json         # Java questions
│           ├── cpp.json          # C++ questions
│           └── c.json            # C questions
│
├── frontend/
│   ├── index.html                # Main HTML file
│   ├── css/
│   │   └── styles.css            # All styles
│   └── js/
│       ├── app.js                # Main app logic
│       └── quiz.js               # Quiz functionality
│
├── package.json                   # Dependencies
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🎯 How It Works

### 1. User Registration
- Enter name, university, and email
- System generates unique user ID

### 2. Subject Selection
- Choose from 8 available subjects
- Each subject has unique question bank

### 3. Initial Assessment
- 8-10 diagnostic questions
- Questions cover all major topics
- System analyzes strengths and weaknesses

### 4. Learning Path Generation
```javascript
Algorithm: Topological Sort with Priority Queue
1. Build prerequisite graph (DAG)
2. Calculate in-degrees for all topics
3. Prioritize weak topics (low scores)
4. Generate optimal sequence using topological sort
5. Return personalized learning path
```

### 5. Subtopic Quizzes
- Each subtopic has 5-6 questions
- Questions shuffled for uniqueness
- Track used questions to avoid repeats
- Immediate feedback and scoring

### 6. Progress Tracking
- Visual dashboard with scores
- Color-coded topic status
- Mastery indicators

## 🎨 Design Features

### Color Scheme
- Primary: Indigo (#6366f1)
- Secondary: Pink (#ec4899)
- Background: Dark Slate (#0f172a)
- Surface: Slate (#1e293b)

### Animations
- Fade-in page transitions
- Floating cards
- Progress circles
- Smooth hover effects
- Gradient backgrounds

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Flexible grid system

## 🔧 Configuration

### Port Configuration
Default port is 3000. To change:

1. Create `.env` file in root:
```env
PORT=5000
```

2. Restart server

### Adding New Subjects

1. Create new JSON file in `backend/data/questions/`
2. Follow existing format:
```json
{
  "subject": "Subject Name",
  "topics": [...],
  "initialAssessment": [...]
}
```

3. Add to subjects list in `backend/server.js`:
```javascript
const subjects = [
    // ...existing subjects
    { id: 'newsubject', name: 'New Subject', icon: '📚' }
];
```

## 📊 Question Format

Each question follows this structure:
```json
{
  "id": "unique_id",
  "question": "Question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correct": 1,  // Index of correct option (0-based)
  "difficulty": "easy|medium|hard"
}
```

## 🚀 Deployment Options

### Option 1: Local Deployment
- Already covered in setup above
- Best for development and testing

### Option 2: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
git push heroku main
```

### Option 3: Vercel
```bash
# Install Vercel CLI
npm i -g vercel
vercel
```

### Option 4: Railway
```bash
# Connect to Railway
railway login
railway init
railway up
```

### Option 5: Render
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Deploy

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Questions Not Loading
- Check that all JSON files are in correct location
- Verify JSON syntax (use JSON validator)
- Check console for errors
- Ensure server is running

## 📝 API Endpoints

### GET /api/subjects
Returns list of available subjects

### POST /api/assessment/start
Start initial assessment
```json
{
  "userId": "user_123",
  "subject": "python"
}
```

### POST /api/assessment/submit
Submit assessment answers
```json
{
  "userId": "user_123",
  "subject": "python",
  "answers": [...]
}
```

### POST /api/quiz/subtopic
Get subtopic quiz
```json
{
  "userId": "user_123",
  "subject": "python",
  "topicId": "python_basics",
  "subtopicId": "variables"
}
```

### POST /api/quiz/submit
Submit quiz answers
```json
{
  "userId": "user_123",
  "subject": "python",
  "answers": [...]
}
```

### GET /api/learning-path/:userId/:subject
Get user's learning path

## 🎓 Educational Use

This project demonstrates:
- **DAA Concepts**: Graphs, topological sort, path finding
- **Algorithm Application**: Real-world problem solving
- **System Design**: Scalable architecture
- **Full-Stack Development**: Frontend + Backend integration
- **Data Structures**: Trees, graphs, queues

## 🤝 Contributing

Want to improve this project?

1. Add more subjects
2. Enhance algorithms
3. Improve UI/UX
4. Add database integration
5. Implement user authentication
6. Add analytics dashboard

## 📄 License

MIT License - Feel free to use for educational purposes

## 👨‍💻 Developer Notes

### Future Enhancements
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and profiles
- [ ] Question difficulty adaptation
- [ ] Spaced repetition algorithm
- [ ] Progress analytics and insights
- [ ] Mobile app (React Native)
- [ ] Collaborative learning features
- [ ] Gamification (badges, leaderboards)
- [ ] Export learning certificates

### Performance Optimization
- Implement caching
- Add database indexing
- Optimize question randomization
- Lazy load question sets

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review console errors
3. Verify all files are in place
4. Ensure Node.js version compatibility

---

**Built with ❤️ for adaptive learning**

Happy Learning! 🚀