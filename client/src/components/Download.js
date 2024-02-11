import React, { useState } from 'react';

class Download extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paperId: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({ paperId: event.target.value });
    }

    downloadPaper = async () => {
        const { paperId } = this.state;
        try {
            const response = await fetch(`/api/papers/download/${paperId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'paper.pdf'); // or any other extension
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.paperId} onChange={this.handleInputChange} />
                <button onClick={this.downloadPaper}>
                    Download Paper
                </button>
            </div>
        );
    }
}

export default Download;