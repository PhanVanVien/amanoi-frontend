import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
import { useNavigate, useParams } from "react-router-dom";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";

const BookingForm = () => {
  // validated, isSubmitted, errorMessage, roomPrice
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [roomPrice, setRoomPrice] = useState(0);

  // currentUser

  // object booking: guestFullName, guestEmail, checkInDate, checkOutDate, numOfAdults, numOfChildren
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setBooking({ ...booking, userId: userId });
  }, []);
  
  // roomId, navigate
  const { roomId } = useParams();
  const navigate = useNavigate();

  // handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  // getRoomPriceById
  const getRoomPriceById = async () => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // useEffectgetRoomPriceById
  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  // calculatePayment
  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return paymentPerDay * diffInDays;
  };

  // isGuestCountValid
  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  // isCheckOutDateValid
  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check-out date must be after check-in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  // handle Form Submit
  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, userId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      const errorMessage = error.message;
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body mt-5">
            <h4 className="card-title hotel-color">Reserve Room</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestFullName">Full name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="guestFullName"
                  name="guestFullName"
                  placeholder="Enter your full name"
                  value={booking.guestFullName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your full name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="guestEmail">Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  placeholder="Enter your email"
                  value={booking.guestEmail}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address
                </Form.Control.Feedback>
              </Form.Group>
              <p />

              <fieldset style={{ border: "2px" }}>
                <h5 className="hotel-color">Lodging Period</h5>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="checkInDate">Check-in date</Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      min={moment().format("MMM Do, YYYY")}
                      value={booking.checkInDate}
                      onChange={handleInputChange}
                    />
                    <FormControl.Feedback type="invalid">
                      Please select check in date
                    </FormControl.Feedback>
                  </div>
                  <div className="col-6">
                    <FormLabel htmlFor="checkOutDate">Check-out date</FormLabel>
                    <FormControl
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      min={moment().format("MMM Do, YYYY")}
                      value={booking.checkOutDate}
                      onChange={handleInputChange}
                    />
                    <FormControl.Feedback type="invalid">
                      Please select a check out date
                    </FormControl.Feedback>
                  </div>
                  {errorMessage && (
                    <p className="error-message text-danger">{errorMessage}</p>
                  )}
                </div>
              </fieldset>

              <p />
              <fieldset style={{ border: "2px" }}>
                <h5 className="hotel-color">Number of Guest</h5>
                <div className="row">
                  <div className="col-6">
                    <FormLabel htmlFor="numOfAdults">Adults</FormLabel>
                    <FormControl
                      required
                      type="number"
                      name="numOfAdults"
                      id="numOfAdults"
                      min={1}
                      placeholder="0"
                      value={booking.numOfAdults}
                      onChange={handleInputChange}
                    />
                    <FormControl.Feedback type="invalid">
                      Please enter at least 1 adult
                    </FormControl.Feedback>
                  </div>
                  <div className="col-6">
                    <FormLabel htmlFor="numOfChildren">Children</FormLabel>
                    <FormControl
                      required
                      type="number"
                      name="numOfChildren"
                      id="numOfChildren"
                      min={0}
                      placeholder="0"
                      value={booking.numOfChildren}
                      onChange={handleInputChange}
                    />
                    <FormControl.Feedback type="invalid">
                      Please select 0 if no children
                    </FormControl.Feedback>
                  </div>
                </div>
              </fieldset>

              <div className="mt-2 form-group">
                <button type="submit" className="btn btn-hotel">
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </div>

        <div className="col-md-5">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              onConfirm={handleFormSubmit}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
