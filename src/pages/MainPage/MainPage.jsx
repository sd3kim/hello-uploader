import React, { useState } from "react";
import "../../css/styles.css";
import Uploader from "../../components/Uploader/Uploader";

export default function MainPage() {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <header className="masthead bg-info text-white text-center">
        <h1
          className="masthead-heading text-uppercase mb-0"
          style={{ color: "yellow", marginTop: "15px" }}
        >
          Hello, Uploader!
        </h1>
        <div className="divider-custom divider-light">
          <div className="divider-custom-line"></div>
        </div>
        <p
          className="masthead-subheading font-weight-light mb-0"
          style={{ color: "yellow" }}
        >
          PDF - PNG - JPEG
        </p>
      </header>

      <Uploader />

    </div>
  );
}
