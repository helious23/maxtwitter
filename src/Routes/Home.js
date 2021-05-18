import React, { useState } from "react";

const Home = () => {
  const [maxtweet, setMaxtweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
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
    </div>
  );
};

export default Home;
