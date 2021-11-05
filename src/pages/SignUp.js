import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../constants/routes";
import { SignUpForm } from "../components";

const SignUpPage = ({ history }) => (
  <div>
    <div className="div-flex">
      <div>
        <h1 className="centered">Sign Up</h1>
        <SignUpForm history={history} />
      </div>
    </div>
  </div>
);

//################### Sign Up Link ###################
//used in the sign in when the user don't have an account registered yet
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

//exports
export default withRouter(SignUpPage); //using a HoC to get access to history
export { SignUpLink };
