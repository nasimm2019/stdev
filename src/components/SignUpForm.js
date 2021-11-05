import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { auth, db } from "../firebase";
import * as routes from "../constants/routes";
const SignUpForm = (props) => {
  const { history } = props;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);
  const [showingAlert, setShowingAlert] = useState(false);
  const onSubmit = (event) => {
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      //it the above functions resolves, reset the state to its initial state values, otherwise, set the error object
      .then((authUser) => {
        //creating a user in the database after the sign up through Firebase auth API
        db.doCreateUser(authUser.user.uid, username, email)
          .then((res) => {
            history.push(routes.HOME); //redirects to Home Page
          })
          .catch((error) => {
            setError(error);
            timer(); //defined below
          });
      })
      .catch((err) => {
        setError(err);
        timer(); //show alert message for some seconds
      });

    event.preventDefault(); //prevents refreshing
  };
  const timer = () => {
    setShowingAlert(true);

    setTimeout(() => {
      setShowingAlert(false);
    }, 4000);
  };
  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";
  return (
    <div>
      {showingAlert && (
        <Alert color="danger" onLoad={timer}>
          {error.message}
        </Alert>
      )}
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label> Full Name</Form.Label>
          <Form.Control
            type="username"
            name="username"
            id="userName"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="examplePassword1"
            placeholder="Password"
            value={passwordOne}
            onChange={(e) => setPasswordOne(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label for="examplePassword2">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="examplePassword2"
            placeholder="Confirm Password"
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
          />
        </Form.Group>

        <div className="text-center mt-3">
          <Button disabled={isInvalid} type="submit">
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default SignUpForm;
