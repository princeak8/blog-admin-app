import { userDisplayActions } from "./userDisplaySlice";
import client from "../api/client";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

const ALL_USERS_URL = "/admin/user/all";
const PENDING_VERIFICATION_URL = "/admin/verification/requests";
const VERIFIED_USERS_URL = "/admin/verification/verified_requests";
const REJECTION_URL = "/admin/verification/rejected_requests";
const SPECIALIZATIONS_URL = "/specializations";
const RANKS_URL = "/ranks";
const BLOCK_USER_URL = "admin/user/block";
const UNBLOCK_USER_URL = "admin/user/unblock";
const DELETE_USER_URL = "admin/user/delete";

export const fetchDisplayData = (accessToken) => {
  // const isLoading = useSelector((state) => state.userDisplay.isLoading);

  return async (dispatch) => {
    const fetchData = async () => {
      const responses = await Promise.allSettled([
        client.get(ALL_USERS_URL, {
          headers: { Authorization: `bearer ${accessToken}` },
        }),
        client.get(PENDING_VERIFICATION_URL, {
          headers: { Authorization: `bearer ${accessToken}` },
        }),
        client.get(VERIFIED_USERS_URL, {
          headers: { Authorization: `bearer ${accessToken}` },
        }),
        client.get(REJECTION_URL, {
          headers: { Authorization: `bearer ${accessToken}` },
        }),
        client.get(SPECIALIZATIONS_URL, {
          headers: { "Content-Type": "application/json" },
        }),
        client.get(RANKS_URL, {
          headers: { "Content-Type": "application/json" },
        }),
      ]);
      return responses;
    };

    try {
      dispatch(userDisplayActions.toggleLoader());

      const [
        allUsers,
        verifyData,
        verifiedData,
        rejected,
        specializationData,
        ranksData,
      ] = await fetchData();
      const users = allUsers?.value?.data?.data;
      const toVerify = verifyData?.value?.data?.data;
      const verified = verifiedData?.value?.data?.data;
      const rejectedUsers = rejected?.value?.data?.data;
      const specializations = specializationData?.value?.data?.data;
      const ranks = ranksData?.value?.data?.data;

      // console.log(specializations);

      dispatch(userDisplayActions.allUsersData(users));
      dispatch(userDisplayActions.pendingUserData(toVerify));
      dispatch(userDisplayActions.verifiedUserData(verified));
      dispatch(userDisplayActions.rejectedUserData(rejectedUsers));
      dispatch(userDisplayActions.setSpecializations(specializations));
      dispatch(userDisplayActions.setRanks(ranks));

      // toast.success("Entries Updated");
      dispatch(userDisplayActions.toggleLoader());
    } catch (error) {
      toast.error("We encountered an error. Contact system administrator");
      dispatch(userDisplayActions.toggleLoader());
      // console.log(error);
    }
  };
};

export const block_unblock_delete_user = (data) => {
  const { accessToken, user_id, action } = data;

  return async (dispatch) => {
    const blockUser = async () => {
      const response = await client.post(
        BLOCK_USER_URL,
        { user_id },
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
      return response;
    };

    const unblockUser = async () => {
      const response = await client.post(
        UNBLOCK_USER_URL,
        { user_id },
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
      return response;
    };

    const deleteUser = async () => {
      const response = await client.post(
        DELETE_USER_URL,
        { user_id },
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
      return response;
    };

    console.log(action);

    if (action === "block") {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(userDisplayActions.toggleLoader());
          const response = await blockUser();
          dispatch(userDisplayActions.toggleLoader());
          await dispatch(fetchDisplayData(accessToken));
          toast.success("User Blocked");
          resolve(response);
        } catch (error) {
          reject(error);
          toast.error("We encountered an error. Contact system administrator");
          dispatch(userDisplayActions.toggleLoader());
        }
      });
    }

    if (action === "unblock") {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(userDisplayActions.toggleLoader());
          const response = await unblockUser();
          dispatch(userDisplayActions.toggleLoader());
          await dispatch(fetchDisplayData(accessToken));
          toast.success("User Unblocked");
          resolve(response);
        } catch (error) {
          reject(error);
          toast.error("We encountered an error. Contact system administrator");
          dispatch(userDisplayActions.toggleLoader());
        }
      });
    }

    if (action === "delete") {
      console.log("delete");
      try {
        dispatch(userDisplayActions.toggleLoader());
        await deleteUser();
        dispatch(userDisplayActions.toggleLoader());
        await dispatch(fetchDisplayData(accessToken));
        toast.success("User Deleted");
      } catch (error) {
        toast.error("We encountered an error. Contact system administrator");
        dispatch(userDisplayActions.toggleLoader());
      }
    }
  };
};
