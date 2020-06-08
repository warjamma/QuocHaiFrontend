import api from '../../services/api';

const qs = require('qs');

export function updateProfile(payload, id) {
  return async () => {
    try {
      await api.sendRequestWithToken('put', `/companies/${id}`, null, { 'Content-type': 'application/json' }, payload);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}
export function getProfileById(params) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/companies/${params.id}`);
      dispatch({ type: "GET_COMPANY_BY_ID_SUCCESS", data });
      return { status: true, data };
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_COMPANY_BY_ID_FAILURE", error: data.message });
    }
  };
}


export function createJob(payload) {
  return async () => {
    try {
      const {data} = await api.sendRequestWithToken('post', '/jobs', null, null, payload);
      return { status: true ,data};
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}

export function updateJob(payload, id) {
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

export function getListEmployers(id) {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequestWithToken('get', `/companies/${id}/employers`);
      return dispatch({ type: "GET_LIST_EMPLOYERS_SUCCESS", data });
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_LIST_EMPLOYERS_FAILURE", error: data.message });
    }
  };
}
export function createEmployer(payload,company_id) {
  return async () => {
    try {
      await api.sendRequestWithToken('post', `/companies/${company_id}/employers`, null, null,payload);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}

export function getHistory() {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequestWithToken('get', `/histories`);
      return dispatch({ type: "GET_LIST_HISTORYS_SUCCESS", data });
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_LIST_HISTORYS_FAILURE", error: data.message });
    }
  };
}

