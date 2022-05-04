import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Gallery() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filelist = await getFiles();
        console.log("this is filelist", filelist);
        setFiles(filelist);
        console.log("this is files in gallery", { files });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const getFiles = async () => {
    try {
      let jwt = localStorage.getItem("token");
      const { data } = await axios.get("/api/getFiles", {
        headers: { Authorization: "Bearer " + jwt },
      });
      console.log("this is data", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  console.log("this is multi files", { files });
  return (
    <div>
      {files && files.map((file) => console.log(`/files/${file}`))}
      {/* {files &&
        files.map((image, index) => (
          <div key={index}>
            {image.files.map((file, idx) => (
              <img key={idx} src={`/${file.filePath}`} />
            ))}
          </div>
        ))} */}
      {files &&
        files.map((file, index) => <img key={index} src={`/files/${file}`} />)}
    </div>
  );
}
