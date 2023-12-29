import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";

const EditRoom = () => {
  // object room, errorMessage, successMessage, imagePreview, id
  const [room, setRoom] = useState({ photo: "", roomType: "", roomPrice: "" });
  const { roomId } = useParams();
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRoom = async () => {
    try {
      const roomData = await getRoomById(roomId);
      setRoom(roomData);
      setImagePreview(roomData.photo);
    } catch (error) {
      throw new Error("Error fetching room");
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        setSuccessMessage("Room updated successfully!");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        setImagePreview(updatedRoomData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mt-5">Edit Room</h3>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">
                Room Type
              </label>
              <input
                name="roomType"
                id="roomType"
                className="form-control"
                type="text"
                value={room.roomType}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label">
                Room Price
              </label>
              <input
                name="roomPrice"
                id="roomPrice"
                className="form-control"
                type="number"
                value={room.roomPrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="roomPhoto" className="form-label">
                Room Photo
              </label>
              <input
                required
                name="roomPhoto"
                id="roomPhoto"
                className="form-control"
                type="file"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={`data:image/jpeg;base64,${imagePreview}`}
                  style={{ maxHeight: "400px", maxWidth: "400px" }}
                  className="mx-auto d-block mt-3 rounded-3"
                  alt="Preview"
                />
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link
                to={"/existing-rooms"}
                className="btn btn-outline-info ml-5"
              >
                Back
              </Link>
              <button type="submit" className="btn btn-outline-warning">
                Edit Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
