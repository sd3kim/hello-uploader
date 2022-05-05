import React from "react";
import UserLogOut from "../../components/UserLogOut/UserLogOut";
import "./ProfilePage.css";

export default function ProfilePage(props) {
  return (
    <div>
      <div className="Logout" style={{ marginTop: "125px" }}>
        <UserLogOut setUserInState={props.setUserInState} user={props.user} />
      </div>
    </div>
  );
}
