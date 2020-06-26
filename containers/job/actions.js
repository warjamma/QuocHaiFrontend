import api from '../../services/api';

const qs = require('qs');

export function actionApproveJob(id) {
  return async () => {
    try {
      const { data } = await api.sendRequestWithToken('put', `/jobs/${id}/accepted`);
      return ({ ok: true, data });
    } catch (error) {
      const { data } = error.response;
      return ({ ok: false, error: data.message });
    }
  };
}

export function actionRejectJob(id, body) {
  return async () => {
    try {
      const { data } = await api.sendRequestWithToken('put', `/jobs/${id}/reject`, null, null, body);
      return ({ ok: true, data });
    } catch (error) {
      const { data } = error.response;
      return ({ ok: false, error: data.message });
    }
  };
}

export function getAllJobType(params) {
  return async () => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/jobs/job_type?${qs.stringify(params)}`);
      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  };
}

export function getListJob(params) {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequest('get', `/jobs?${qs.stringify(params)}`,null,{"Authorization":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjM2NWJiZjU4LWE3ZGEtNGNlNi05MzQ1LWQ2OTQyMTk5YWQxNiIsImlhdCI6MTU5MzEzOTk1NCwicm9sZSI6InJlY3J1aXRlciJ9.4j41aWyIah1LLK9rogUqgxcZImHE0fDsbqc4oYzGhbs"});
      dispatch({ type: "GET_LIST_JOB_SUCCESS", data });
      return { status: true, data };
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_LIST_JOB_FAILURE", error: data.message });
    }
  };
}
export function getJobById(params) {
  // console.log('params', params);
  return async dispatch => {
    try {
      const { data } = await api.sendRequest('get', `/jobs/${params.id}`,null,{"Authorization":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjgyNDhjNWM0LTUwNzgtNDI2ZS05NmQ3LWY0Y2UwMGRhMmY5MyIsImlhdCI6MTU5MTYxMDY4Mywicm9sZSI6ImVtcGxveWVyIn0.fTpZvcvQgFFfsEdfXBe_qTSjvP1eqnyXBdNl_GBwl9g"});
      dispatch({ type: "GET_JOB_BY_ID_SUCCESS", data });
      return { status: true, data };
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_JOB_BY_ID_FAILURE", error: data.message });
    }
  };
}