import api from '../../services/api'
var qs = require('qs');
var axios = require('axios');

export function getListJob(params) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/jobs?${qs.stringify(params)}`);
      dispatch({ type: "GET_LIST_JOB_SUCCESS", data: data });
    } catch (error) {
      const { data } = error.response
      return dispatch({ type: "GET_LIST_JOB_FAILURE", error: data.message });
    }
  };
}

export function getJobById(params) {
  //console.log('params', params);
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/jobs/${params.id}`);
      dispatch({ type: "GET_JOB_BY_ID_SUCCESS", data: data });
    } catch (error) {
      const { data } = error.response
      return dispatch({ type: "GET_JOB_BY_ID_FAILURE", error: data.message });
    }
  };
}

export function getListReferred(params) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/recruiters/me/refer?${qs.stringify(params)}`);
      dispatch({ type: "GET_LIST_REFERRED_SUCCESS", data: data });
    } catch (error) {
      const { data } = error.response
      return dispatch({ type: "GET_LIST_REFERRED_FAILURE", error: data.message });
    }
  };
}

export function createCandidate(payload) {
  return async dispatch => {
    try {
      await api.sendRequestWithToken('post', '/candidates', null, null, payload);
      return { status: true }
    } catch (error) {
      const { data } = error.response
      return { status: false, error: data.message };
    }
  };
}

export function uploadRequest(payload,name) {
  console.log('Vo day roi:', payload);
  const body = { mim_type: "application/pdf" };
  const header = { "Content-Type": "application/json" };
  return async dispatch => {
    try {
      var response = await api.sendRequest('post', '/upload/request', null, header, body)
        .then(response => response.data.presign_url);
      var body2 = response.fields;

      var data = new FormData();
      for (let property in body2) {
        data.append(`${property}`, `${body2[property]}`)
     
      }

      console.log('payloasssssssssssssssssssssssssssssssd',payload)
      data.append("file",payload.value[0],name);
      console.log(2)
        var tmp = await axios({
          method: 'post',
          url: response.url,
          data,
          headers: { "content-type": "application/x-www-form-urlencoded" }
        });
      var response2 = await api.sendRequest('post', '/upload/verify', null, {'content-type': 'application/json'}, {
        key: response.fields.key
      }).then(response => response.data.data);
      //console.log("sss",response2);

    } catch (error) {
      return 'request fail';
    }
    return { status: true ,data: response2};
  };
}