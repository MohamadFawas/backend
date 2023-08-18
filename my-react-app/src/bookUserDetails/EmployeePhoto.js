import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeePhoto = () => {
   
        const { id } = useParams();
        const [photoUrl, setPhotoUrl] = useState('');
      
        useEffect(() => {
          loadPhoto();
        }, []);
      
        const loadPhoto = async () => {
          try {
            const response = await axios.get(`http://localhost:9090/library/api/images/${id}`, {
              responseType: 'arraybuffer',
            });
      
            const imageBuffer = Buffer.from(response.data, 'binary').toString('base64');
            const imageUrl = `data:image/jpeg;base64,${imageBuffer}`;
            setPhotoUrl(imageUrl);
          } catch (error) {
            console.error('Error loading photo:', error);
          }
        };
      
        return (
          <div className="container">
            <h1>Employee Photo</h1>
            {photoUrl ? (
              <img src={photoUrl} alt="Employee" style={{ maxWidth: '100%' }} />
            ) : (
              <p>No photo available</p>
            )}
          </div>
        );}

export default EmployeePhoto;
