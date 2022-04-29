import React from "react";
import UserLogOut from "../../components/UserLogOut/UserLogOut";
export default function ProfilePage(props) {
  return (
    <div>
      <UserLogOut setUserInState={props.setUserInState} user={props.user} />
    </div>
  );
}
