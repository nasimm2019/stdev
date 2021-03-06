import React from "react";

import {
  AuthUserContext,
  PasswordChangeForm,
  withAuthorization,
} from "../components";
import { PasswordForgetForm } from "./PasswordForget";

const AccountPage = () => (
  //authUser is passed down via Context API (It is set at withAuthentication.js file)
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div className="div-flex">
        <div>
          <h5 className="centered">
            Change/Reset Password for : {authUser.email}
          </h5>
          {/* disabling password changes/resets if user is logged in through facebook */}
          {authUser.providerData[0].providerId === "facebook.com" ? null : (
            <div>
              <PasswordForgetForm />
              <PasswordChangeForm />
            </div>
          )}
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = (authUser) =>
  !!authUser && authUser.providerData[0].providerId !== "facebook.com"; //true and false

export default withAuthorization(authCondition)(AccountPage);
