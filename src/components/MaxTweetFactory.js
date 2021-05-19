import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MaxtweetFactory = ({ userObj }) => {
  const [maxtweet, setMaxtweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`); // random 이름 설정
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL(); // bucket 의 url
    }

    const maxtweetObj = {
      text: maxtweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("maxtweets").add(maxtweetObj);
    setMaxtweet("");
    setAttachment("");
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
  );
};

export default MaxtweetFactory;
