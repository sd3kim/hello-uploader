import React from "react";

// import Logo from "../../components/Logo/Logo";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default class AuthPage extends React.Component {
  state = {
    showLogin: true,
  };

  render() {
    return (
      <main className="AuthPage">
        <div>
          {/* <Logo /> */}
          <h3
            onClick={() => this.setState({ showLogin: !this.state.showLogin })}
          >
            {this.state.showLogin ? "SIGN UP" : "LOG IN"}
          </h3>
        </div>

        {this.state.showLogin ? (
          <LoginForm setUserInState={this.props.setUserInState} />
        ) : (
          <SignUpForm setUserInState={this.props.setUserInState} />
        )}
      </main>
    );
  }
}
