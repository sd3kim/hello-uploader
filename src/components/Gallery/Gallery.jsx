import axios from "axios";
import React, { useEffect } from "react";

export default function Gallery({ images }) {
  useEffect(() => {
    axios
      .get("/images")
      .then((response) => this.setState({ images: response.data }));
    return () => {};
  }, []);
  return (
    <div>
      {images &&
        images.map((image, idx) => <img key={idx} src={`/images/${image}`} />)}
    </div>
  );
}
