import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Button, Checkbox, Tabs, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginRequest } from '../../containers/profile/actions';

import { get } from 'lodash';
import './styles.scss';

const { TabPane } = Tabs;

const success = (mess) => {
  message.success(mess);
};

function Login(props) {
  const { dispatch, profile } = props;
  useEffect(() => {
    if (get(profile, 'data.token', '') && get(profile, 'data.recruiter.role', '') === 'superadmin') {
      success('Login successfully!');
      Router.push('/superadmin/job-list');
    }
  });

  const onFinish = async (values) => {
    await dispatch(loginRequest(values, 'admin'))
    if(get(profile, 'data.token', '') && get(profile, 'data.recruiter.role', '') === 'superadmin') {
      success('Login successfully!')
      Router.push('/superadmin/job-list');
    }
  };

  function FormLogin(props) {
    return (
      <Form
        name="normal_login"
        className="loginForm"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="User name"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password 
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item className="groupButtonLogin">
          <Button className="login-form-button buttonLogin" type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className="loginForm">
      <div className="loginLogo">
        <img src="/src_assets_images_logo.png" alt="logo" />
        <div>Super Admin</div>
      </div>
      <FormLogin />
    </div>
  );
}

function mapStateToProps(state) {
  const { profile } = state;
  return {
    profile
  };
}

export default connect(mapStateToProps)(Login);
