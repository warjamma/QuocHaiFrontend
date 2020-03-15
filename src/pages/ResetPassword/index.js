import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Tabs, message } from 'antd';
import { ExceptionOutlined, LockOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import styles from './styles.scss';

const { TabPane } = Tabs;

const warning = (mes) => {
  message.success(mes);
};

function ResetPassword(props) {
  const { dispatch, location, isError, history } = props

  useEffect(() => {
    console.log(location)
  });

  const onFinish = values => {
    dispatch({
      type: 'auth/resetPassword',
      payload: {
        ...values,
        id: get(location, 'state.id', ''),
      },
      role: get(location, 'state.role', ''),
    }).then(() => {
      if (!isError) {
        warning('Reset Password Successfully');
        history.push('/login');
      }
    })
  };

  return (
    <div className={styles.resetPasswordForm}>
      <div className={styles.loginLogo}>
        <img src={require("../../assets/images/logo.png")} alt="logo" />
        <div>Reset Password</div>
      </div>
      <Form
        name="normal_login"
        className={styles.loginForm}
        onFinish={onFinish}
        initialValues={{
          reset_code: get(location, 'state.reset_code', ''),
        }}
      >
        <Form.Item
          name="reset_code"
        >
          <Input
            prefix={<ExceptionOutlined className="site-form-item-icon" />}
            placeholder="Reset Code"
            disabled
          />
        </Form.Item>
        <Form.Item
          name="new_password"
          rules={[{ required: true, message: 'Please input your New Password!' }]}
        >
          <Input.Password 
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="New Password"
          />
        </Form.Item>
        <Form.Item className={styles.groupButtonLogin}>
          <Button className={"login-form-button", styles.buttonLogin} type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
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

export default connect(mapStateToProps)(ResetPassword);
