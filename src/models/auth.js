import auth from '../apis/auth'

export default {
  namespace: 'auth',
  state: {
    userProfile: {},
    isError: false,
    message: '',
  },

  effects: {
    *logout({}, { put }) {
      yield put({ type: 'logoutRequest' });
      localStorage.setItem('token', '');
    },
    *login({ payload: values, role }, { call, put }) {
      try {
        const { data } = yield call(auth.SignIn, values, role);
        yield put({ type: 'loginSuccess', payload: data.data });
        localStorage.setItem('token', data.data.token)
      } catch (error) {
        const { data } = error.response
        yield put({ type: 'loginFailure', payload: data.message });
      }
    },
    *register({ payload: values, role }, { call, put }) {
      try {
        yield put({ type: 'registerRequest' });
        const { data } = yield call(auth.SignUp, values, role);
        yield put({ type: 'loginSuccess', payload: data.data });
        return data.data;
      } catch (error) {
        const { data } = error.response
        yield put({ type: 'registerFailure', payload: data.message });
      }
    },
    *verifyUser({ payload: res, role }, { call, put }) {
      try {
        const { data } = yield call(auth.VerifyUser, res, role);
        yield put({ type: 'loginSuccess', payload: data.data });
        localStorage.setItem('token', data.data.token)
      } catch (error) {
      }
    },
    *forgetPassword({ payload: values, role }, { call, put }) {
      try {
        const { data } = yield call(auth.ForgetPassword, values, role);
        yield put({ type: 'forgetPasswordSuccess', payload: data.data });
        return data.data;
      } catch (error) {
        const { data } = error.response
        yield put({ type: 'forgetPasswordFailure', payload: data.message });
      }
    },
    *resetPassword({ payload: values, role }, { call, put }) {
      try {
        const { data } = yield call(auth.ResetPassword, values, role);
        yield put({ type: 'resetPasswordSuccess', payload: data.data });
        return data;
      } catch (error) {
        const { data } = error.response
        yield put({ type: 'resetPasswordFailure', payload: data.message });
      }
    },
    *clear({}, { put }) {
      yield put({ type: 'clearError' });
    },
  },

  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        ...{ 'userProfile': action.payload, isError: false }
      };
    },
    registerRequest() {
      return {
        userProfile: {},
        isError: false
      };
    },
    registerFailure(state, action) {
      return {
        userProfile: {},
        isError: true,
        message: action.payload
      };
    },
    loginFailure(state, action) {
      return {
        userProfile: {},
        isError: true,
        message: action.payload
      };
    },
    logoutRequest(state, action) {
      return {
        userProfile: {},
        isError: false,
        message: '',
      }
    },
    forgetPasswordSuccess(state, action) {
      return {
        ...state,
      }
    },
    forgetPasswordFailure(state, action) {
      return {
        userProfile: {},
        isError: true,
        message: action.payload,
      }
    },
    resetPasswordSuccess(state, action) {
      return {
        ...state,
      }
    },
    resetPasswordFailure(state, action) {
      return {
        userProfile: {},
        isError: true,
        message: action.payload,
      }
    },
    clearError(state, action) {
      return {
        ...state,
        isError: false,
        message: '',
      }
    }
  },
};