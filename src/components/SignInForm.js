import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { auth } from "../firebase";
import * as routes from "../constants/routes";
const SignInForm = (props) => {
  const { history } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showingAlert, setShowingAlert] = useState(false);
  const onSubmit = (event) => {
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then((res) => {
        history.push(routes.HOME);
      })
      .catch((error) => {
        setError(error);
        timer(); //defined below
      });

    event.preventDefault();
  };
  const timer = () => {
    setShowingAlert(true);

    setTimeout(() => {
      setShowingAlert(false);
    }, 4000);
  };
  const isInvalid = password === "" || email === "";
  return (
    <div>
      {showingAlert && (
        <Alert color="danger" onLoad={timer}>
          {error.message}
        </Alert>
      )}

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="user@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="examplePassword"
            placeholder="pass-test"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <div className="text-center mt-3">
          <Button disabled={isInvalid} type="submit">
            Sign In
          </Button>
        </div>
      </Form>
      <hr />
    </div>
  );
};
export default SignInForm;
