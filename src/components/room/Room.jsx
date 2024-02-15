import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import Loader from "../common/Loader";

const Room = () => {
  // data, error, isLoading, currentPage, roomsPerPage, filteredData
  // const [data, setData] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [roomsPerPage, setRoomsPerPage] = useState(6);
  // const [filteredData, setFilteredData] = useState([{ roomId: "" }]);
  const [filteredRooms, setFilteredRooms] = useState([
    { roomId: "", roomType: "", roomPrice: "" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [total, setTotal] = useState(0);

  if (errorMessage) {
    return <div className="text-danger">Error: {errorMessage}</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mt-5 mb-md-0">
          <RoomFilter
            setFilteredData={setFilteredRooms}
            setTotal={setTotal}
            currentPage={currentPage}
            limit={limit}
            setCurrentPage={setCurrentPage}
          />
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            className="pagination-bar"
            currentPage={currentPage}
            total={total}
            limit={limit}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Col>
      </Row>

      <Row>
        {filteredRooms.map((room) => (
          <RoomCard key={room.roomId} room={room} />
        ))}
      </Row>

      <Row>
        <Col>
          <RoomPaginator
            className="pagination-bar justify-content-center"
            currentPage={currentPage}
            total={total}
            limit={limit}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
