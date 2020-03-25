
export const exampleInitialState = {
  error: false,
  message: '',
  data: null,
}

export default (state = exampleInitialState, action) => {
  switch (action.type) {
    case 'LOGIN_FAILURE':
      return {
        ...state,
        ...{ error: true,
          message: action.error
        },
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...{ data: action.data },
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        ...{ error: false, message: ''}
      }
    case 'LOG_OUT':
      return {
        error: false,
        message: '',
        data: null
      }
    case 'FORGOT_PASSWORD_FAILURE':
      return {
        ...state,
        ...{ error: true, message: action.error }
      }
    default:
      return state
  }
}
