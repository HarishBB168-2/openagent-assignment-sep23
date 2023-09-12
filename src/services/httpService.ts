import axios, { AxiosHeaderValue } from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error("Unexpected error occured");
  }
  return Promise.reject(error);
});

export function setAuthorizationToken(token: AxiosHeaderValue) {
  axios.defaults.headers["Authorization"] = token;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAuthorizationToken,
};
