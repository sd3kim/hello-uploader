import axios from "axios";
import React, { useState } from "react";
import "./Uploader.css";

export default function Uploader() {
  const [multipleFiles, setMultipleFiles] = useState([]);

  const handleSubmit = async (data) => {
    data.preventDefault();
    try {
      const formData = new FormData();
      for (let i = 0; i < multipleFiles.length; i++) {
        formData.append("files", multipleFiles[i]);
      }
      const result = await axios.post("/api/images/multipleFiles", formData, {
        headers: { "Content-Type": "multipart/form.data" },
      });
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Wrapper">
      <div className="Upload">
        <form>
          <input
            type="file"
            accept="image/png, application/pdf, image/jpeg"
            // filename={multipleFiles}
            multiple
            onChange={(e) => setMultipleFiles(e.target.files)}
          ></input>
          <button onClick={handleSubmit} type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
