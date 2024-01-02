import { parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import DateSlider from "../common/DateSlider";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const BookingsTable = ({ bookingInfo, handleBookingCancelation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);
  const [open, setOpen] = useState(false);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStarDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        return (
          bookingStarDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  const handleCopyToClipboard = (confirmationCode) => {
    const el = document.createElement("textarea");
    el.value = confirmationCode;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className="p-4">
      <DateSlider
        onDateChange={filterBookings}
        onFilterChange={filterBookings}
      />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Guest</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
            <tr key={booking.bookingId}>
              <th>{index + 1}</th>
              <td>{booking.bookingId}</td>
              <td>{booking.room.roomId}</td>
              <td>{booking.room.roomType}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.guestName}</td>
              <td>{booking.guestEmail}</td>
              <td>{booking.numOfAdults}</td>
              <td>{booking.numOfChildren}</td>
              <td>{booking.totalNumOfGuests}</td>
              <td style={{ cursor: "pointer" }}>
                <button
                  className="btn btn-sm btn-hotel"
                  onClick={() =>
                    handleCopyToClipboard(booking.bookingConfirmationCode)
                  }
                  data-tooltip-id="copy-tooltip"
                  data-tooltip-content="Copy to clipboard"
                >
                  {booking.bookingConfirmationCode}
                  <Tooltip id="copy-tooltip" />
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBookingCancelation(booking.bookingId)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filterBookings.length === 0 && (
        <p> No booking found for the selected dates</p>
      )}
    </section>
  );
};

export default BookingsTable;
