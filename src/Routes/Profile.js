import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClock = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyMaxtweet = async () => {
    const maxtweets = await dbService
      .collection("maxtweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
    console.log(maxtweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyMaxtweet();
  }, []);
  return (
    <>
      <button onClick={onLogOutClock}>Log Out</button>
    </>
  );
};

export default Profile;
