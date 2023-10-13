import React, { useEffect, useState } from "react";
import CarCard from "../components/Car.jsx";
import "../App.css";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/mycars"); // Update the URL based on your API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch car data");
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="view-cars">
      <h1>View Cars</h1>
      <div className="car-list">
        {cars && cars.length > 0 ? (
          cars.map((car) => (
            <CarCard
              id={car.id}
              name={car.name}
              interior={car.interior}
              exterior={car.exterior}
              roof={car.roof}
              wheels={car.wheels}
              price={car.price}
              convertible={car.convertible}
            />
          ))
        ) : (
          <h3 className="noResults">{"No Cars Yet 😞"}</h3>
        )}
      </div>
    </div>
  );
};

export default ViewCars;
