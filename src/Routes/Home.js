import MaxTweet from "components/Maxtweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [maxtweet, setMaxtweet] = useState("");
  const [maxtweets, setMaxtweets] = useState([]);
  const [attachment, setAttachment] = useState();
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
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // fileloading 이 끝나면 실행
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment(null);
    const fileInput = document.getElementById("fileInput");
    fileInput.value = null;
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
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <input type="submit" value="MaxTweet" />
        {attachment && (
          <div>
            <img alt="#" src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
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
