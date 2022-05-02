import React from "react";

export default function UserLogOut(props) {
  let handleLogout = () => {
    localStorage.removeItem("token");
    props.setUserInState(null);
    window.location.reload(true);
  };

  return (
    <div className="UserLogOut">
      <div>Name: {props.user.user.name}</div>
      <div>Email:{props.user.user.email}</div>
      <button className="btn-sm" type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
