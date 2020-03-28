import api from '../../services/api'
var qs = require('qs');

export function getListJob(params) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/jobs?${qs.stringify(params)}`);
      dispatch({ type: "GET_LIST_JOB_SUCCESS", data: data });
    } catch (error) {
      const { data } = error.response
      return dispatch({ type: "GET_LIST_JOB_SUCCESS_FAILURE", error: data.message });
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