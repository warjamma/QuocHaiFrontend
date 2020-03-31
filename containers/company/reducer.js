
export const exampleInitialState = {
}

export default (state = exampleInitialState, action) => {
  switch (action.type) {
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
