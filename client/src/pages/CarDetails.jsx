import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";

const CarDetails = () => {
  const [car, setCar] = useState({
    name: "",
    convertible: "",
    price: 0,
    exterior: "",
    interior: "",
    roof: "",
    wheels: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchCarById = async () => {
      const response = await fetch(`/mycars/${id}`);
      const data = await response.json();
      // console.log(data);
      const newdata = {
        name: data.name,
        convertible: data.convertible,
        price: data.price,
        exterior: JSON.parse(data.exterior),
        interior: JSON.parse(data.interior),
        roof: JSON.parse(data.roof),
        wheels: JSON.parse(data.wheels),
      };
      // console.log(newdata.wheels);
      setCar(newdata);
    };
    fetchCarById();
  }, [car, id]);

  return (
    <div className="car-details">
      <h2>{car.name}</h2>
      <div className="image-container">
        <div>
          <h2>Wheels</h2>
          <img src={car.wheels.icon} alt="Wheels" />
        </div>
        <div>
          <h2>Interior</h2>
          <img src={car.interior.icon} alt="Interior" />
        </div>
        <div>
          <h2>Exterior</h2>
          <img src={car.exterior.icon} alt="Exterior" />
        </div>
        <div>
          <h2>Roof</h2>
          <img src={car.roof.icon} alt="Roof" />
        </div>
      </div>

      <p>Convertible: {car.convertible ? "Yes" : "No"}</p>
      <p>Price: ${car.price}</p>
      <Link to={"/edit/" + id}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default CarDetails;
