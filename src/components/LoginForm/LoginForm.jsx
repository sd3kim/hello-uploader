import { Component } from "react";

export default class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
      this.props.setUserInState(userDoc);
    } catch (err) {
      console.log("SignupForm error", err);
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    return (
      <div>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://account.splashtrack.com/Content/V2/img/user-login-bg.png"
                  className="img-fluid"
                  alt="Phone image"
                />
              </div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form1Example13"
                      className="form-control form-control-lg"
                      // type="text"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                    />
                    <label className="form-label">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form1Example23"
                      className="form-control form-control-lg"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                    <label className="form-label">Password</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Login
                  </button>

                  <br />
                  <br />
                  <p className="error-message">&nbsp;{this.state.error}</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
