const url = {
  admin: {
    prod: "",
    dev: "",
  },
  messenger: {
    prod: "",
    dev: "",
  },
};

const AdminstratorUrlDevServer = "58.65.211.234";
const AdminstratorUrlProdServer = "58.65.211.234";

export const URL =
  process.env.NODE_ENV === "development" ? devServer : prodServer;
export const AdminstratorUrl =
  process.env.NODE_ENV === "development" ? url.admin.dev : url.admin.prod;
