import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../header/index';

const Home = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleIdentifyClick = async () => {
    if (!selectedFile) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/api/predict/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      data.uploaded_image_url = imagePreview;
      if (response.ok) {
        console.log('Prediction:', data);
        navigate('/apple-detail', {
          state: {
            data
          }
        });
      } else {
        console.error('Error predicting apple variety:', data);
        alert('Error predicting apple variety: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for image preview
      console.log('File selected:', file.name);
    }
  };

  return (
    <div className='home-container'>
      <Header />
      <div className='content'>
        <h1 className='title'>Apple Variety Identification Application</h1>
        <h5 className='subtitle'>Apples Unveiled: Identify with Ease</h5>
        <div className='buttons'>
          <button className='button' onClick={handleUploadClick}>
            Upload Image
          </button>
          <button className='button primary' onClick={handleIdentifyClick}>
            Identify
          </button>
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        {imagePreview && (
          <div className='image-preview'>
            <h4>Uploaded Image:</h4>
            <img src={imagePreview} alt='Uploaded preview' className='uploaded-image-preview' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;