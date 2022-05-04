import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function Gallery() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filelist = await getFiles();
        setFiles(filelist);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getFiles = async () => {
    try {
      const { data } = await axios.get("/api/getFiles");
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("this is multi files", { files });
  // const borderStyles = {
  //   border: "2px solid rgba(0, 0, 0, 1)",
  // };
  return (
    <div>
      {/* {files &&
        files.map((image, index) => (
          <div key={index}>
            {image.files.map((file, idx) => (
              <img key={idx} src={`/files/${file.filePath}`} />
            ))}
          </div>
        ))} */}
      <div className="table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Type (png, pdf, jpeg)</th>
              <th>File Size</th>
              <th>Uploaded At</th>
              <th>Uploaded By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cat.png</td>
              <td>PNG</td>
              <td>300 MB</td>
              <td>MAY-03-2022</td>
              <td>user</td>
            </tr>
            <tr>
              <td>Dog.png</td>
              <td>PNG</td>
              <td>200 MB</td>
              <td>MAY-03-2022</td>
              <td>user</td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* {files &&
        files.map(
          (nestedFile) =>
            nestedFile.files &&
            nestedFile.files.map((name) => console.log("show: ", name.files))
        )} */}

      {/* {files && files.map((name) => console.log("show this!!: ", name.files))} */}

      {files &&
        files.map((id, index) => (
          <img
            key={index}
            src={`https://file-uploader123.s3.amazonaws.com/${id}`}
          />
        ))}
    </div>
  );
}
