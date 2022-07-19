import client from "./client";

const user_url = "/admin/profile/";
const user_info_url = "/admin/profile/create";

const getUser = (id, domain, accessToken) =>
  client.apiPostClient.get(
    domain + user_url + id,
    {},
    {
      headers: { Authorization: `bearer ${accessToken}` },
    }
  );

const updateUserInfo = (user, domain, accessToken) =>
  client.apiPostClient.post(domain + user_info_url, user, {
    headers: { Authorization: `bearer ${accessToken}` },
  });

export default { getUser, updateUserInfo };
