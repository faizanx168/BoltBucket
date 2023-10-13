import React, { useState } from "react";

const WheelSelection = () => {
  const [selectedWheel, setSelectedWheel] = useState("default"); // Default wheel icon

  const handleWheelChange = (event) => {
    setSelectedWheel(event.target.value);
  };

  const wheelOptions = [
    {
      id: "default",
      label: "Default Wheel",
      icon: "https://autorimshop.com/cdn/shop/files/w65524s_15_198b10a3-5b29-4bb3-bf25-798090710ea2.jpg?v=1693130133&width=600",
    },
    {
      id: "wheel1",
      label: "Wheel Option 1",
      icon: "https://autorimshop.com/cdn/shop/files/ALY75208U45N_e9047698-3a57-4c54-86aa-96c5687e41b4.jpg?v=1693130759&width=600",
    },
    {
      id: "wheel2",
      label: "Wheel Option 2",
      icon: "https://autorimshop.com/cdn/shop/files/ALY69980U45N_9ebbb5fb-259e-4abb-a091-343868ed75db.jpg?v=1693130467&width=600",
    },
    // Add more wheel options with their respective icons
  ];

  return (
    <div>
      <h3>Wheels:</h3>
      {wheelOptions.map((wheel) => (
        <label key={wheel.id}>
          <input
            type="radio"
            name="wheels"
            value={wheel.id}
            checked={selectedWheel === wheel.id}
            onChange={handleWheelChange}
          />
          {wheel.label}
          <img src={wheel.icon} alt={wheel.label} />
        </label>
      ))}
    </div>
  );
};

export default WheelSelection;
