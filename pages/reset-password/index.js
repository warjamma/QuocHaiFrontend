import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { ExceptionOutlined, LockOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import './styles.scss';

function ResetPassword(props) {
  const { location } = props;

  const onFinish = values => {
    console.log(values);
  };

  return (
    <div className="resetPasswordForm">
      <div className="loginLogo">
        <img src="/src_assets_images_logo.png" alt="logo" />
        <div>Reset Password</div>
      </div>
      <Form
        name="normal_login"
        className="loginForm"
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
        <Form.Item className="groupButtonLogin">
          <Button className="login-form-button buttonLogin" type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect()(ResetPassword);
