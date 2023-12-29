import React from "react";
import { Container } from "react-bootstrap";

const Parallax = () => {
  return (
    <div className="parallax mb-5">
      <Container className="text-center px-5 py-5 justify-content-center">
        <div className="animated-texts bounceIn">
          <h1>
            Experience Wellness & Fitness at {" "}
            <span className="hotel-color">Amanoi</span>
          </h1>
        </div>
      </Container>
    </div>
  );
};

export default Parallax;
