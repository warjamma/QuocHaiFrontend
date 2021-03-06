
export const exampleInitialState = {
  list_job: [],
  list_candidate: [],
  list_employers: [],
  list_historys: [],
  is_loading: false,
  job_detail: null,
  comapny_detail:null,
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
    case 'GET_LIST_CANDIDATE_SUCCESS':
      return {
        ...state,
        ...{ list_candidate: action.data, is_loading: false },
      };
    case 'GET_LIST_CANDIDATE_FAILURE':
      return {
        ...state,
        ...{ list_candidate: [], is_loading: false },
      };
    case 'CREATE_JOB_SUCCESS':
      return {
        ...state,
        ...{ list_job: action.data },
      };
    case 'CREATE_JOB_FAILURE':
      return {
        ...state,
        ...{ list_job: [] },
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
        ...{ comapny_detail: [] },
      };
      case 'GET_LIST_EMPLOYERS_SUCCESS':
      return {
        ...state,
        ...{ list_employers: action.data, is_loading: false },
      };
    case 'GET_LIST_EMPLOYERS_FAILURE':
      return {
        ...state,
        ...{ list_employers: [], is_loading: false },
      };
      case 'GET_LIST_HISTORYS_SUCCESS':
      return {
        ...state,
        ...{ list_historys: action.data, is_loading: false },
      };
    case 'GET_LIST_HISTORYS_FAILURE':
      return {
        ...state,
        ...{ list_historys: [], is_loading: false },
      };
    default:
      return state;
  }
};
