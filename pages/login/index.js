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
  const [role, setRole] = useState('employers');

  useEffect(() => {
    if (get(profile, 'data.token', '')) {
      success('Login successfully!');
      Router.push(role === 'employers' ? '/company/job-list' : '/referrer');
    }
  });

  const onFinish = async (values) => {
    await dispatch(loginRequest(values, role))
    console.log(get(profile, 'data.token', ''))
    if(get(profile, 'data.token', '')) {
      success('Login successfully!');
      Router.push(role === 'employers' ? '/company/job-list' : '/referrer');
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
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
          <Link href="/forgot-password">
            <a className="login-form-forgot">Forgot password</a>
          </Link>
        </Form.Item>
        <Form.Item className="groupButtonLogin">
          <Button className="login-form-button buttonLogin" type="primary" htmlType="submit">
            Log in
          </Button>
          Or <Link href="/register"><a>register now!</a></Link>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className="loginForm">
      <div className="loginLogo">
        <img src="/src_assets_images_logo.png" alt="logo" />
        <div>Login</div>
      </div>
      <Tabs defaultActiveKey={role} onChange={(e) => {
        setRole(e)
      }}>
        <TabPane tab="As Company" key="employers">
          <FormLogin />
        </TabPane>
        <TabPane tab="As Referrer" key="recruiters">
          <FormLogin />
        </TabPane>
      </Tabs>
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
