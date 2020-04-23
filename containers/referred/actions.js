import { get } from 'lodash';
import api from '../../services/api';

const qs = require('qs');
const axios = require('axios');

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

export function getCandidateById(params) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequestWithToken('get', `/candidates/${params.id}`);
      return dispatch({ type: "GET_CANDIDATE_BY_ID_SUCCESS", data });
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

export function uploadRequest(payload, name) {
  const body = { mim_type: "application/pdf" };
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
