import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://blog-api-auth.zizix6host.com/api/v1",
  timeout: 15000,
});

export default apiClient;
