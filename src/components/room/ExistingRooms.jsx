import React, { useEffect, useMemo, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import RoomFilter from "../common/RoomFilter";
import { Col, Row } from "react-bootstrap";
import RoomPaginator from "../common/RoomPaginator";
import {
  deleteRoom,
  getAllRoomsByPageableAndName,
} from "../utils/ApiFunctions";
import Loader from "../common/Loader";

const ExistingRooms = () => {
  const [filteredRooms, setFilteredRooms] = useState([
    { roomId: "", roomType: "", roomPrice: "" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [total, setTotal] = useState(0);

  const fetchRooms = async () => {
    try {
      const result = await getAllRoomsByPageableAndName(
        currentPage - 1,
        limit,
        ""
      );
      setFilteredRooms(result.rooms);
      setTotal(result.total);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);
      if (result === "") {
        setSuccessMessage(`Room No ${roomId} was delete`);
        fetchRooms();
      } else {
        console.error(`Error deleting room : ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && (
          <p className="alert alert-success mt-5">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="alert alert-danger mt-5">{errorMessage}</p>
        )}
      </div>

      <>
        <section className="mt-5 mb-5 container">
          <div className="mb-3">
            <h2>Existing Rooms</h2>
          </div>
          <Row>
            <Col md={6} className="mb-2 md-mb-0">
              <RoomFilter
                setFilteredData={setFilteredRooms}
                setTotal={setTotal}
                currentPage={currentPage}
                limit={limit}
                setCurrentPage={setCurrentPage}
              />
            </Col>

            <Col md={6} className="d-flex justify-content-end">
              <Link
                to={"/add-room"}
                className="link-offset-2 link-underline link-underline-opacity-0 text-dark"
              >
                <FaPlus /> Add Room
              </Link>
            </Col>
          </Row>
          <table className="table table-bordered table-hover shadow">
            <thead className="table-dark">
              <tr className="text-center">
                <th>#</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.roomId} className="text-center">
                  <th>{room.roomId}</th>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td className="gap-2">
                    <Link to={`/edit-room/${room.roomId}`} className="gap-2">
                      <span className="btn btn-info btn-sm">
                        <FaEye />
                      </span>
                      <span className="btn btn-warning btn-sm ml-5">
                        <FaEdit />
                      </span>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger ml-5"
                      onClick={() => {
                        handleDelete(room.roomId);
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RoomPaginator
            className="pagination-bar justify-content-center"
            currentPage={currentPage}
            total={total}
            limit={limit}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </>
    </>
  );
};

export default ExistingRooms;
