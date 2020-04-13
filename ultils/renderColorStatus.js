export default (status) => {
  switch(status) {
    case 'accepted':
      return 'blue';
      break;
    case 'reject':
      return 'red';
      break;
    case 'on_board':
      return 'green';
      break;
    case 'probation':
      return 'green';
      break;
    default:
      return 'orange';
      break;
  }
}