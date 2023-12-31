import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import ExistingRooms from "./components/room/ExistingRooms";
import { Routes, Route } from "react-router-dom";
import EditRoom from "./components/room/EditRoom";
import AddRoom from "./components/room/AddRoom";
import { useEffect } from "react";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import NavBar from "./components/layout/NavBar";
import "./assets/images/logo.png";
import Admin from "./components/admin/Admin";
import Checkout from "./components/booking/CheckOut";
import RoomListing from "./components/room/RoomListing";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#F3EEE7";
  }, []);

  return (
    <>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/book-room/:roomId" element={<Checkout />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/existing-bookings" element={<Bookings />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
