import React from "react";
import { useLocation } from "react-router-dom";
import Parallax from "../common/Parallax";
import MainHeader from "../layout/MainHeader";
import RoomCarousel from "../common/RoomCarousel";
import HotelService from "../common/HotelService";

const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;

  return (
    <section>
      {message && <p className="text-warning px-5">{message}</p>}
      <MainHeader />
      <div className="container">
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
