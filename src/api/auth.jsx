import client from "./client";

const endpoint = "login";

const loginUser = (email, password) =>
  client.apiAuthClient.post(
    endpoint,
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );

export default { loginUser };
