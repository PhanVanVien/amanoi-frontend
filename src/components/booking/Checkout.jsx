import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import RoomCarousel from "./../common/RoomCarousel";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import {
  RingLoader,
  BeatLoader,
  SyncLoader,
  PulseLoader,
} from "react-spinners";
import {
  FaConciergeBell,
  FaCouch,
  FaHandHoldingHeart,
  FaHiking,
  FaImages,
} from "react-icons/fa";
import Loader from "../common/Loader";

const Checkout = () => {
  // errorMessage, isLoading, objectRoomInfo {photo, type, price}, roomId
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((data) => {
          setRoomInfo(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setIsLoading(false);
        });
    }, 1000);
  }, [roomId]);

  return (
    <div>
      <section className="container">
        <div className="row">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <>
                <Loader />
              </>
            ) : errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <div className="room-info">
                <img
                  src={`data:image/png;base64, ${roomInfo.photo}`}
                  alt="Room Photo"
                  style={{ width: "100%", height: "200px" }}
                />
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Room Type:</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th>Price per night:</th>
                      <td>${roomInfo.roomPrice}</td>
                    </tr>
                    <tr>
                      <th>Room Service:</th>
                      <td>
                        <ul className="list-unstyled">
                          <li>
                            <FaHiking /> Experience
                          </li>
                          <li>
                            <FaConciergeBell /> Dining
                          </li>
                          <li>
                            <FaImages /> Gallery
                          </li>
                          <li>
                            <FaCouch /> Accommodation
                          </li>
                          <li>
                            <FaHandHoldingHeart /> Wellness
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="container">
        <RoomCarousel />
      </div>
    </div>
  );
};

export default Checkout;
