import { dbService, storageService } from "myFirebase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await dbService.doc(`jweets/${jweetObj.id}`).delete();
      await storageService.refFromURL(jweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`jweets/${jweetObj.id}`).update({
      text: newJweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };

  return (
    <div className="jweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container jweetEdit">
            <input
              type="text"
              placeholder="Edit your jweet"
              value={newJweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Jweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {jweetObj.attachmentUrl && <img src={jweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="jweet__actions">
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

export default Jweet;
