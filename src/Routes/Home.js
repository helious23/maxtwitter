import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [maxtweet, setMaxtweet] = useState("");
  const [maxtweets, setMaxtweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("maxtweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const maxtweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaxtweets(maxtweetArray);
      });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("maxtweets").add({
      text: maxtweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setMaxtweet(""); // input 비워줌
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMaxtweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={maxtweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="MaxTweet" />
      </form>
      <div>
        {maxtweets.map((maxtweet) => (
          <div key={maxtweet.id}>
            <h4>{maxtweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
