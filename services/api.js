import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const APIService = {
  sendRequest: (
    method,
    url,
    params,
    headerParams,
    body,
    { timeout = 60000 } = {},
    responseType = 'json'
  ) => {
    const headers = headerParams || {};
    const request = {
      url,
      method,
      timeout,
      headers,
      responseType,
      params
    };
    if (!method.match(/get|head|delete/)) {
      request.data = body || {};
    }
    if (method === 'delete') {
      request.params = body;
    }
    return new Promise((resolve, reject) => {
      axios
        .request(request)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            resolve(res);
          } else {
            resolve({ isError: true, ...res.data });
          }
        })
        .catch((err) => {
          if (headers.length && err.response.status === 401) {
            this.logOutRequest();
            window.location.href = "/login";
          }
          reject(err);
        });
    });
  },

  sendRequestWithToken: async (
    method,
    url,
    params,
    headerParams,
    body,
    { timeout = 60000 } = {},
    responseType = 'json'
  ) => {
    const headers = headerParams || {};
    // eslint-disable-next-line camelcase
    const token = localStorage.getItem('accessToken');
    // eslint-disable-next-line camelcase
    headers.authorization = `bearer ${token}`;
    return APIService.sendRequest(
      method,
      url,
      params,
      headers,
      body,
      { timeout },
      responseType
    );
  }
};

export default APIService;
