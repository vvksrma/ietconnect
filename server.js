const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Grid = require('gridfs-stream');
const QuestionPaper = require('./models/QuestionPaper');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const url = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(url)
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
    gfs.collection('files');
});

// Create GridFS storage engine
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        return {
            filename: file.originalname
        };
    },
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
            year: req.body.year,
            branch: req.body.branch,
            semester: req.body.semester,
            subject: req.body.subject,
            // Add other fields as needed
        });
        await newPaper.save();
        res.json({ message: 'File uploaded successfully!' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Download a PYQ paper
app.get('/api/papers/download/:id', async (req, res) => {
    try {
        const paper = await QuestionPaper.findById(req.params.id);
        if (!paper) {
            return res.status(404).json({ error: 'Paper not found' });
        }
        const readStream = gfs.createReadStream({ filename: paper.filePath });
        readStream.pipe(res);
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add routes for updating and deleting PYQ papers as needed

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});