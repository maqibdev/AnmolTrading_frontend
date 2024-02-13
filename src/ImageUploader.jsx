// src/ImageUploader.js
import React, { useCallback } from 'react';

const ImageUploader = ({ onUpload }) => {

  const onFileChange = useCallback((event) => {
    const files = Array.from(event.target.files);

    const validImageTypes = ['image/jpeg', 'image/png'];
    const filteredImages = files.filter(file =>
      validImageTypes.includes(file.type) || /\.(jpg|jpeg|png)$/i.test(file.name)
    );

    onUpload(filteredImages);
  }, [onUpload]);

  return (
    <div className="row">
      <div className="col-md-6">
        <label>Images:</label>
        <input type="file" accept="image/*" onChange={onFileChange} multiple />
      </div>
    </div>
  );
};

export default ImageUploader;
