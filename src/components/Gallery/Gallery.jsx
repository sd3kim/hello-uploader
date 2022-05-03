import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Gallery() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filelist = await getFiles();
        setFiles(filelist);
        console.log(filelist);
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
  return (
    <div>
      {files &&
        files.map((image, index) => (
          <div key={index}>
            {image.files.map((file, idx) => (
              <img key={idx} src={`/${file.filePath}`} />
            ))}
          </div>
        ))}
    </div>
  );
}
