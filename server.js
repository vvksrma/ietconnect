const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const app = express();

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/ietconnect',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'uploads'
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.status(201).send({ file: req.file });
});

app.get('/file/:filename', (req, res) => {
  // Code to retrieve file from GridFS and send it to the client
});

const port = 4000; // Change the port number to your desired value

app.listen(port, () => console.log(`Server started on port ${port}`));
