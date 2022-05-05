import React from "react";
import "../../css/styles.css";
import "./MainPage.css";
import Uploader from "../../components/Uploader/Uploader";

export default function MainPage() {
  return (
    <div>
      <div className="Banner">
        <header className="masthead text-white text-center">
          <h1
            className="masthead-heading text-uppercase"
            style={{ color: "#242F40" }}
          >
            Hello, Uploader!
          </h1>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
          </div>
          <p
            className="masthead-subheading font-weight-light mb-0"
            style={{ color: "#242F40" }}
          >
            PDF - PNG - JPEG
          </p>
        </header>
      </div>
      <Uploader />
    </div>
  );
}
