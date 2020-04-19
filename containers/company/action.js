import api from '../../services/api'
var qs = require('qs');

export function createJob(payload) {
  return async dispatch => {
    try {
      await api.sendRequestWithToken('post', '/jobs', null, null, payload);
      return { status: true }
    } catch (error) {
      const { data } = error.response
      return { status: false, error: data.message };
    }
  };
}

export function updateJob(payload,id) {
  return async dispatch => {
    try {
      var responseId = await api.sendRequestWithToken('put', `/jobs/${id}`, null, { 'Content-type': 'application/json' }, payload)
        .then(response => response)
    } catch (error) {
      const { data } = error.response
      return { status: false, error: data.message };
    }
    return { status: true }
  };
}

export function deleteJob(payload) {
  return async dispatch => {
    try {
      var responseId = await api.sendRequestWithToken('delete', `/jobs/${payload}`, null, null, null)
        .then(response => response)
    } catch (error) {
      const { data } = error.response
      return { status: false, error: data.message };
    }
    return { status: true }
  };
}
export function getJobById(params) {
  console.log('params', params);
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
export function getListJob(params, companyId) {
    return async dispatch => {
      try {
        dispatch({ type: "GET_LIST_REQUEST" });
        const { data } = await api.sendRequestWithToken('get', `/companies/${companyId}/jobs?${qs.stringify(params)}`);
        dispatch({ type: "GET_LIST_JOB_SUCCESS", data: data });
      } catch (error) {
        const { data } = error.response
        return dispatch({ type: "GET_LIST_JOB_SUCCESS_FAILURE", error: data.message });
      }
    };
  }
  
  export function getListCandidate(params, companyId) {
    return async dispatch => {
      try {
        dispatch({ type: "GET_LIST_REQUEST" });
        const { data } = await api.sendRequestWithToken('get', `/companies/${companyId}/refers?${qs.stringify(params)}`);
        dispatch({ type: "GET_LIST_CANDIDATE_SUCCESS", data: data });
      } catch (error) {
        const { data } = error.response
        return dispatch({ type: "GET_LIST_CANDIDATE_SUCCESS_FAILURE", error: data.message });
      }
    };
  }
  export function updateStatusRef(referId, status, body) {
    return async dispatch => {
      try {
        const { data } = await api.sendRequestWithToken('put', `/refers/${referId}/${status}`, null, null, body);
        return { status: true, data: data }
      } catch (error) {
        return { status: false, error: data.message };
      }
    };
  }

  export function uploadRequest(payload, name) {
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
        data.append("file", payload.value[0], name);
        var tmp = await axios({
          method: 'post',
          url: response.url,
          data,
          headers: { "content-type": "application/x-www-form-urlencoded" }
        });
        var response2 = await api.sendRequest('post', '/upload/verify', null, { 'content-type': 'application/json' }, {
          key: response.fields.key
        }).then(response => response.data.data);
      } catch (error) {
        return 'request fail';
      }
      return { status: true, data: response2 };
    };
  }
  
  