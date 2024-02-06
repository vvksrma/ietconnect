import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState();

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      // Handle the response here
    })
    .catch(error => {
      // Handle any errors here
    });
  };

  return (
    <div className="App">
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </div>
  );
}

export default App;