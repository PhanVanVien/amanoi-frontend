import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-header px-5 mt-5 sticky-top nav-shadow">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <img src={logo} alt="Amanoi" className="hotel-logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/browse-all-rooms"}
              >
                Browse all rooms
              </NavLink>
            </li>

            {/* {isLoggedIn && userRole === "ROLE_ADMIN" && ( */}
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                Admin
              </NavLink>
            </li>
          </ul>

          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/find-booking"}>
                Find my booking
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown" // Add this line
                data-bs-target="#accountDropdown" // Add this line
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                Account
              </a>

              <ul
                id="accountDropdown" // Add this line
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {isLoggedIn ? (
                  <Logout />
                ) : (
                  <li>
                    <Link className="dropdown-item" to={"/login"}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
