// EditCar.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  wheelOptions,
  interiorOptions,
  exteriorOptions,
  roofOptions,
} from "../assets/options.js";
import ModificationOptions from "../components/moficationOptions";

const EditCar = () => {
  const [showWheels, setShowWheels] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [showExterior, setShowExterior] = useState(false);
  const [showRoof, setShowRoof] = useState(false);
  const [car, setCar] = useState({
    name: "",
    interior: interiorOptions[0],
    exterior: exteriorOptions[0],
    roof: roofOptions[0],
    wheels: wheelOptions[0],
    price: 0,
    convertible: "",
  });
  const { id } = useParams();
  useEffect(() => {
    const fetchCarById = async () => {
      const response = await fetch(`/mycars/${id}`);
      const data = await response.json();
      setCar(data);
    };
    fetchCarById();
  }, []);
  const calculatePrice = () => {
    let price = 0;
    price += parseInt(car.wheels.price) || 0;
    price += parseInt(car.interior.price) || 0;
    price += parseInt(car.exterior.price) || 0;
    price += parseInt(car.roof.price) || 0;
    price += car.convertible ? 1000 : 0;
    price = parseInt(price);
    setCar({ ...car, price });
  };

  useEffect(() => {
    calculatePrice();
  }, [car.wheels, car.interior, car.exterior, car.roof]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCar({
      ...car,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      };
      const response = await fetch(`/mycars/${id}`, options);
      if (!response.ok) throw new Error(response.statusText);
      window.location = "/";
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteCar = async (event) => {
    event.preventDefault();
    const options = {
      method: "DELETE",
    };
    await fetch(`/mycars/${id}`, options);
    window.location = "/";
  };

  return (
    <div className="create-car">
      <center>
        <h2>Edit Car</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={car.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowWheels(!showWheels);
            }}
          >
            Select Wheels
          </button>
          {showWheels && (
            <ModificationOptions
              options={wheelOptions}
              selectedOption={car.wheels}
              onSelectOption={(selectedOption) =>
                handleChange({
                  target: { name: "wheels", value: selectedOption },
                })
              }
              groupName="wheels"
            />
          )}
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowInterior(!showInterior);
            }}
          >
            Select Interior
          </button>
          {showInterior && (
            <ModificationOptions
              options={interiorOptions}
              selectedOption={car.interior}
              onSelectOption={(selectedOption) =>
                handleChange({
                  target: { name: "interior", value: selectedOption },
                })
              }
              groupName="Interior"
            />
          )}
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowExterior(!showExterior);
            }}
          >
            Select Exterior
          </button>
          {showExterior && (
            <ModificationOptions
              options={exteriorOptions}
              selectedOption={car.exterior}
              onSelectOption={(selectedOption) =>
                handleChange({
                  target: { name: "exterior", value: selectedOption },
                })
              }
              groupName="exterior"
            />
          )}
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowRoof(!showRoof);
            }}
          >
            Select Roof
          </button>
          {showRoof && (
            <ModificationOptions
              options={roofOptions}
              selectedOption={car.roof}
              onSelectOption={(selectedOption) =>
                handleChange({
                  target: { name: "roof", value: selectedOption },
                })
              }
              groupName="roof"
            />
          )}
        </div>
        <div>
          <input
            type="checkbox"
            id="convertible"
            name="convertible"
            checked={car.convertible}
            onChange={handleChange}
          />
          <label htmlFor="convertible">Convertible</label>
        </div>
        <div>
          <button type="submit">Edit Car</button>
        </div>
        <div>
          <button onClick={handleDeleteCar}>Delete Car</button>
        </div>
      </form>
      <div>
        <p>Price: {car.price}</p>
      </div>
    </div>
  );
};

export default EditCar;
