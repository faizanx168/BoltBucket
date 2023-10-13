import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CarCard = (props) => {
  const [car, setCar] = useState({
    name: "",
    interior: "",
    exterior: "",
    roof: "",
    wheels: "",
    price: "",
    convertible: "",
  });

  useEffect(() => {
    var interior = JSON.parse(props.interior);
    var exterior = JSON.parse(props.exterior);
    var roof = JSON.parse(props.interior);
    var wheels = JSON.parse(props.wheels);
    setCar({
      id: props.id,
      name: props.name,
      interior: interior.name,
      exterior: exterior.name,
      roof: roof.name,
      wheels: wheels.name,
      price: props.price,
      convertible: props.convertible,
    });
  }, [props]);

  return (
    <div className="car-card">
      <div className="title-row">
        <h2>{car.name}</h2>
      </div>
      <div className="information-row">
        <div className="information-columns">
          <p>Exterior: {car.exterior}</p>
          <p>Interior: {car.interior}</p>
        </div>
        <div className="information-columns">
          <p>Wheels: {car.wheels}</p>
          <p>Roof: {car.roof}</p>
          <p>Price: {car.price}</p>
          <p>Convertible: {car.convertible ? "Yes" : "No"}</p>
        </div>
      </div>
      <div>
        <Link to={"/customcars/" + car.id}>
          <button>View</button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
