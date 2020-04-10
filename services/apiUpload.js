import axios from 'axios';

// axios.defaults.baseURL = 'https://s3.ap-southeast-1.amazonaws.com/dev.crypto.co ';

const APIService1 = {
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
      url: `https://api-sub60.rockship.co${url}`,
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
            window.location.href = "/login"
          }
          reject(err);
        });
    });
  },
};

export default APIService1;
