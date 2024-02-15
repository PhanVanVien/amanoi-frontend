import React, { useEffect, useState } from "react";
import {
  getAllRoomsByPageableAndName,
  getRoomTypes,
} from "../utils/ApiFunctions";

const RoomFilter = ({
  setFilteredData,
  setTotal,
  currentPage,
  limit,
  setCurrentPage,
}) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomType, setRoomType] = useState("");

  const clearFilter = () => {
    setRoomType("");
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchRooms(roomType);
  }, [currentPage, roomType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [roomType]);
  const fetchRooms = async (roomType) => {
    try {
      const result = await getAllRoomsByPageableAndName(
        currentPage - 1,
        limit,
        roomType
      );
      setFilteredData(result.rooms);
      setTotal(result.total);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = () => {
    getRoomTypes().then(setRoomTypes);
  };

  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    setRoomType(selectedType);
  };

  return (
    <div className="mb-3 input-group">
      <span className="input-group-text">Filter rooms by type</span>
      <select
        className="form-select"
        value={roomType}
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
