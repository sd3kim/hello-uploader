import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Gallery() {
  const [multipleFiles, setMultipleFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filelist = await getMultpileFiles();
        setMultipleFiles(filelist);
        console.log(filelist);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const getMultpileFiles = async () => {
    try {
      const { data } = await axios.get("/api/images/getMultpileFiles");
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("this is multi files", { multipleFiles });
  return (
    <div>
      {multipleFiles &&
        multipleFiles.map((image, index) => (
          <div key={index}>
            {image.files.map((file, idx) => (
              <img key={idx} src={`/${file.filePath}`} />
            ))}
          </div>
        ))}
    </div>
  );
}
