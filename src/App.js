// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import AuthPage from "./pages/AuthPage/AuthPage";
// import NavBar from "./components/NavBar/NavBar";
// import MainPage from "./pages/MainPage/MainPage";
// import ProfilePage from "./pages/ProfilePage/ProfilePage";
// import ViewFilesPage from "./pages/ViewFilesPage/ViewFilesPage";
// // import Uploader from "./components/Uploader/Uploader";
// // import Gallery from "./components/Gallery/Gallery";
// import "bootstrap/dist/css/bootstrap.min.css";

// class App extends React.Component {
//   state = {
//     user: null,
//     images: [],
//   };
//   setUserInState = (incomingUserData) => {
//     this.setState({ user: incomingUserData });
//   };

//   componentDidMount = () => {
//     let token = localStorage.getItem("token");
//     if (token) {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       if (payload.exp < Date.now() / 1000) {
//         localStorage.removeItem("token");
//         token = null;
//       } else {
//         let userDoc = payload.user;
//         this.setState({ user: userDoc });
//       }
//     }
//   };

//   render() {
//     return (
//       <div className="App">
//         {this.state.user ? (
//           <div>
//             <Routes>
//               <Route path="/" element={<MainPage />} />
//               <Route path="/files" element={<ViewFilesPage />} />
//               <Route
//                 path="/profile"
//                 element={
//                   <ProfilePage
//                     setUserInState={this.setUserInState}
//                     user={this.state.user}
//                   />
//                 }
//               />
//             </Routes>
//             <NavBar />
//           </div>
//         ) : (
//           <AuthPage setUserInState={this.setUserInState} />
//         )}
//       </div>
//     );
//   }
// }

// export default App;

import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ViewFilesPage from "./pages/ViewFilesPage/ViewFilesPage";
// import Uploader from "./components/Uploader/Uploader";
// import Gallery from "./components/Gallery/Gallery";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // state = {
  //   user: null,
  //   images: [],
  // };
  const [user, setUser] = useState();
  const [images, setImages] = useState([]);

  const setUserInState = (incomingUserData) => {
    setUser(incomingUserData);
    console.log(user);
    // this.setState({ user: incomingUserData });
  };

  // componentDidMount = () => {
  useEffect(() => {
    // function fetchData() {

    let token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        token = null;
      } else {
        let userDoc = payload.user;
        setUser(userDoc);
        // this.setState({ user: userDoc });
      }
    }
    // }
    // fetchData();
  }, []);

  // render() {
  return (
    <div className="App">
      {user ? (
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/files" element={<ViewFilesPage />} />
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
// }

export default App;
