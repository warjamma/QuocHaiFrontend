import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Tabs, Col } from 'antd';
import { ExceptionOutlined, LockOutlined } from '@ant-design/icons';
import styles from './styles.scss';

const { TabPane } = Tabs;

function ResetPassword(props) {
  const [role, setRole] = useState('employers');
  const { dispatch } = props

  useEffect(() => {
  });

  const onFinish = values => {
    const { dispatch } = props;
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
      >
        <Form.Item
          name="reset_code"
          rules={[
            {
              required: true,
              message: 'Please input your Reset Code!',
            },
          ]}
        >
          <Input
            prefix={<ExceptionOutlined className="site-form-item-icon" />}
            placeholder="Reset Code"
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
