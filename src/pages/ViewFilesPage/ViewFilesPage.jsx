import React from "react";
import Gallery from "../../components/Gallery/Gallery";
import "./ViewFiles.css";

export default function ViewFilesPage({ user, setUserInState }) {
  return (
    <div>
      <h1 style={{ marginTop: "150px" }}>View Files</h1>
      <Gallery user={user} setUserInState={setUserInState} />
    </div>
  );
}
