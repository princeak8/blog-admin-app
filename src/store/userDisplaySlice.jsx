import { createSlice } from "@reduxjs/toolkit";

const initialUserDisplayState = {
  activePage: "/admin/",
  searchField: "",
  sort: {
    path: "profile.firstname",
    order: "asc",
  },
  sidebar: true,
  isLoading: false,
};

const userDisplaySlice = createSlice({
  name: "userDisplay",
  initialState: initialUserDisplayState,
  reducers: {
    raiseSort(state, action) {
      const newpath = action.payload;
      if (state.sort.path === newpath) {
        state.sort.order = state.sort.order === "asc" ? "desc" : "asc";
      } else {
        state.sort.path = newpath;
        state.sort.order = "asc";
      }
    },

    toggleSideBar(state) {
      state.sidebar = !state.sidebar;
    },

    toggleLoader(state) {
      state.isLoading = !state.isLoading;
    },

    searchItem(state, action) {
      state.searchField = action.payload;
    },
  },
});

export const userDisplayActions = userDisplaySlice.actions;

export default userDisplaySlice.reducer;
