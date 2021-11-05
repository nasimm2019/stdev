import React from "react";
import { withRouter } from "react-router-dom";
import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";
import { SignInForm } from "../components";

const SignInPage = ({ history }) => {
  return (
    <div className="div-flex">
      <div>
        <h1 className="centered">Sign In</h1>
        <SignInForm history={history} />
        <SignUpLink />
        <PasswordForgetLink />
      </div>
    </div>
  );
};

export default withRouter(SignInPage);
