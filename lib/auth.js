/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { get } from 'lodash';
import Router, { withRouter } from 'next/router';
// import './auth.scss';

export function requireAuthentication(Component) {
  return class AuthenticatedComponent extends React.Component {
    /**
     * Check if the user is authenticated, this.props.isAuthenticated
     * has to be set from your application logic (or use react-redux to retrieve it from global state).
     */
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    componentDidMount() {
      if (!this.isAuthenticated()) {
          Router.push('/');
      }
      this.setState({ isLoading: false });
    }

    isAuthenticated() {
      const { profile, router } = this.props;
      const unPrivate = ['/candidates/[pid]/verify', '/login', '/register', '/verify', '/forgot-password', '/reset-password', '/', '/404', '/superadmin', '/403','/home-page/upload-candidate', '/home-page/upload-home','/home-page/upload-cv-home','/home-page/job-detail-home','/home-page/recuiterment','/home-page/company-detail-home','/home-page/company-list-home','/home-page/job-list-home'];
      return get(profile, 'data.accessToken', '') || unPrivate.includes(router.pathname);
    }


    /**
     * Render
     */
    render() {
      const loginErrorMessage = (
        <div className="loading-screen">
          <div className="loader-spinner" />
        </div>
      );
      
      return (
        <div>
          {this.state.isLoading ? (
            <div>LOADING....</div>
          ) : (
            <div>
              {this.isAuthenticated()  ? <Component {...this.props} /> : loginErrorMessage }
            </div>
          )}
        </div>
       
      );
    }
  };
}

export default withRouter(requireAuthentication);