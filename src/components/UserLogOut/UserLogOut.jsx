// import React from "react";

// class UserLogOut extends React.Component {
//   handleLogout = () => {
//     localStorage.removeItem("token");
//     this.props.setUserInState(null);
//   };

//   render() {
//     return (
//       <div className="UserLogOut">
//         <div>Name: {this.props.user.name}</div>
//         <div>Email:{this.props.user.email}</div>
//         <button className="btn-sm" type="submit" onClick={this.handleLogout}>
//           Logout
//         </button>
//       </div>
//     );
//   }
// }

// export default UserLogOut;

import React from "react";

function UserLogOut(props) {
  let handleLogout = () => {
    localStorage.removeItem("token");
    props.setUserInState(null);
  };

  return (
    <div className="UserLogOut">
      <div>Name: {props.user?.name}</div>
      <div>Email:{props.user?.email}</div>
      <button className="btn-sm" type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserLogOut;
