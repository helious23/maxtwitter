import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  onChange={onChange}
                  type="text"
                  placeholder="Edit your Maxtweet"
                  value={newMaxtweet}
                  autoFocus
                  required
                  className="formInput"
                />
                <input
                  type="submit"
                  value="Update MaxTweet"
                  className="formBtn"
                />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{maxtweetObj.text}</h4>
          {maxtweetObj.attachmentUrl && (
            <img alt={maxtweetObj.text} src={maxtweetObj.attachmentUrl} />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MaxTweet;
