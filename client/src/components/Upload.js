// client/src/components/Upload.js
import React, { useState } from 'react';
import { uploadPYQPaper } from '../services/api';
import { Autocomplete, Button } from '@mui/material';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [year, setYear] = useState('');
    const [subject, setSubject] = useState('');
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('year', year);
            formData.append('subject', subject);
            formData.append('branch', branch);
            formData.append('semester', semester);
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
            <input type="text" placeholder="Enter the year" value={year} onChange={(e) => setYear(e.target.value)} />
            <input type="text" placeholder="Enter the subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <input type="text" placeholder="Enter the branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
            <input type="text" placeholder="Enter the semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
            <Button onClick={handleUpload} variant="contained">Submit</Button>
        </div>
    );
};

export default Upload;
