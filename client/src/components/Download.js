// client/src/components/Download.js
import React, { useState, useEffect } from 'react';
import { getPYQPapers } from '../services/api';

const Download = () => {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await getPYQPapers();
                setPapers(response.data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        fetchPapers();
    }, []);

    return (
        <div>
            <h2>Download PYQ Papers</h2>
            <ul>
                {papers.map((paper) => (
                    <li key={paper._id}>
                        {paper.fileName}{' '}
                        <a href={`http://localhost:5000/${paper.filePath}`} download>
                            Download
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Download;