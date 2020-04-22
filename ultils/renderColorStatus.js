export default (status) => {
  switch(status) {
    case 'accepted':
    case 'active':
      return 'blue';
    case 'reject':
    case 'cancelled':
      return 'red';
    case 'on_board':
      return 'green';
    case 'probation':
      return 'green';
    case 'interview_failed':
      return 'red';
    case 'probation_failed':
      return 'red';
    default:
      return 'orange';
  }
}