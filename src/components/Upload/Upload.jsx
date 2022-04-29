import React from "react";
import "./Upload.css";

export default function Uploader() {
  return (
    <div className="Wrapper">
      <div className="Upload">
        <form>
          <input type="file"></input>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
