import React from "react";
import "./Uploader.css";

export default function Uploader() {
  return (
    <div className="Wrapper">
      <div>
        <form className="Upload">
          <input type="file"></input>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
