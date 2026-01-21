import React, { useRef } from 'react';

const DestinationImageUpload = ({ onImageChange }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onImageChange(ev.target.result, file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="destination-image-upload">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button type="button" onClick={() => fileInputRef.current.click()}>
        Chọn ảnh mới
      </button>
    </div>
  );
};

export default DestinationImageUpload;
