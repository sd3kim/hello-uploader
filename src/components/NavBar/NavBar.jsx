import React from "react";
import "../../css/styles.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg text-uppercase fixed-top"
        id="mainNav"
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  to="/profile"
                  className="nav-link py-3 px-0 px-lg-3 rounded"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  to="/files"
                  className="nav-link py-3 px-0 px-lg-3 rounded"
                >
                  Files
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
