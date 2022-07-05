import client from "./client";

const GET_TAG = "/admin/tag/all";
const SAVE_TAG = "/admin/tag/save";
const IMAGE_UPLOAD_URL = "/admin/file/save";
const SAVE_POST_URL = "/admin/post/save";

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
    domain + SAVE_TAG,
    { name: tag },
    {
      headers: { Authorization: `bearer ${accessToken}` },
    }
  );

const uploadImage = (domain, accessToken, image) =>
  client.apiPostClient.post(domain + IMAGE_UPLOAD_URL, image, {
    headers: { Authorization: `bearer ${accessToken}` },
  });

const savePost = (domain, accessToken, post) =>
  client.apiPostClient.post(domain + SAVE_POST_URL, post, {
    headers: { Authorization: `bearer ${accessToken}` },
  });

export default { getTags, saveTag, uploadImage, savePost };
