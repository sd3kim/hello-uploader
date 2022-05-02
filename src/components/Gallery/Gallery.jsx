import axios from "axios";
import React, { useEffect } from "react";

export default function Gallery({ files, setFiles }) {
  useEffect(() => {
    axios.get("/api/images").then((response) => {
      setFiles(response.data);
    });
  }, []);
  return (
    <div>
      {files &&
        files.map((file, idx) => <img key={idx} src={`/${file.filePath}`} />)}
    </div>
  );
}
