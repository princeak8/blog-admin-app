import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import styles from "./css/Add_post.module.css";
import AuthContext from "../context/AuthProvider";
import postApi from "../api/post";
import Add_tag from "../components/Add_tag";
import { toast } from "react-toastify";
import { postActions } from "../store/postsSlice";
import { Link, useLocation } from "react-router-dom";

const limit = 25;

function Add_posts(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [post_title, setPost_title] = useState(location.state.title);
  const [isUploading, setIsUploading] = useState(false);
  const [savedImage, setSavedImage] = useState(
    location.state.coverImage ? location.state.coverImage : {}
  );
  const [isCreatingTag, setIsCreatingTag] = useState(false);

  const [tags, setTags] = useState();
  const [preview, setPreview] = useState(location.state.preview);
  const [post_body, setPost_body] = useState(location.state.content);

  const [modalIsShown, setModalIsShown] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;
  const domain = authCtx.domain;
  const [selected_tag, setSelected_tag] = useState(location.state.tags);
  const [InputKey, setInputKey] = useState();

  console.log("location", location);
  //   console.log(location);

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

  const handleCheck = (tag) => {
    const isChecked = selected_tag.find((item) => item.id === tag.id);

    if (!isChecked) {
      setSelected_tag([...selected_tag, tag]);
    } else {
      const update = selected_tag.filter((item) => item.id !== tag.id);
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
    const tags = [];
    selected_tag.map((tag) => tags.push(tag.id));
    const post = {
      post_id: location.state.id,
      title: post_title,
      cover_photo_id: savedImage?.id,
      tags_id: tags,
      preview,
      content: post_body,
    };

    // return console.log(post);
    const response = await postApi.updatePost(domain, accessToken, post);
    if (!response.ok) return toast.error(response.data.errors.title[0]);

    dispatch(postActions.updatePost(response.data.data));

    resetFields();

    toast.success("Posted");
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <h1>Edit Post</h1>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <label htmlFor="title">TITLE: </label>
        <input
          value={post_title}
          type="text"
          id="title"
          placeholder="POST TITLE"
          onChange={(text) => setPost_title(text.target.value)}
        />
        {/* <Link to={{ pathname: savedImage.url }} target="_blank">
            {savedImage.original_filename}
          </Link> */}
        <div>
          <label htmlFor="cover">COVER IMAGE: </label>
          {Object.values(savedImage).length === 0 ? (
            <input
              value={savedImage.url}
              key={InputKey}
              type="file"
              id="cover"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          ) : (
            <>
              <a href={savedImage.url} target="_blank">
                {savedImage.original_filename}
              </a>
              <button onClick={() => setSavedImage({})}>Remove</button>
            </>
          )}
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
                    checked={
                      selected_tag.find((item) => item.id === tag.id)
                        ? true
                        : false
                    }
                    type="checkbox"
                    id={tag.id}
                    value={tag.id}
                    onChange={() => handleCheck(tag)}
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
