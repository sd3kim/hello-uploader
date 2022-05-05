import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ViewFilesPage from "./pages/ViewFilesPage/ViewFilesPage";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [user, setUser] = useState();

  const setUserInState = (incomingUserData) => {
    setUser(incomingUserData);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        token = null;
      } else {
        let userDoc = payload.user;

        setUser(userDoc);
      }
    }
  }, []);

  return (
    <div className="App">
      {user ? (
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/files"
              element={
<<<<<<< HEAD
                <ViewFilesPage setUserInState={setUserInState} user={user} />
=======
                <ViewFilesPage user={user} setUserInState={setUserInState} />
>>>>>>> 817d34966dacb8e9b0e06eb7e7a0d6ae9457d402
              }
            />
            <Route
              path="/profile"
              element={
                <ProfilePage setUserInState={setUserInState} user={user} />
              }
            />
          </Routes>
          <NavBar />
        </div>
      ) : (
        <AuthPage setUserInState={setUserInState} />
      )}
    </div>
  );
}
