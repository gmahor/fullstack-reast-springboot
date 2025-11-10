import React from "react";

export const Dropdown = ({ label, options, value, handleSort }) => {
  const handleChange = (sortValue) => {
    if (handleSort) {
      handleSort(sortValue);
    }
    console.log("sortValue : ", sortValue);
  };

  return (
    <div className="flex items-center gap-2 justify-end pr-12 flex-1 font-primary">
      <label className="text-lg font-semibold text-primary">{label}</label>
      <select
        className="px-3 py-2 text-base border rounded-md transition border-primary focus:ring focus:ring-dark focus:outline-none text-gray-900"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
      >
        {options?.map((optionVal, index) => (
          <option key={index} value={optionVal}>
            {optionVal}
          </option>
        ))}
      </select>
    </div>
  );
};
