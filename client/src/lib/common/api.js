import axios from "axios";
import { getBackendHost } from "../backend";
import useStore from "../../store/index";

export const Api = axios.create({
  baseURL: getBackendHost(),
  withCredentials: true,
});

console.log(getBackendHost);

Api.interceptors.request.use(
  async (config) => {
    const { userSession } = useStore.getState();

    if (config?.headers && userSession) {
      config.headers["Custom-Session-Header"] = userSession;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
