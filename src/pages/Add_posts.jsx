import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import styles from "./css/Add_post.module.css";
import AuthContext from "../context/AuthProvider";
import postApi from "../api/post";
import Add_tag from "../components/Add_tag";
import { toast } from "react-toastify";
import { postActions } from "../store/postsSlice";

const limit = 25;

function Add_posts(props) {
  const dispatch = useDispatch();
  const [post_title, setPost_title] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [savedImage, setSavedImage] = useState();
  const [isCreatingTag, setIsCreatingTag] = useState(false);

  const [tags, setTags] = useState();
  const [preview, setPreview] = useState("");
  const [post_body, setPost_body] = useState("");

  const [modalIsShown, setModalIsShown] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;
  const domain = authCtx.domain;
  const [selected_tag, setSelected_tag] = useState([]);
  const [InputKey, setInputKey] = useState();

  const resetFields = () => {
    setPost_title("");
    setSavedImage("");
    setPreview("");
    setPost_body("");
    setSelected_tag([]);
    resetsFileInput();
  };

  const resetsFileInput = () => {
    let randomString = Math.random().toString(36);
    setInputKey(randomString);
  };

  const handleCheck = (e) => {
    const isChecked = selected_tag.find((tag) => tag === e.target.value);

    if (!isChecked) {
      setSelected_tag([...selected_tag, e.target.value]);
    } else {
      const update = selected_tag.filter((tag) => tag !== e.target.value);
      setSelected_tag(update);
    }
  };

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

  const handlePost = (text) => {
    setPost_body(text.target.value);
  };

  const handleCreateTag = async (tag) => {
    setIsCreatingTag(true);
    const response = await postApi.saveTag(domain, accessToken, tag);
    if (!response.ok) return setErrorMsg(response.data.error);

    setTags([...tags, response.data.data]);
    setIsCreatingTag(false);
  };

  const handleUpload = async (image) => {
    setIsUploading(true);
    let image_to_upload = new FormData();

    image_to_upload.append("image", image);

    // console.log("image to upload", image_to_upload);

    // return;

    const response = await postApi.uploadImage(
      domain,
      accessToken,
      image_to_upload
    );
    if (!response.ok) return setErrorMsg(response.data.error);
    setIsUploading(false);

    setSavedImage(response.data.data);
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = {
      title: post_title,
      cover_photo: savedImage?.id,
      tags_id: selected_tag,
      preview,
      content: post_body,
    };
    const response = await postApi.savePost(domain, accessToken, post);

    if (!response.ok) return toast.error(response.data.errors.title[0]);

    dispatch(postActions.addPost(response.data.data));

    resetFields();

    toast.success("Posted");
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <h1>Add Posts</h1>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <label htmlFor="title">TITLE: </label>
        <input
          type="text"
          id="title"
          placeholder="POST TITLE"
          onChange={(text) => setPost_title(text.target.value)}
        />

        <div>
          <label htmlFor="cover">COVER IMAGE: </label>
          <input
            key={InputKey}
            type="file"
            id="cover"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
          {isUploading && <h5>Uploading</h5>}
        </div>

        <div className={styles.tags_container}>
          <label htmlFor="tags">TAGS: </label>
          Can't find your tag? <button onClick={show_add_tag}>Add Tag</button>
          <div className={styles.tags}>
            {tags &&
              tags.map((tag) => (
                <div key={tag.id}>
                  <label htmlFor={tag.id}>{tag.name}</label>
                  <input
                    type="checkbox"
                    id={tag.id}
                    value={tag.id}
                    onChange={handleCheck}
                  />
                </div>
              ))}
          </div>
          {modalIsShown && (
            <Add_tag
              onCloseModal={hide_add_tag}
              onTagCreate={handleCreateTag}
              isCreatingTag={isCreatingTag}
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

        <div className={styles.editor}>
          <label htmlFor="body">Post: </label>
          <textarea
            value={post_body}
            className={styles.body}
            // placeholder="Post Preview"
            id="body"
            onChange={handlePost}
          />
        </div>
        <div className={styles.submit_button}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Add_posts;
