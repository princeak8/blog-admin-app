import client from "./client";

const GET_TAG = "/admin/tag/all";
const Save_TAG = "/admin/tag/save";

const getTags = (domain, accessToken) =>
  client.apiPostClient.get(
    domain + GET_TAG,
    {},
    {
      headers: { Authorization: `bearer ${accessToken}` },
    }
  );

const saveTag = (domain, accessToken, tag) =>
  client.apiPostClient.post(
    domain + Save_TAG,
    { name: tag },
    {
      headers: { Authorization: `bearer ${accessToken}` },
    }
  );

export default { getTags, saveTag };
