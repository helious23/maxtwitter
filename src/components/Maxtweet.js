import React from "react";

const MaxTweet = ({ maxtweetObj, isOwner }) => {
  return (
    <div>
      <h4>{maxtweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default MaxTweet;
