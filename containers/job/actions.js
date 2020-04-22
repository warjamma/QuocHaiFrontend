import api from '../../services/api'
var qs = require('qs');

export function actionApproveJob(id) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('put', `/jobs/${id}/accepted`);
      return ({ ok: true, data: data });
    } catch (error) {
      const { data } = error.response
      return ({ ok: false, error: data.message });
    }
  };
}

export function actionRejectJob(id, body) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('put', `/jobs/${id}/reject`, null, null, body);
      return ({ ok: true, data: data });
    } catch (error) {
      const { data } = error.response
      return ({ ok: false, error: data.message });
    }
  };
}

export function getAllJobType(params) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/jobs/job_type?${qs.stringify(params)}`);
      return { status: true, data }
    } catch (error) {
      const { data } = error.response
    }
  };
}