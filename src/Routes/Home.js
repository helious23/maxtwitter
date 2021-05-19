import MaxTweet from "components/Maxtweet";
import MaxtweetFactory from "components/MaxTweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [maxtweets, setMaxtweets] = useState([]);
  useEffect(() => {
    const getData = dbService
      .collection("maxtweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const maxtweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaxtweets(maxtweetArray);
      });
    return () => getData();
  }, []);

  return (
    <div className="container">
      <MaxtweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {maxtweets.map((maxtweet) => (
          <MaxTweet
            key={maxtweet.id}
            maxtweetObj={maxtweet}
            isOwner={maxtweet.creatorId === userObj.uid} // creatorId 와 props 로 받은 userObj.id 비교
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
