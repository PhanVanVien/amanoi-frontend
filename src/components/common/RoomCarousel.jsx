import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import Loader from "./Loader";

const RoomCarousel = () => {
  // object rooms, errorMessage, isLoading
  const [rooms, setRooms] = useState([
    { roomId: "", roomType: "", roomPrice: "", photo: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="mt-5">
        <Loader />
      </div>
    );
  }
  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>;
  }

  return (
    <section className="container mb-5 mt-5 p-3">
      <Link
        to={"/browse-all-rooms"}
        className="link-offset-2 link-underline hotel-color link-underline-opacity-0 text-center"
      >
        Browse all rooms
      </Link>
      <Carousel indicators={false}>
        {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
          <Carousel.Item key={index}>
            <Row>
              {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                <Col key={room.roomId} className="mb-4">
                  <Card>
                    <Link to={`/book-room/${room.roomId}`}>
                      <Card.Img
                        variant="top"
                        src={`data:image/png;base64,${room.photo}`}
                        alt="Room Photo"
                        className="w-100 "
                        style={{ height: "200px" }}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title className="hotel-color">
                        {room.roomType}
                      </Card.Title>
                      <Card.Title className="room-price">
                        ${room.roomPrice}/night
                      </Card.Title>
                      <div className="flex-shrink-0">
                        <Link
                          to={`/book-room/${room.roomId}`}
                          className="btn btn-hotel btn-sm"
                        >
                          Book Now
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default RoomCarousel;
