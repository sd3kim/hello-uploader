import { Component } from "react";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
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
    const disable = this.state.password !== this.state.confirm;
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
                      id="form1Example13"
                      className="form-control form-control-lg"
                      required
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                    <label className="form-label">Full Name</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      className="form-control form-control-lg"
                      required
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <label className="form-label">Email Address</label>
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
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form1Example23"
                      className="form-control form-control-lg"
                      name="confirm"
                      value={this.state.confirm}
                      onChange={this.handleChange}
                      required
                    />
                    <label className="form-label">Confirm Password</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Sign Up
                  </button>

                  <br />
                  <br />
                  <p className="error-message">&nbsp;{this.state.error}</p>
                  {/* <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0 text-muted">
                      OR
                    </p>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p> */}
      </div>
    );
  }
}
