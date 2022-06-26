import { createSlice } from "@reduxjs/toolkit";

const initialState = { allPosts: [], allTags: [] };

const postSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    // getTags(state) {
    //   state.allTags = action.payload;
    // },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
