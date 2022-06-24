import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import userDisplayReducer from "./userDisplaySlice";
import reportedPostReducer from "./reportingSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    userDisplay: userDisplayReducer,
    reportedPost: reportedPostReducer,
  },
});

export default store;
