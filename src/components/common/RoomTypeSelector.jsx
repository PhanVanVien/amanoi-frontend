import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  // state roomTypes, newRoomType, showNewRoomTypeInput
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = () => {
    getRoomTypes().then(setRoomTypes);
  };

  const addNewRoomType = (e) => {
    const value = e.target.value;
    setShowNewRoomTypeInput(value === "Add New");
    handleRoomInputChange(e);
  };

  const handleNewRoomType = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            required
            className="form-select"
            id="roomType"
            name="roomType"
            onChange={addNewRoomType}
            value={newRoom.roomType}
          >
            <option value="">Select a room type</option>
            <option value="Add New">Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type} name={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="mt-2 input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter New Room Type"
                value={newRoomType}
                onChange={handleNewRoomType}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
