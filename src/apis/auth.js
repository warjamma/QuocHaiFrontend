import APIService from '../services/APIService';

const Auth = {
  SignIn: (user, role) =>
    APIService.sendRequest('post', `/${role}/login`, null, null, user),
  SignUp: (user, role) =>
    APIService.sendRequest('post', `/${role}/register`, null, null, user),
  VerifyUser: (user, role) =>
    APIService.sendRequest('post', `/${role}/${user.employer_id}/verify`, null, null, {'verify_token': user.verify_token}),
};

export default Auth;
