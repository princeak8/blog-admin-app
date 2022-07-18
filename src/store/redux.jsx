import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import userReducer from "./userSlice";
import postReducer from "./postsSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    userDisplay: userReducer,
    postsDisplay: postReducer,
  },
});

export default store;
