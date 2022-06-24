import axios from "../api/axios";
import { userDisplayActions } from "./userDisplaySlice";
import { fetchDisplayData } from "../store/display-actions";
import { toast } from "react-toastify";

const VERIFY_URL = "/admin/verification/verify";
const REJECT_URL = "/admin/verification/reject";
const SEND_MAIL_URL = "/admin/verification/send_mail_to_institutional_email";

export const sendVerifyRequest = (data) => {
  const { user_id, accessToken, channel, action, data: reject_data } = data;

  return async (dispatch) => {
    const confirmRequest = async () => {
      const response = await axios.post(VERIFY_URL, user_id, {
        headers: { Authorization: `bearer ${accessToken}` },
      });
      return response;
    };

    const sendConfirmationMail = async () => {
      const response = await axios.post(SEND_MAIL_URL, user_id, {
        headers: { Authorization: `bearer ${accessToken}` },
      });
      return response;
    };

    const rejectRequest = async () => {
      const response = await axios.post(REJECT_URL, reject_data, {
        headers: { Authorization: `bearer ${accessToken}` },
      });
      return response;
    };

    if (action === "confirm") {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(userDisplayActions.toggleLoader());
          let response;
          if (channel.name === "Institutional Email") {
            response = await sendConfirmationMail();
            toast.success("Verification email has been sent");
          } else {
            response = await confirmRequest();
            toast.success("This user has been successfully verified");
          }
          dispatch(userDisplayActions.toggleLoader());

          await dispatch(fetchDisplayData(accessToken));
          resolve(response);
        } catch (error) {
          // console.log(error);
          reject(error);
          toast.error("We encountered an error. Contact system administrator");
          dispatch(userDisplayActions.toggleLoader());
        }
      });
    }

    if (action === "reject") {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(userDisplayActions.toggleLoader());
          const response = await rejectRequest();
          toast.success("This request has been declined");
          dispatch(userDisplayActions.toggleLoader());

          await dispatch(fetchDisplayData(accessToken));
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
