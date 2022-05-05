import axios from "axios";
import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import UploaderMessage from "../UploaderMessage/UploaderMessage";
import "./Uploader.css";

export default function Uploader() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleSubmit = async (data) => {
    data.preventDefault();
    try {
      if (files.length == 0) {
        setMessage("Please select a file.");
      } else {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("file", files[i]);
        }
        let jwt = localStorage.getItem("token");
        const result = await axios.post("/api/files", formData, {
          headers: {
            "Content-Type": "multipart/form.data",
            Authorization: "Bearer " + jwt,
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        });
        setMessage("File(s) successfully uploaded.");
      }
    } catch (err) {
      console.log(err);
      setMessage("Error while uploading");
    }
  };

  return (
    <div className="Wrapper">
      <div>
        {message ? (
          <UploaderMessage uploadMsg={message} />
        ) : (
          <img
            className="Temp-image"
            src={
              "https://www.filemail.com/images/marketing/upload-your-files.svg"
            }
          />
        )}
      </div>
      <div className="Upload">
        <form>
          <input
            type="file"
            accept="image/png, application/pdf, image/jpeg"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          ></input>
          <ProgressBar percentage={uploadPercentage} />
          <button
            className="Upload-button"
            onClick={handleSubmit}
            type="submit"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
