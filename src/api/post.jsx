import client from "./client";

const GET_TAG = "blog/admin/tag/all";

const getTags = (accessToken) =>
  client.apiPostClient.get(
    GET_TAG,
    {},
    {
      headers: { Authorization: `bearer ${accessToken}` },
    }
  );

export default { getTags };
