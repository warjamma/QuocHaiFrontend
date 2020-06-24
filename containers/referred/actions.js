import { get } from 'lodash';
import api from '../../services/api';

const qs = require('qs');
const axios = require('axios');

export function updateProfile(payload, id) {
  return async () => {
    try {
      await api.sendRequestWithToken('put', `/recruiters/me`, null, { 'Content-type': 'application/json' }, payload);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}
export function getProfileByIdRef(params) {
  
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/recruiters/me`);
      dispatch({ type: "GET_RECRUITERS_BY_ID_SUCCESS", data });
      return { status: true, data };
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_RECRUITERS_BY_ID_FAILURE", error: data.message });
    }
  };
}
export function getCountMyRefer() {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequestWithToken('get', `/recruiters/me/jobs?`);
      return dispatch({ type: "GET_COUNT_MY_REFER_SUCCESS", data });
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_COUNT_MY_REFER_FAILURE", error: data.message });
    }
  };
}

export function getListCompany(params) {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequestWithToken('get', `/companies?${qs.stringify(params)}`);
      return dispatch({ type: "GET_LIST_COMPANY_SUCCESS", data });
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_LIST_COMPANY_FAILURE", error: data.message });
    }
  };
}

export function getCompanyById(params) {
  // console.log('params', params);
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
export function getCompanyById2(params) {
  // console.log('params', params);
  return async dispatch => {
    try {
      const { data } = await api.sendRequest('get', `/companies/${params.id}`,null,{"Authorization":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ5ODIwZGMwLTIwOWMtNDUyMC05MWExLWY0NGRiOTBhNjNiYyIsImlhdCI6MTU5Mjk4Mzg4Miwicm9sZSI6ImFkbWluIn0.Oe0b3uNn3imBarJRR2nazOWTsWJOwLN23GmITnmGDp4"});
      dispatch({ type: "GET_COMPANY_BY_ID_SUCCESS", data });
      return { status: true, data };
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_COMPANY_BY_ID_FAILURE", error: data.message });
    }
  };
}
export function getListJob(params) {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequestWithToken('get', `/jobs?${qs.stringify(params)}`);
      return dispatch({ type: "GET_LIST_JOB_SUCCESS", data });
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
      const { data } = await api.sendRequestWithToken('get', `/jobs/${params.id}`);
      dispatch({ type: "GET_JOB_BY_ID_SUCCESS", data });
      return { status: true, data };
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_JOB_BY_ID_FAILURE", error: data.message });
    }
  };
}

export function getListReferred(params) {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequestWithToken('get', `/recruiters/me/refer?${qs.stringify(params)}`);
      return dispatch({ type: "GET_LIST_REFERRED_SUCCESS", data });
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_LIST_REFERRED_FAILURE", error: data.message });
    }
  };
}

export function getListReferredOfSuper(params) {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequestWithToken('get', `/refers?${qs.stringify(params)} `);
      return dispatch({ type: "GET_LIST_REFERRED_SUPER_SUCCESS", data });
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_LIST_REFERRED_SUPER_FAILURE", error: data.message });
    }
  };
}
export function getListCandidates(params) {
  return async dispatch => {
    try {
      dispatch({ type: "GET_LIST_REQUEST" });
      const { data } = await api.sendRequestWithToken('get', `/candidates?${qs.stringify(params)}`);
      return dispatch({ type: "GET_LIST_CANDIDATES_SUCCESS", data });
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_LIST_CANDIDATES_FAILURE", error: data.message });
    }
  };
}

export function createCandidate(payload, idJob) {
  return async () => {
    try {
      api.sendRequestWithToken('post', '/candidates', null, null, payload).then(response => {
        api.sendRequestWithToken('post', '/refers', null, { 'Content-Type': 'application/json' }, { "job_id": idJob, "candidate_id": response.data.data.candidate.id });
      });
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}
export function referCandidateForCompany(payload) {
  return async () => {
    try {
      api.sendRequestWithToken('post', '/refers', null, { 'Content-Type': 'application/json' }, { "job_id": payload.job_id, "candidate_id": payload.id },);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}
export function createCandidateNoAddJob(payload) {
  return async () => {
    try {
      api.sendRequestWithToken('post', '/admin/candidates', null, {"accept": "application/json"}, payload,);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}
export function createCandidateAddJob(payload, idJob) {
  return async () => {
    try {
      api.sendRequestWithToken('post', '/admin/candidates', null,  {"accept": "application/json"}, payload).then(response => {
        api.sendRequestWithToken('post', '/refers', null, { 'Content-Type': 'application/json' }, { "job_id": idJob, "candidate_id": response.data.data.candidate.id });
      });
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}
export function getCandidateById(params) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/candidates/${params.id}`);
      dispatch({ type: "GET_CANDIDATE_BY_ID_SUCCESS", data });
      return { status: true, data };
    } catch (error) {
      const { data } = error.response;
      return dispatch({ type: "GET_CANDIDATE_BY_ID_FAILURE", error: data.message });
    }
  };
}

export function updateCandidate(payload,id) {
  return async () => {
    try {
      await api.sendRequestWithToken('put', `/candidates/${id}`, null, { 'Content-type': 'application/json' }, payload);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}

export function deleteCandidate(payload) {
  return async () => {
    try {
      await api.sendRequestWithToken('delete', `/candidates/${payload}`, null, null, null);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}
export function deleteCandidateOfSuper(payload) {
  return async () => {
    try {
      await api.sendRequestWithToken('delete', `/candidates/${payload}`, null, null, null);
      return { status: true };
    } catch (error) {
      const { data } = error.response;
      return { status: false, error: data.message };
    }
  };
}

export function uploadRequest(payload, name) {
  const body = { mim_type: "application/pdf" };
  const header = { "Content-Type": "application/json" };
  return async dispatch => {
    try {
      const response = await api.sendRequest('post', '/upload/request', null, header, body)
        .then(response => response.data.presign_url);
      const body2 = response.fields;
      const data = new FormData();
      // eslint-disable-next-line guard-for-in
      for (const property in body2) {
        data.append(`${property}`, `${body2[property]}`);
      }
      data.append("file", get(payload, 'value.originFileObj', ''), name);
      const tmp = await axios({
        method: 'post',
        url: response.url,
        data,
        headers: { "content-type": "application/x-www-form-urlencoded" }
      });
      const response2 = await api.sendRequest('post', '/upload/verify', null, { 'content-type': 'application/json' }, {
        key: response.fields.key
      // eslint-disable-next-line no-shadow
      }).then(response => response.data.data);
      return { status: true, data: response2 };
    } catch (error) {
      return { status: false, error: 'Fail to upload' };;
    }
  };
}

export function uploadRequestImg(payload, name) {
  const body = { mim_type: "image/jpeg" };
  const header = { "Content-Type": "application/json" };
  return async dispatch => {
    try {
      const response = await api.sendRequest('post', '/upload/request', null, header, body)
        .then(response => response.data.presign_url);
      const body2 = response.fields;
      const data = new FormData();
      for (const property in body2) {
        data.append(`${property}`, `${body2[property]}`);
      }
      data.append("file", get(payload, 'value.originFileObj', ''), name);
      const tmp = await axios({
        method: 'post',
        url: response.url,
        data,
        headers: { "content-type": "application/x-www-form-urlencoded" }
      });
      const response2 = await api.sendRequest('post', '/upload/verify', null, { 'content-type': 'application/json' }, {
        key: response.fields.key
      }).then(response => response.data.data);
      return { status: true, data: response2 };
    } catch (error) {
      return { status: false, error: 'Fail to upload' };;
    }
  };
}

