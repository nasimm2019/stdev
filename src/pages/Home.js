import React, { useEffect } from "react";

import { withAuthorization, Spinner } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { setUserDetails } from "../redux/actions/actions";
const HomePage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { loggedUser } = props;
    db.doGetAnUnser(loggedUser.uid).then((res) => {
      dispatch(setUserDetails(res.val()));
    });
  }, []);
  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);
  return (
    <div>
      <h1>Home</h1>

      {loading ? (
        <div className="centered">
          <Spinner />
        </div>
      ) : (
        <>
          {" "}
          <p className="centered">Hello :{userInfo.username}</p>
          <p className="centered">This is your Email:{userInfo.email}</p>
        </>
      )}
      <p style={{ marginTop: "80px" }}>
        NOTE: This page is only accessible by signed in users.
      </p>
    </div>
  );
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage); //grants authorization to open endpoint if an user is signed in
