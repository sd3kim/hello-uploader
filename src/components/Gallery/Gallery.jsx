import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Gallery.css";

export default function Gallery(props) {
  const [files, setFiles] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let jwt = localStorage.getItem("token");
        const { data } = await axios.get("/api/getFiles", {
          headers: { Authorization: "Bearer " + jwt },
        });
        setFiles(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [deleted]);
  const handleDelete = async (id) => {
    try {
      let jwt = localStorage.getItem("token");
      const { data } = await axios.delete(`/api/delete/${id}`, {
        headers: { Authorization: "Bearer " + jwt },
      });

      const file = files.filter((item) => item.id !== id);
      setFiles(file);
      setDeleted(!deleted);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="Table">
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>File Preview</th>
              <th>File Name</th>
              <th>File Type (PDF, PNG, JEPG)</th>
              <th>File Size</th>
              <th>Uploaded At</th>
              <th>Uploaded By</th>
              <th>Delete?</th>
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
                        src={`https://fuploader.s3.amazonaws.com/${
                          el.filePath.split("/")[1]
                        }`}
                      />
                    )}
                  </td>
                  {/* File Name */}
                  <td key={idx + 1}>{el.fileName.split(".")[0]}</td>
                  {/* File Type */}
                  <td key={idx}>{el.fileType.split("/")[1]}</td>
                  {/* File Size */}
                  <td key={idx}>{el.fileSize}</td>
                  {/* Uploaded At */}
                  <td key={idx}>{el.updatedAt.split("T")[0]}</td>
                  {/* /* Uploaded By */}
                  <td key={idx}>{props.user?.name}</td>
                  <td>
                    <img
                      className="Delete"
                      key={idx + 2}
                      src={
                        "https://github.com/sirenfal-factorio/Trashcan/blob/master/Trashcan_1.0.1/graphics/bin-empty-icon.png?raw=true"
                      }
                      onClick={() => handleDelete(el._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
