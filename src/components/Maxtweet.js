import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const MaxTweet = ({ maxtweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMaxtweet, setNewMaxtweet] = useState(maxtweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this one?");
    if (ok) {
      await dbService.doc(`maxtweets/${maxtweetObj.id}`).delete();
      if (maxtweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(maxtweetObj.attachmentUrl).delete();
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`maxtweets/${maxtweetObj.id}`).update({
      text: newMaxtweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewMaxtweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  onChange={onChange}
                  type="text"
                  placeholder="Edit your Maxtweet"
                  value={newMaxtweet}
                  required
                />
                <input type="submit" value="Update" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{maxtweetObj.text}</h4>
          {maxtweetObj.attachmentUrl && (
            <img
              alt={maxtweetObj.text}
              src={maxtweetObj.attachmentUrl}
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MaxTweet;
