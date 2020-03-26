import api from '../../services/api'


export function loginRequest(user, role) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequest('post', `/${role}/login`, null, null, user);
      dispatch({ type: "LOGIN_SUCCESS", data: data.data });
      localStorage.setItem('token', data.data.token)
    } catch (error) {
      const { data } = error.response
      return dispatch({ type: "LOGIN_FAILURE", error: data.message });
    }
  };
}

export function registerRequest(user, role) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequest('post', `/${role}/register`, null, null, user);
      return { status: true, data: data.data }
    } catch (error) {
      const { data } = error.response
      return { status: false, message: data.message };
    }
  };
}

export function forgotPassword(payload, role) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequest('post', `/${role}/forgot_password`, null, null, payload);
      return { status: true, data: data.data }
    } catch (error) {
      const { data } = error.response
      return dispatch({ type: "FORGOT_PASSWORD_FAILURE", error: data.message });
    }
  };
}

export function verifyRequest(role, id, payload) {
  return async dispatch => {
    try {
      const { data } = await api.sendRequest('post', `/${role}/${id}/verify`, null, null, payload);
      dispatch({ type: "LOGIN_SUCCESS", data: data.data });
      localStorage.setItem('token', data.data.token)
    } catch (error) {
      const { data } = error.response
      return dispatch({ type: "LOGIN_FAILURE", error: data.message });
    }
  };
}

export function clearError() {
  return async dispatch => {
    return dispatch({ type: "CLEAR_ERROR" });
  }
}

export function logOutRequest() {
  return async dispatch => {
    localStorage.setItem('token', '')
    return dispatch({ type: "LOG_OUT" });
  }
}