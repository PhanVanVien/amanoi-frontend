import React, { useState } from "react";

const RoomFilter = ({ data, setFilteredData }) => {
  // state filter represent for selected type
  const [filter, setFilter] = useState("");

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    setFilter(selectedType);

    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };

  const roomTypes = [...new Set(data.map((room) => room.roomType))];

  return (
    <div className="mb-3 input-group">
      <span className="input-group-text">Filter rooms by type</span>
      <select
        className="form-select"
        value={filter}
        onChange={handleSelectChange}
      >
        <option defaultValue value="">
          Select a room type to filter...
        </option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default RoomFilter;
