import { dbService } from "myFirebase";
import { useState } from "react";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`jweets/${jweetObj.id}`).update({ text: newJweet });
    setEditing(false);
  };
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure with deleting this jweet?");
    if (ok) {
      dbService.doc(`jweets/${jweetObj.id}`).delete();
    }
  };
  return (
    <div key={jweetObj.id}>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your jweet"
              onChange={onChange}
              value={newJweet}
              required
            />
            <input type="submit" value="Save" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Jweet</button>
              <button onClick={onDeleteClick}>Delete Jweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet;
