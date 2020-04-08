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

export function getListJob(params, companyId) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/companies/${companyId}/jobs?${qs.stringify(params)}`);
      dispatch({ type: "GET_LIST_JOB_SUCCESS", data: data });
    } catch (error) {
      const { data } = error.response
      return dispatch({ type: "GET_LIST_JOB_SUCCESS_FAILURE", error: data.message });
    }
  };
}
