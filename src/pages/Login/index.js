import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Tabs, Col, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './styles.scss';

const warning = (mes) => {
  message.error(mes);
};

const { TabPane } = Tabs;

function Login(props) {
  const [role, setRole] = useState('employers');
  const { dispatch } = props

  useEffect(() => {
    const { userProfile, history, isError, message } = props;
    if (localStorage.getItem('token')) {
      history.push('/dashboard');
    }
    if (isError) {
      warning(message);
    }
  });

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'auth/login',
      payload: values,
      role,
    });
  };

  function FormLogin(props) {
    return (
      <Form
        name="normal_login"
        className={styles.loginForm}
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
          <a className="login-form-forgot" href="/register">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item className={styles.groupButtonLogin}>
          <Button className={"login-form-button", styles.buttonLogin} type="primary" htmlType="submit">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className={styles.loginForm}>
      <div className={styles.loginLogo}>
        <img src={require("../../assets/images/logo.png")} alt="logo" />
        <div>Login</div>
      </div>
      <Tabs defaultActiveKey={role} onChange={(e) => {
        setRole(e)
        dispatch({type: 'auth/clear'})
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
  const { userProfile, isError, message } = state.auth;
  return {
    userProfile,
    isError,
    message,
  };
}

export default connect(mapStateToProps)(Login);
