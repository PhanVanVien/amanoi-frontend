import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import Loader from "../common/Loader";

const Room = () => {
  // data, error, isLoading, currentPage, roomsPerPage, filteredData
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([{ roomId: "" }]);

  // get rooms from database, is loading, show error, handle page click
  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <div className="text-danger">Error: {errorMessage}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / roomsPerPage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;

    return filteredData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room.roomId} room={room} />);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mt-5 mb-md-0">
          <RoomFilter data={data} setFilteredData={setFilteredData} />
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={filteredData.length}
            pageSize={roomsPerPage}
            onPageChange={(page) => handlePageChange(page)}
          />
        </Col>
      </Row>

      <Row>{renderRooms()}</Row>

      <Row>
        <Col>
          <RoomPaginator
            className="pagination-bar justify-content-center"
            currentPage={currentPage}
            totalCount={filteredData.length}
            pageSize={roomsPerPage}
            onPageChange={(page) => handlePageChange(page)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
