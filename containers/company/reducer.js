
export const exampleInitialState = {
  list_job: [],
  list_candidate: [],
  is_loading: false,
  job_detail:null,
}

export default (state = exampleInitialState, action) => {
  switch (action.type) {
    case 'GET_LIST_REQUEST':
      return {
        ...state,
        ...{ is_loading: true },
      }
    case 'GET_LIST_JOB_SUCCESS':
      return {
        ...state,
        ...{ list_job: action.data, is_loading: false },
      }
    case 'GET_LIST_JOB_FAILURE':
      return {
        ...state,
        ...{ list_job: [], is_loading: false },
      }
    case 'GET_LIST_CANDIDATE_SUCCESS':
      return {
        ...state,
        ...{ list_candidate: action.data, is_loading: false },
      }
    case 'GET_LIST_CANDIDATE_FAILURE':
      return {
        ...state,
        ...{ list_candidate: [], is_loading: false },
      }
    case 'CREATE_JOB_SUCCESS':
      return {
        ...state,
        ...{ list_job: action.data },
      }
    case 'CREATE_JOB_FAILURE':
      return {
        ...state,
        ...{ list_job: [] },
      }
    case 'GET_JOB_BY_ID_SUCCESS':
      return {
        ...state,
        ...{ job_detail: action.data },
      }
    case 'GET_JOB_BY_ID_FAILURE':
      return {
        ...state,
        ...{ job_detail: [] },
      }
    default:
      return state
  }
}
