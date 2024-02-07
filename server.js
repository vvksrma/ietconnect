// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // For handling file uploads

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (Make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/ietconnect', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB Schema and Model for PYQ Papers
const pyqSchema = new mongoose.Schema({
    fileName: String,
    filePath: String,
    // Add any other fields you need for PYQ papers
});

const PYQPaper = mongoose.model('PYQPaper', pyqSchema);

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Set the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Define routes for CRUD operations on PYQ Papers

// Get all PYQ papers
app.get('/api/papers', async (req, res) => {
    try {
        const papers = await PYQPaper.find();
        res.json(papers);
    } catch (error) {
        console.error('Error fetching papers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Upload a PYQ paper
app.post('/api/papers/upload', upload.single('file'), async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const newPaper = new PYQPaper({
            fileName: originalname,
            filePath: path,
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
