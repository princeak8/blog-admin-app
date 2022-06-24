import client from "./client";

const endpoint = "/auth/admin/login";

const loginUser = (email, password) =>
  client.post(
    endpoint,
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );

export default { loginUser };
