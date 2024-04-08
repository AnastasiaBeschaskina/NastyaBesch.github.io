import React, { useState } from "react";
import CustomInput from "./Input";

const FilterComponent = ({ onFilter }) => {
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
    if (onFilter) {
      onFilter(e.target.value);
    }
  };

  return (
    <div>
      <CustomInput
        type="text"
        placeholder="Find Your Tale"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};


export default FilterComponent;
