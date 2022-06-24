import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://blog-api-auth.zizix6host.com/api/v1",
});

export default apiClient;
