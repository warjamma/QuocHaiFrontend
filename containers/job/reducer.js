
export const exampleInitialState = {
    list_job: null,
  };
  
  export default (state = exampleInitialState, action) => {
    switch (action.type) {
      case 'GET_LIST_REQUEST':
        return {
          ...state,
          ...{ is_loading: true },
        };
      case 'GET_LIST_JOB_SUCCESS':
        return {
          ...state,
          ...{ list_job: action.data, is_loading: false },
        };
      case 'GET_LIST_JOB_FAILURE':
        return {
          ...state,
          ...{ list_job: [], is_loading: false },
        };
      default:
        return state;
    }
  };
  