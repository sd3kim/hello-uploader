import axios from "axios";
import React, { useState } from "react";
import "./Uploader.css";

export default function Uploader() {
  const [file, setFile] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);
      const result = await axios.post("/api/images", formData, {
        headers: { "Content-Type": "multipart/form.data" },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Wrapper">
      <div className="Upload">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/png, image/pdf, image/jpeg"
            filename={file}
            multiple
            onChange={(e) => setFile(e.target.files)}
          ></input>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
