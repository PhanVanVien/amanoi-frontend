import React from "react";
import { FaAccusoft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to Admin Panel</h2>
      <hr />
      <Link
        to={"/existing-rooms"}
        className="link-offset-2 hotel-color text-dark link-underline link-underline-opacity-0"
      >
        <FaAngleRight /> Manage Rooms
      </Link>
      <br />
      <Link
        to={"/existing-bookings"}
        className="link-offset-2 text-dark link-underline link-underline-opacity-0"
      >
        <FaAngleRight /> Manage Bookings
      </Link>
    </section>
  );
};

export default Admin;
