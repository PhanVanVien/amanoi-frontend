import React, { useEffect, useState } from "react";
import {
  deleteUser,
  getBookingsByUserId,
  getUser,
} from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Loader from "../common/Loader";

const Profile = () => {
  const [user, setUser] = useState({
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [{ roleId: "", name: "" }],
  });

  const [bookings, setBookings] = useState({
    bookingId: "",
    room: { roomId: "", roomType: "" },
    checkInDate: "",
    checkOutDate: "",
    bookingConfirmationCode: "",
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserId(userId);
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <section className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-danger">{message}</p>}
      {user ? (
        <div
          className="card p-5 mt-5"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <h4 className="card-title text-center">User Information</h4>
          <div className="card-body">
            <div className="col-md-10 mx-auto">
              <div className="card mb-3 shadow">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <img
                        src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611731.jpg"
                        alt="Profile avatar"
                        className="rounded-circle"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          ID:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.userId}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          First Name:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.firstName}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Last Name:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.lastName}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Email:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.email}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Roles:
                        </label>
                        <div className="col-md-10">
                          <ul className="list-unstyled">
                            {user.roles.map((role) => (
                              <li key={role.roleId} className="card-text">
                                {role.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="card-title text-center">Booking history</h4>
              {bookings.length > 0 ? (
                <table className="table table-bordered table-hover shadow">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Booking ID</th>
                      <th scope="col">Room ID</th>
                      <th scope="col">Room Type</th>
                      <th scope="col">Check In Date</th>
                      <th scope="col">Check Out Date</th>
                      <th scope="col">Confirmation Code</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <th>{booking.bookingId}</th>
                        <td>{booking.room.roomId}</td>
                        <td>{booking.room.roomType}</td>
                        <td>
                          {moment(booking.checkInDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>
                        <td>
                          {moment(booking.checkOutDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td className="text-success">On-going</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>You have not made any bookings yet.</p>
              )}

              <div className="d-flex justify-content-center">
                <div className="mx-2">
                  <button className="btn btn-danger btn-sm">
                    Close Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Profile;
