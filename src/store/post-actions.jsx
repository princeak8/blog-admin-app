import { reportPostActions } from "./reportingSlice";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { userDisplayActions } from "./userDisplaySlice";

const ALL_REPORTEDPOST_URL = "/admin/report/all";
const DELETE_POST = "/admin/post/delete";
const DELETE_COMMENT = "/admin/comment/delete";
const DELETE_REPORT = "/admin/report/";


export const fetchReportData = (accessToken) => {
  return async (dispatch) => {
    // console.log(accessToken);
    const fetchAllPostData = async () => {
      const response = await axios.get(ALL_REPORTEDPOST_URL, {
        headers: { Authorization: `bearer ${accessToken}` },
      });
      return response;
    };

    try {
      dispatch(userDisplayActions.toggleLoader());
      const allReportedPost = await fetchAllPostData();

      const posts = allReportedPost?.data?.data;
      dispatch(reportPostActions.allReportedPostsData(posts));
      // toast.success("Entries Updated");
      dispatch(userDisplayActions.toggleLoader());
    } catch (error) {
      toast.error("We encountered an error. Contact system administrator");
      dispatch(userDisplayActions.toggleLoader());
    }
  };
};

export const delete_Post_Comment = (data) => {
  const { accessToken, id, action } = data;

  return async (dispatch) => {
    const deletePost = async () => {
      const response = await axios.post(
        DELETE_POST,
        { post_id: id },
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
      return response;
    };

    const deleteComment = async () => {
      const response = await axios.post(
        DELETE_COMMENT,
        { comment_id: id },
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
      return response;
    };

    const deleteReport = async () => {
      const url = DELETE_REPORT + id
      const response = await axios.delete(
        url,
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
      return response;
    };

    if (action === "delete_post") {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(userDisplayActions.toggleLoader());
          const response = await deletePost();
          toast.success("Post Deleted");
          dispatch(userDisplayActions.toggleLoader());
          await dispatch(fetchReportData(accessToken));
          resolve(response);
        } catch (error) {
          reject(error);
          toast.error("We encountered an error. Contact system administrator");
          dispatch(userDisplayActions.toggleLoader());
        }
      });
    }

    if (action === "delete_comment") {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(userDisplayActions.toggleLoader());
          const response = await deleteComment();
          toast.success("Comment Deleted");
          dispatch(userDisplayActions.toggleLoader());
          await dispatch(fetchReportData(accessToken));
          resolve(response);
        } catch (error) {
          reject(error);
          toast.error("We encountered an error. Contact system administrator");
          dispatch(userDisplayActions.toggleLoader());
        }
      });
    }

    if (action === "delete_report") {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(userDisplayActions.toggleLoader());
          const response = await deleteReport();
          toast.success("Report Ignored");
          dispatch(userDisplayActions.toggleLoader());
          await dispatch(fetchReportData(accessToken));
          resolve(response);
        } catch (error) {
          reject(error);
          toast.error("We encountered an error. Contact system administrator");
          dispatch(userDisplayActions.toggleLoader());
        }
      });
    }
  };
};
