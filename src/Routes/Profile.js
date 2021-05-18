import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router";

const Profile = () => {
  const history = useHistory();
  const onLogOutClock = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClock}>Log Out</button>
    </>
  );
};

export default Profile;
