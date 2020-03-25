
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { message } from 'antd';
import { get } from 'lodash';
import { clearError } from '../containers/profile/actions'
import './styles.scss';

function AuthLayout ({children, profile, dispatch}) {

  const error = (mess) => {
    message.error(mess);
  };
  console.log(children)
  useEffect(() => {
    if (get(profile, 'error', false) && (get(profile, 'message', ''))) {
      error(get(profile, 'message', ''));
      dispatch(clearError())
    }
  });
  
  return (
    <>
      <div className="container-box authenticate-page">
        {children}
      </div>
    </>
  )
};

function mapStateToProps(state) {
  const { profile } = state;
  return {
    profile
  };
}

export default connect(mapStateToProps, null)(AuthLayout)
