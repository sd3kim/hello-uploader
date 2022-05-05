import React from "react";

export default function UserLogOut(props) {
  let handleLogout = () => {
    localStorage.removeItem("token");
    props.setUserInState(null);
  };

  return (
    <div className="UserLogOut">
      <section className="vh-50">
        <div className="container py-5 h-50">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className="mt-3 mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle img-fluid"
                      style={{ width: "200px" }}
                    />
                  </div>
                  <h4 className="mb-2" style={{ color: "#242F40" }}>
                    {props.user?.name}
                  </h4>
                  <p className="text-muted mb-4">
                    <a style={{ color: "#242F40" }}>{props.user?.email}</a>
                  </p>
                  <div className="mb-4 pb-2">
                    <button
                      type="submit"
                      onClick={handleLogout}
                      className="btn btn-primary btn-floating"
                    >
                      Logout
                      <i className="fab fa-skype fa-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
