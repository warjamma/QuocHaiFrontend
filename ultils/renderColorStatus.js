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
    default:
      return 'orange';
  }
}