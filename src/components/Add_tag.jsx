import React, { useState } from "react";
import Modal from "./Modal";

function Add_tag({ onTagCreate, onCloseModal }) {
  const [tag, setTag] = useState("");

  const handleCreateTag = () => {
    onTagCreate(tag);
  };

  return (
    <Modal onCloseModal={onCloseModal}>
      Create Tag{" "}
      <input type="text" onChange={(text) => setTag(text.target.value)} />
      <button type="submit" onClick={handleCreateTag}>
        Create
      </button>
    </Modal>
  );
}

export default Add_tag;
