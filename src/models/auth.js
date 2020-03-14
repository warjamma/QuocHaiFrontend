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
      } catch (error) {
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
    clearError(state, action) {
      return {
        userProfile: {},
        isError: false,
        message: '',
      }
    }
  },
};