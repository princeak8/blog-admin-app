import { createSlice } from "@reduxjs/toolkit";

const initialReportState = { allReportedPosts: [] };

const reportedPostSlice = createSlice({
  name: "reportedPost",
  initialState: initialReportState,
  reducers: {
    allReportedPostsData(state, action) {
      state.allReportedPosts = action.payload;
    },
  },
});

export const reportPostActions = reportedPostSlice.actions;

export default reportedPostSlice.reducer;
