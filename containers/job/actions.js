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
      const { data } = await api.sendRequest('get', `/jobs?${qs.stringify(params)}`,null,{"Authorization":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjgyNDhjNWM0LTUwNzgtNDI2ZS05NmQ3LWY0Y2UwMGRhMmY5MyIsImlhdCI6MTU5MTYxMDY4Mywicm9sZSI6ImVtcGxveWVyIn0.fTpZvcvQgFFfsEdfXBe_qTSjvP1eqnyXBdNl_GBwl9g"});
      return dispatch({ type: "GET_LIST_JOB_SUCCESS", data });
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_LIST_JOB_FAILURE", error: data.message });
    }
  };
}