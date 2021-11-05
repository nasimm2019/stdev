import React from "react";
import { Button } from "react-bootstrap";

import { auth } from "../firebase";

const SignOutButton = () => (
  <Button color="info" onClick={auth.doSignOut}>
    Sign Out
  </Button>
);

export default SignOutButton;
