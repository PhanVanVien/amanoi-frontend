import React from "react";
import { useLocation } from "react-router-dom";
import Parallax from "../common/Parallax";
import MainHeader from "../layout/MainHeader";
import RoomCarousel from "../common/RoomCarousel";
import HotelService from "../common/HotelService";
import RoomSearch from "../common/RoomSearch";

const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem("userId");

  return (
    <section>
      {message && <p className="text-warning px-5">{message}</p>}
      {currentUser && (
        <h6 className="text-success text-center">
          {" "}
          You are logged-In as {currentUser}
        </h6>
      )}
      <MainHeader />
      <div className="container">
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <Parallax />
        <RoomCarousel />
      </div>
    </section>
  );
};

export default Home;
