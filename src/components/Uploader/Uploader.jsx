import axios from "axios";
import React, { useState } from "react";
import "./Uploader.css";
// import Gallery from "../../components/Gallery/Gallery";

export default function Uploader({ files, setFiles }) {
  const [uploadFile, setUploadFile] = useState();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (uploadFile === undefined) {
        setMessage("You must select a file to upload");
      } else {
        const formData = new FormData();
        formData.append("image", uploadFile);
        const result = await axios.post("/api/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        });
        setMessage("File has been uploaded");
        // setting file array with metadata
        setFiles([...files, result.data]);
        console.log(result);
      }
    } catch (err) {
      console.log(err);
      setMessage("Error while uploading");
    }
  };
  return (
    <div className="Wrapper">
      <div className="Upload">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/png, image/pdf, image/jpeg"
            filename={uploadFile}
            onChange={(e) => setUploadFile(e.target.files[0])}
          ></input>
          <button type="submit">Upload</button>
          <br />
          <br />
          <div>{progress}% Uploaded</div>
        </form>
      </div>
      <div style={{ color: "red" }}>{message}</div>
      {/* <Gallery files={files} setFiles={setFiles} /> */}
    </div>
  );
}
