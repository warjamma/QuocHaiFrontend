import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './styles.scss';

export default function Login(props) {
  // const [count, setCount] = useState(0);
  const { history } = props;

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };


  return (
    <div>
      <Form
        name="normal_login"
        className={"login-form", styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div className={styles.loginLogo}>
          <img src={require("../../assets/images/logo.svg")} alt="logo" />
          <div>Ant Design Pro</div>
        </div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
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
          <Button onClick={() => history.push("/dashboard")} className={"login-form-button", styles.buttonLogin}  type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}