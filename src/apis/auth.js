import APIService from '../services/APIService';

const Auth = {
  SignIn: (user, role) =>
    APIService.sendRequest('post', `/${role}/login`, null, null, user),
  SignUp: (user, role) =>
    APIService.sendRequest('post', `/${role}/register`, null, null, user),
  VerifyUser: (user, role) =>
    APIService.sendRequest('post', `/${role}/${user.employer_id}/verify`, null, null, {'verify_token': user.verify_token}),
  ResetPassword: (payload, role) =>
    APIService.sendRequest('post', `/${role}/reset_password`, null, null, payload),
  ForgetPassword: (payload, role) =>
    APIService.sendRequest('post', `/${role}/forget_password`, null, null, payload),
};

export default Auth;
