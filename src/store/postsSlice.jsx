import { createSlice } from "@reduxjs/toolkit";

const initialState = { allPosts: [], allTags: [] };

const postSlice = createSlice({
  name: "postsDisplay",

  initialState,

  reducers: {
    initializePosts(state, action) {
      state.allPosts = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
