// src/CarForm.js
import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import axios from 'axios';

const CarForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [images, setImages] = useState([]);
  const [formAndImageComplete, setFormAndImageComplete] = useState(false);
  const [imageUploaderKey, setImageUploaderKey] = useState(0);

  useEffect(() => {
    // Check if initialData is provided
    if (initialData) {
      // Set initial form data
      setFormData(prevData => ({ ...prevData, ...initialData }));
    }
  }, [initialData]);

  useEffect(() => {
    // Check if all fields in formData are filled
    const isFormComplete = Object.values(formData).every(value => value !== '');
    // Check if there are selected images
    const areImagesSelected = images.length > 0;
  
    setFormAndImageComplete(isFormComplete && areImagesSelected);
  }, [formData, images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleImageUpload = (uploadedImages) => {
    console.log(uploadedImages, 'images');
    setImages(uploadedImages);
  };

  const resetForm = () => {
    setFormData({});
    setImages([]);
    setFormAndImageComplete(false);
    // Incrementing the key will force re-rendering the ImageUploader component
    setImageUploaderKey(prevKey => prevKey + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form...');

    if (formAndImageComplete) {
      const formDataWithImages = new FormData();

      for (const key in formData) {
        formDataWithImages.append(`car[${key}]`, formData[key]);
      }

      images.forEach((image, index) => {
        formDataWithImages.append(`car[images][]`, image);
      });

      axios
        .post('http://localhost:3000/api/cars', formDataWithImages)
        .then((response) => {
          console.log('Form submitted successfully:', response.data);
          onSubmit(response.data);
          resetForm(); // Reset the form after successful submission
        })
        .catch((error) => console.error('Error adding car', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-3">
          <label>Make:</label>
          <input type="text" name="make" value={formData.make || ''} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-3">
          <label>Model:</label>
          <input type="text" name="model" value={formData.model || ''} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-3">
          <label>Year:</label>
          <input type="number" name="year" value={formData.year || ''} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-3">
          <label>Price: £</label>
          <input type="number" name="price" value={formData.price || ''} onChange={handleChange} className="form-control" required />
        </div>
      </div>
      <ImageUploader key={imageUploaderKey} onUpload={handleImageUpload} />
      <button type="submit" className="btn btn-success mt-2" disabled={!formAndImageComplete}>
        {initialData ? 'Update Car' : 'Add Car'}
      </button>
    </form>
  );
};

export default CarForm;
