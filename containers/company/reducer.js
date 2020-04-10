
export const exampleInitialState = {
  list_job: [],
  list_candidate: [],
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
    case 'GET_LIST_CANDIDATE_SUCCESS':
      return {
        ...state,
        ...{ list_candidate: action.data },
      }
    case 'GET_LIST_CANDIDATE_FAILURE':
      return {
        ...state,
        ...{ list_candidate: [] },
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
    default:
      return state
  }
}
