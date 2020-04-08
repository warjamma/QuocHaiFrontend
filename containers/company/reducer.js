
export const exampleInitialState = {
  list_job: null,
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
