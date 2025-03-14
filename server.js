const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to get all quiz files
app.get('/api/quizzes', (req, res) => {
    const quizDirectory = 'C:\\Users\\shettyra\\Desktop\\sanjeet2';
    
    try {
        // Read all files in the directory
        const files = fs.readdirSync(quizDirectory);
        
        // Filter for quiz files and read their contents
        const quizzes = files
            .filter(file => file.endsWith('-quizzes.txt'))
            .map(file => {
                const teacherName = file.replace('-quizzes.txt', '');
                const filePath = path.join(quizDirectory, file);
                const content = fs.readFileSync(filePath, 'utf8');
                
                try {
                    const quizData = JSON.parse(content);
                    return {
                        teacherName,
                        quizzes: Array.isArray(quizData) ? quizData : [quizData]
                    };
                } catch (error) {
                    console.error(`Error parsing quiz file ${file}:`, error);
                    return null;
                }
            })
            .filter(quiz => quiz !== null);

        res.json(quizzes);
    } catch (error) {
        console.error('Error reading quiz directory:', error);
        res.status(500).json({ error: 'Error loading quizzes' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 