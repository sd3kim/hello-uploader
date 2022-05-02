import React from "react";

export default function UserLogOut(props) {
  let handleLogout = () => {
    localStorage.removeItem("token");
    props.setUserInState(null);
  };

  return (
    <div className="UserLogOut">

      <div>Name: {props.user?.name}</div>
      <div>Email: {props.user?.email}</div>
      <button className="btn-sm" type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
