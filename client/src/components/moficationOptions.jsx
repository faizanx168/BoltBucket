import React from "react";
import "../App.css";

const ModificationOptions = ({
  options,
  selectedOption,
  onSelectOption,
  groupName,
}) => {
  return options.map((option, i) => (
    <div key={option.id}>
      <input
        type="radio"
        id={option.id}
        name={groupName}
        checked={option.id === selectedOption.id}
        onChange={() => onSelectOption(option)}
      />
      <label htmlFor={option.id}>
        <img id="wheelImage" src={option.icon} alt={`Option ${option.id}`} />
      </label>
    </div>
  ));
};

export default ModificationOptions;
