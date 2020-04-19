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
      super(props)
      this.state = {
        isLoading: true,
      }
    }

    componentDidMount() {
      if (!this.isAuthenticated()) {
        Router.push('/login')
      }
      this.setState({ isLoading: false })
    }

    isAuthenticated() {
      const { profile, router } = this.props
      const unPrivate = ['/candidates/[pid]/verify', '/login', '/register', '/verify', '/forgot-password', '/reset-password', '/', '/404', '/superadmin', '/403']
      return get(profile, 'data.token', '') || unPrivate.includes(router.pathname);
    }
    /**
     * Render
     */
    render() {
      const loginErrorMessage = (
        <div className="loading-screen">
          <div className="loader-spinner">
          </div>
        </div>
      );
      
      return (
        <div>
          {this.state.isLoading ? (
            <div>LOADING....</div>
          ) : (
            <div>
              {this.isAuthenticated() ? <Component {...this.props} /> : loginErrorMessage }
            </div>
          )}
        </div>
       
      );
    }
  };
}

export default withRouter(requireAuthentication);