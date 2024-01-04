import React, { useState } from "react";
import RoomCard from "../room/RoomCard";
import { Button, Row } from "react-bootstrap";
import RoomPaginator from "./RoomPaginator";

const RoomSearchResults = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;
  const totalResults = results.length;

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  return (
    <>
      {results.length > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Results</h5>
          <Row>
            {paginatedResults.map((room) => (
              <RoomCard key={room.roomId} room={room} />
            ))}
          </Row>
          <Row>
            {totalResults > resultsPerPage && (
              <RoomPaginator
                className="pagination-bar justify-content-center"
                currentPage={currentPage}
                totalCount={totalResults}
                pageSize={resultsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
            <Button variant="secondary" onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default RoomSearchResults;
