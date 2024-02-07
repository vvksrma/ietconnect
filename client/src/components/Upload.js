// client/src/components/Upload.js
import React, { useState } from 'react';
import { uploadPYQPaper } from '../services/api';

const Upload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await uploadPYQPaper(formData);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload PYQ Paper</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Upload;
