// src/components/ImageThumbnail.js
import React from 'react';

const ImageThumbnail = ({ image, isSelected, handleClick }) => {
  return (
    <div className={`thumbnail ${isSelected ? 'active' : ''}`} onClick={() => handleClick(image)}>
      <img src={image.download_url} alt="Thumbnail" />
    </div>
  );
};

export default ImageThumbnail;
