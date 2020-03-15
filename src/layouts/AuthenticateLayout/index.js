import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { message } from 'antd';

const warning = (mes, props) => {
  const { dispatch } = props;
  message.error(mes);
  dispatch({type: 'auth/clear'});
};

function AuthenticateLayout(props) {

  useEffect(() => {
    const { isError, message } = props;
    if (isError) {
      warning(message, props);
    }
  });

  return (
    <div className={styles.authenticatePage}>
      {props.children}
    </div>
  );
}

function mapStateToProps(state) {
  const { userProfile, isError, message } = state.auth;
  return {
    userProfile,
    isError,
    message,
  };
}

export default connect(mapStateToProps)(AuthenticateLayout);
