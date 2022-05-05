import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Gallery.css";

export default function Gallery(props) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // /api/getFiles is not returning an array
        let jwt = localStorage.getItem("token");
        const { data } = await axios.get("/api/getFiles", {
          headers: { Authorization: "Bearer " + jwt },
        });
        // need to set data as an array
        setFiles(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log({ files });
  return (
    <div>
      <div className="table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>File Preview</th>
              <th>File Name</th>
              <th>File Type (pdf, png, jpeg)</th>
              <th>File Size</th>
              <th>Uploaded At</th>
              <th>Uploaded By</th>
            </tr>
          </thead>
          <tbody>
            {/* File Preview */}
            {files &&
              files.map((el, idx) => (
                <tr>
                  <td className="image-preview-td">
                    {el.fileType == "application/pdf" ? (
                      <img
                        className="image-preview"
                        src={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                        }
                      />
                    ) : (
                      <img
                        className="image-preview"
                        key={idx}
                        src={`https://file-uploader123.s3.amazonaws.com/${
                          el.filePath.split("/")[1]
                        }`}
                      />
                    )}
                  </td>
                  {/* File Name */}
                  <td key={idx}>{el.fileName.split(".")[0]}</td>
                  {/* File Type */}
                  <td key={idx}>{el.fileType.split("/")[1]}</td>
                  {/* File Size */}
                  <td key={idx}>{el.fileSize}</td>
                  {/* Uploaded At */}
                  <td key={idx}>{el.updatedAt.split("T")[0]}</td>
                  {/* /* Uploaded By */}
                  <td key={idx}>{props.user?.name}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {/* {files &&
        files.map((el, index) => (
          <img
            className="image-preview"
            key={index}
            src={`https://file-uploader123.s3.amazonaws.com/${
              el.filePath.split("/")[1]
            }`}
          />
        ))} */}

      {/* {files &&
        files.map((el, index) => (
          <img
            key={index}
            src={`https://fuploader.s3.amazonaws.com/${
              el.filePath.split("/")[1]
            }`}
          />
        ))} */}
    </div>
  );
}
