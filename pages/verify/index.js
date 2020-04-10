import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Router from 'next/router';
import { Form, Input, Button, Tabs, message } from 'antd';
import { ExceptionOutlined, LockOutlined } from '@ant-design/icons';
import { verifyRequest } from '../../containers/profile/actions';
import './styles.scss'

import Link from 'next/link'

const success = (mess) => {
  message.success(mess);
};

function Verify (props) {
  const { dispatch, router } = props
  const { query } = router;

  useEffect(() => {
    const { query } = router;
    if (localStorage.getItem('token')) {
      Router.push(query.role === 'employers' ? '/company' : '/referrer');
    }
  });

  const onFinish = async (values) => {
    const res = await dispatch(verifyRequest(query.role, query.id, values))
    if(localStorage.getItem('token')) {
      success('Login successfully!')
      Router.push(query.role === 'employers' ? '/company' : '/referrer');
    }
  };

  return (
    <div className="registerForm" style={{width: '300px'}}>
      <div className="loginLogo">
        <img src="/src_assets_images_logo.png" alt="logo" />
        <div>Verify Account</div>
      </div>
      <Form
        name="normal_login"
        className="loginForm"
        onFinish={onFinish}
        initialValues={{ verify_token: query.verify_token }}
      >
        <Form.Item
          name="verify_token"
        >
          <Input 
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={query.verify_token}
            disabled
          />
        </Form.Item>
        <Form.Item className="groupButtonLogin">
          <Button className="login-form-button" type="primary" htmlType="submit">
            Verify Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

Verify.getInitialProps = async function({ reduxStore }) {
  return {}
}

export default connect(null, null)(withRouter(Verify))
