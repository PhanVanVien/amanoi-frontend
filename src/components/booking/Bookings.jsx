import React, { useState, useEffect } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions";
import Header from "../common/Header";
import BookingsTable from "./BookingsTable";
import Loader from "../common/Loader";

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingInfo(data);
          console.log(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  const handleBookingCancelation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="container">
      <Header title={"Existing Bookings"} />
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      {isLoading ? (
        <Loader />
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleBookingCancelation={handleBookingCancelation}
        />
      )}
    </section>
  );
};

export default Bookings;
