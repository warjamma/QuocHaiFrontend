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