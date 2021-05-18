import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [maxtweet, setMaxtweet] = useState("");
  const [maxtweets, setMaxtweets] = useState([]);
  const getMaxtweets = async () => {
    const dbMaxtweets = await dbService.collection("maxtweets").get(); // tweet 가져옴
    dbMaxtweets.forEach((document) => {
      const maxtweetObj = {
        ...document.data(), // spread operator 로 obj 에 담음
        id: document.id,
      };
      setMaxtweets((prev) => [maxtweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getMaxtweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("maxtweets").add({
      maxtweet,
      createdAt: Date.now(),
    });
    setMaxtweet(""); // input 비워줌
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMaxtweet(value);
  };
  console.log(maxtweets);
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
            <h4>{maxtweet.maxtweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
