import { create } from "apisauce";

const apiAuthClient = create({
  baseURL: "https://blog-api-auth.zizix6host.com/api/v1/",
  timeout: 15000,
});

const apiPostClient = create({
  baseURL: "https://blog-api.zizix6host.com/api/v1/",
  timeout: 15000,
});

export default { apiAuthClient, apiPostClient };
