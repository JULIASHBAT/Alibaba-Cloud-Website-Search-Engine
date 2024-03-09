// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import ImageThumbnail from './components/ImageThumbnail';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=20');
        const data = await response.json();
        setImages(data);
        setSelectedImage(data[0]); // Select the first image by default
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const prevImage = () => {
    const index = images.indexOf(selectedImage);
    if (index > 0) {
      setSelectedImage(images[index - 1]);
    }
  };

  const nextImage = () => {
    const index = images.indexOf(selectedImage);
    if (index < images.length - 1) {
      setSelectedImage(images[index + 1]);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="navigation-icon" onClick={prevImage}>&lt;</div>
          <div className="thumbnail-container" style={{ display: 'flex' }}>
            {images.map(image => (
              <ImageThumbnail
                key={image.id}
                image={image}
                isSelected={selectedImage && image.id === selectedImage.id}
                handleClick={selectImage}
                style={{ width: '30px', height: '30px', margin: '0 5px' }} // Adjust size and margin
              />
            ))}
          </div>
          <div className="navigation-icon" onClick={nextImage}>&gt;</div>
        </div>
        <div className="text-center">
          {selectedImage && (
            <img
              src={selectedImage.download_url}
              alt="Selected Image"
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                width: 'auto',
                height: 'auto',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0.2)', // Scale down the image by 5x
                zIndex: '999',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
