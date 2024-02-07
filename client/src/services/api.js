import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Update with your backend URL
});

export const getPYQPapers = () => api.get('/papers');
export const uploadPYQPaper = (data) => api.post('/papers/upload', data);

// Add more API requests as needed