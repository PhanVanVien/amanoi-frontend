import React, { useState } from "react";
import { Form, Button, Row, Col, Container, FormLabel } from "react-bootstrap";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomSearchResults from "./RoomSearchResult";
import RoomTypeSelector from "./RoomTypeSelector";
import Loader from "./Loader";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const checkInMoment = moment(searchQuery.checkInDate);
    const checkOutMoment = moment(searchQuery.checkOutDate);
    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
      setAvailableRooms([]);
      setErrorMessage("Please enter valid dates");
      return;
    }
    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      setAvailableRooms([]);
      setErrorMessage("Check-out date must be after check-in date");
      return;
    }
    setIsLoading(true);
    getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        setAvailableRooms(response.data);
        setTimeout(() => setIsLoading(false), 2000);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    // setSearchQuery({ ...searchQuery, [name]: value });
    // console.log(searchQuery);
    // const checkInDate = moment(searchQuery.checkInDate);
    // const checkOutDate = moment(searchQuery.checkOutDate);
    // if (checkInDate.isValid() && checkOutDate.isValid()) {
    //   setErrorMessage("");
    // }
    setSearchQuery((prevSearchQuery) => {
      const newSearchQuery = { ...prevSearchQuery, [name]: value };
      console.log(newSearchQuery); // Log the updated searchQuery

      const checkInDate = moment(newSearchQuery.checkInDate);
      const checkOutDate = moment(newSearchQuery.checkOutDate);

      if (checkInDate.isValid() && checkOutDate.isValid()) {
        setErrorMessage("");
      }

      return newSearchQuery; // Return the updated state
    });
  };

  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRooms([]);
  };

  return (
    <>
      <Container className="shadow mt-5 mb-5 py-5 bg-light">
        <Form onSubmit={handleSearch}>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <Form.Group controlId="checkInDate">
                <Form.Label>Check-in Date</Form.Label>
                <Form.Control
                  //   required
                  type="date"
                  name="checkInDate"
                  value={searchQuery.checkInDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="checkOutDate">
                <Form.Label>Check-out Date</Form.Label>
                <Form.Control
                  //   required
                  type="date"
                  name="checkOutDate"
                  value={searchQuery.checkOutDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="roomType">
                <FormLabel>Room Type</FormLabel>
                <div className="d-flex">
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={searchQuery}
                  />
                  <Button variant="secondary" type="submit">
                    Search
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {isLoading ? (
          <Loader />
        ) : availableRooms ? (
          <RoomSearchResults
            results={availableRooms}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <p className="mt-4">
            No rooms available for the selected dates and room type.
          </p>
        )}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </Container>
    </>
  );
};

export default RoomSearch;
