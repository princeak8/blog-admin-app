import React, { useContext, useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useSelector } from "react-redux";
import styles from "./css/Add_post.module.css";
import AuthContext from "../context/AuthProvider";
import client from "../api/client";
import postApi from "../api/post";
import Add_tag from "../components/Add_tag";

const limit = 3;

function Add_posts(props) {
  const [post_title, setPost_title] = useState("");
  const [coverImage, setCoverImage] = useState();
  const [tags, setTags] = useState();
  const [preview, setPreview] = useState("");

  const [modalIsShown, setModalIsShown] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;
  const domain = authCtx.domain;

  const show_add_tag = () => {
    setModalIsShown(true);
  };

  const hide_add_tag = () => {
    setModalIsShown(false);
  };

  const getTags = async () => {
    const response = await postApi.getTags(domain, accessToken);
    if (!response.ok) return setErrorMsg(response.data.error);

    setTags(response.data.data);
  };

  const handlePreview = (text) => {
    let words = preview.split(" ").filter(Boolean);

    if (words.length > limit) {
      console.log(words);
      setPreview(words.slice(0, limit).join(" ").toString().trim());
    } else {
      setPreview(text.target.value);
    }
  };

  const handleCreateTag = async (tag) => {
    const response = await postApi.saveTag(domain, accessToken, tag);
    if (!response.ok) return setErrorMsg(response.data.error);

    getTags();
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

        <div className={styles.tags_container}>
          <label htmlFor="tags">TAGS: </label>
          Can't find your tag? <button onClick={show_add_tag}>Add Tag</button>
          <div className={styles.tags}>
            {tags &&
              tags.map((tag) => (
                <div key={tag.id}>
                  <label htmlFor={tag.id}>{tag.name}</label>
                  <input type="checkbox" id={tag.id} value={tag} />
                </div>
              ))}
          </div>
          {modalIsShown && (
            <Add_tag
              onCloseModal={hide_add_tag}
              onTagCreate={handleCreateTag}
            />
          )}
        </div>

        <div className={styles.preview_content}>
          <label htmlFor="cover">PREVIEW: </label>
          <textarea
            value={preview}
            className={styles.preview}
            placeholder="Post Preview"
            id="preview"
            onChange={handlePreview}
          />
          {`${preview.split(" ").length - 1} / ${limit} ${
            preview.split(" ").length - 1 < 2 ? "word" : "words"
          }`}
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Add_posts;
