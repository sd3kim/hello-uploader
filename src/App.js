import "./App.css";
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./pages/MainPage/MainPage";
import Uploader from "./components/Upload/Upload";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainPage />
      <Uploader />
    </div>
  );
}

export default App;
