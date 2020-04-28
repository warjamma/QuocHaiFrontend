
export const exampleInitialState = {
  list_job: null,
  list_referred: null,
  candidate_detail: null,
  job_detail: null,
  is_loading: false,
  company_detail:null,
  recruiter_detail:null,
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
    case 'GET_JOB_BY_ID_SUCCESS':
      return {
        ...state,
        ...{ job_detail: action.data },
      };
    case 'GET_JOB_BY_ID_FAILURE':
      return {
        ...state,
        ...{ job_detail: [] },
      };
    case 'GET_COMPANY_BY_ID_SUCCESS':
      return {
        ...state,
        ...{ company_detail: action.data },
      };
    case 'GET_COMPANY_BY_ID_FAILURE':
      return {
        ...state,
        ...{ company_detail: [] },
      };
    case 'GET_LIST_REFERRED_SUCCESS':
      return {
        ...state,
        ...{ list_referred: action.data, is_loading: false },
      };
    case 'GET_LIST_REFERRED_FAILURE':
      return {
        ...state,
        ...{ list_referred: [], is_loading: false },
      };
    case 'GET_CANDIDATE_BY_ID_SUCCESS':
      return {
        ...state,
        ...{ candidate_detail: action.data },
      };
    case 'GET_CANDIDATE_BY_ID_FAILURE':
      return {
        ...state,
        ...{ candidate_detail: [] },
      };
      case 'GET_RECRUITERS_BY_ID_SUCCESS':
        return {
          ...state,
          ...{ recruiter_detail: action.data },
        };
      case 'GET_RECRUITERS_BY_ID_FAILURE':
        return {
          ...state,
          ...{ recruiter_detail: [] },
        }; 
    default:
      return state;
  }
};
