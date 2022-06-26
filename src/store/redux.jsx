import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import userDisplayReducer from "./userDisplaySlice";
import postReducer from "./postsSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    userDisplay: userDisplayReducer,
    post: postReducer,
  },
});

export default store;
