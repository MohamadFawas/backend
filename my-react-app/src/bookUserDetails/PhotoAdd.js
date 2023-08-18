import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PhotoAdd = () => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/employeeHome');
  };
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`http://localhost:9090/library/api/images/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      

      console.log(response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h1 style={{ color: 'red' }}>Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}><button onClick={backHome}>Upload</button></button>
      
      
      
    </div>
  );
};

export default PhotoAdd;
