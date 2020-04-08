
export const exampleInitialState = {
  list_job: null,
  list_referred: null,
  job_detail:null,
}

export default (state = exampleInitialState, action) => {
  switch (action.type) {
    case 'GET_LIST_JOB_SUCCESS':
      return {
        ...state,
        ...{ list_job: action.data },
      }
    case 'GET_LIST_JOB_FAILURE':
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
    case 'GET_LIST_REFERRED_SUCCESS':
      return {
        ...state,
        ...{ list_referred: action.data },
      }
    case 'GET_LIST_REFERRED_FAILURE':
      return {
        ...state,
        ...{ list_referred: [] },
      }
    default:
      return state
  }
}
