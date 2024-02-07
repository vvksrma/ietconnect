const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Grid = require('gridfs-stream');
const QuestionPaper = require('./models/QuestionPaper');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://heydevanand:engineerdev@dev-cluster.okxr9gy.mongodb.net/ietconnect')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const connection = mongoose.connection;
let gfs;

connection.once('open', () => {
    // Initialize GridFS stream
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create GridFS storage engine
const storage = new GridFsStorage({
    url: 'mongodb+srv://heydevanand:engineerdev@dev-cluster.okxr9gy.mongodb.net/ietconnect',
    file: (req, file) => {
        return {
            filename: file.originalname
        };
    }
});

const upload = multer({ storage });

// Define routes for CRUD operations on PYQ Papers

// Get all PYQ papers
app.get('/api/papers', async (req, res) => {
    try {
        const papers = await QuestionPaper.find();
        res.json(papers);
    } catch (error) {
        console.error('Error fetching papers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Upload a PYQ paper
app.post('/api/papers/upload', upload.single('file'), async (req, res) => {
    try {
        const { originalname, filename } = req.file;
        const newPaper = new QuestionPaper({
            fileName: originalname,
            filePath: filename,
            // Add other fields as needed
        });
        await newPaper.save();
        res.json({ message: 'File uploaded successfully!' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add routes for updating and deleting PYQ papers as needed

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});