// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarForm from './CarForm';
import Carousel from 'react-bootstrap/Carousel';
import MyNavbar from './MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const App = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  const [recoil, setRecoil] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cars', { withCredentials: true })
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars', error));
  }, [recoil])

  const handleAddCar = (carData) => {
    setCars([...cars, carData]);
    setRecoil(!recoil);
  };

  const handleEditCar = (carData) => {
    setCars(cars.map(car => (car.id === editingCar.id ? carData : car))); // Update the state with the edited car data
    setEditingCar(null);
    setRecoil(!recoil);
  };

  const handleDeleteCar = (carId) => {
    axios.delete(`http://localhost:3000/api/cars/${carId}`)
      .then(() => setCars(cars.filter(car => car.id !== carId)))
      .catch(error => console.error('Error deleting car', error));
  };

  const renderCarouselItems = (imageUrls) => {
    return imageUrls.map((imageUrl, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={`http://localhost:3000${imageUrl}`}
          alt={`Car ${index}`}
          onError={() => console.error(`Error loading image: ${imageUrl}`)}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      </Carousel.Item>
    ));
  };

  return (
    <>
      <MyNavbar />
      <div className="container mt-5">
        <CarForm onSubmit={editingCar ? handleEditCar : handleAddCar} initialData={editingCar} />
        <div className="row">
          {cars.map((car) => (
            <div key={car.id} className="col-md-4 mb-4">
              <div className="car-item">
                {car.image_urls && car.image_urls.length > 0 ? (
                  <Carousel interval={null}>{renderCarouselItems(car.image_urls)}</Carousel>
                ) : (
                  <p>No images available</p>
                )}
                <div className="car-details">
                  <p>
                    <strong>{car.make} {car.model}</strong>
                  </p>
                  <p>Year: {car.year}</p>
                  <p>Price: £{car.price}</p>
                </div>
                <div className="edit-delete-buttons">
                  <button className="btn btn-outline-primary" onClick={() => setEditingCar(car)}>Edit</button>
                  <button className="btn btn-outline-danger" onClick={() => handleDeleteCar(car.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
