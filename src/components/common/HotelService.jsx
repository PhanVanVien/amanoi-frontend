import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "./Header";
import {
  FaCouch,
  FaHandHoldingHeart,
  FaImages,
  FaConciergeBell,
  FaHiking,
} from "react-icons/fa";

const HotelService = () => {
  return (
    <>
      <div className="mb-2">
        <Header title={"Our Services"} />

        <Row className="mt-4">
          <h5 className="text-center">
            <span className="gap-2">
              No request is too great and no detail too small. We are also here
              to assist you before your trip at <span className="hotel-color">Amanoi</span> begins.
            </span>
          </h5>
        </Row>
        <hr />

        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaHiking /> Experience
                </Card.Title>
                {/* <Card.Text>
                  Stay connected with high-speed internet access.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaConciergeBell /> Dining
                </Card.Title>
                {/* <Card.Text>
                  Start your day with a delicious breakfast buffet.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaImages /> Gallery
                </Card.Title>
                {/* <Card.Text>
                  Keep your clothes clean and fresh with our laundry service.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaCouch /> Accommodation
                </Card.Title>
                {/* <Card.Text>
                  Enjoy a refreshing drink or snack from our in-room mini-bar.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaHandHoldingHeart /> Wellness
                </Card.Title>
                {/* <Card.Text>
                  Park your car conveniently in our on-site parking lot.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          {/* <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSnowflake /> Air conditioning
                </Card.Title>
                <Card.Text>
                  Stay cool and comfortable with our air conditioning system.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      </div>
      <hr />
    </>
  );
};

export default HotelService;
