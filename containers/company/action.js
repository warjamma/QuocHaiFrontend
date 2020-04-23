import api from '../../services/api';

const qs = require('qs');

export function createJob(payload) {
  return async () => {
    try {
      await api.sendRequestWithToken('post', '/jobs', null, null, payload);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}

export function updateJob(payload,id) {
  return async () => {
    try {
      await api.sendRequestWithToken('put', `/jobs/${id}`, null, { 'Content-type': 'application/json' }, payload);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}

export function deleteJob(payload) {
  return async () => {
    try {
      await api.sendRequestWithToken('delete', `/jobs/${payload}`, null, null, null);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}

export function getJobById(params) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/jobs/${params.id}`);
      dispatch({ type: "GET_JOB_BY_ID_SUCCESS", data });
      return { status: true, data };
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_JOB_BY_ID_FAILURE", error: data.message });
    }
  };
}

export function getListJob(params, companyId) {
    return async dispatch => {
      try {
        dispatch({ type: "GET_LIST_REQUEST" });
        const { data } = await api.sendRequestWithToken('get', `/companies/${companyId}/jobs?${qs.stringify(params)}`);
        return dispatch({ type: "GET_LIST_JOB_SUCCESS", data });
      } catch (error) {
        const { data } = error.response;
        return dispatch({ type: "GET_LIST_JOB_SUCCESS_FAILURE", error: data.message });
      }
    };
  }
  
export function getListCandidate(params, companyId) {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequestWithToken('get', `/companies/${companyId}/refers?${qs.stringify(params)}`);
      return dispatch({ type: "GET_LIST_CANDIDATE_SUCCESS", data });
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_LIST_CANDIDATE_SUCCESS_FAILURE", error: data.message });
    }
  };
}
export function updateStatusRef(referId, status, body) {
  return async () => {
    try {
      const { data } = await api.sendRequestWithToken('put', `/refers/${referId}/${status}`, null, null, body);
      return { status: true, data };
    } catch (error) {
      return { status: false, error: error.message };
    }
  };
}

export function uploadRequest(payload, name) {
  const body = { mim_type: "application/pdf" };
  const header = { "Content-Type": "application/json" };
  return async () => {
    try {
      const response = await api.sendRequest('post', '/upload/request', null, header, body)
        .then(response => response.data.presign_url);
      const body2 = response.fields;
      const data = new FormData();
      for (const property in body2) {
        data.append(`${property}`, `${body2[property]}`);
      }
      data.append("file", payload.value[0], name);
      const tmp = await axios({
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

export function getAllCompany(params) {
  return async () => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/companies/names?${qs.stringify(params)}`);
      return { status: true, data };
    } catch (error) {
      return { status: false, error };
    }
  };
}