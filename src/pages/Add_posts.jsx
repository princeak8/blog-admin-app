import React, { useContext, useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useSelector } from "react-redux";
import styles from "./css/Add_post.module.css";
import AuthContext from "../context/AuthProvider";
import client from "../api/client";
import postApi from "../api/post";
import Add_tag from "../components/Add_tag";

function Add_posts(props) {
  const [post_title, setPost_title] = useState("");
  const [coverImage, setCoverImage] = useState();
  const [modalIsShown, setModalIsShown] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [tags, setTags] = useState();
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;

  const show_add_tag = () => {
    setModalIsShown(true);
  };

  const hide_add_tag = () => {
    setModalIsShown(false);
  };

  const getTags = async () => {
    const response = await postApi.getTags(accessToken);
    if (!response.ok) setErrorMsg(response.data.error);

    setTags(response.data.data);
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(post_title, coverImage);
  };

  return (
    <div>
      <h1>Add Posts</h1>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <label htmlFor="title">TITLE: </label>
        <input
          type="text"
          id="title"
          placeholder="POST TITLE"
          onChange={(text) => setPost_title(text.target.value)}
        />

        <label htmlFor="cover">COVER IMAGE: </label>
        <input
          type="file"
          id="cover"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />

        <div className={styles.tags}>
          <label htmlFor="tags">TAGS: </label>
          Can't find your tag? <button onClick={show_add_tag}>Add Tag</button>
          {modalIsShown && <Add_tag onCloseModal={hide_add_tag} />}
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Add_posts;
