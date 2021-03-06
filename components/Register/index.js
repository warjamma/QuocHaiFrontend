/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Tabs, Select, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Router from 'next/router';
import { get } from 'lodash';
import { registerRequest } from '../../containers/profile/actions';
import './styles.scss';

const { TabPane } = Tabs;

const { Option } = Select;

const formItemLayout = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 8 },
  // },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const success = (mess) => {
  message.success(mess);
};

const error = (mess) => {
  message.error(mess);
};

function Register(props) {
  const { dispatch } = props;
  const [role, setRole] = useState('employers');

  const onFinish = async (values) => {
    await dispatch(registerRequest(values, role)).then((res) => {
      if (!res.status) {
        return error(res.message);
      }
      success(get(res, 'data.message', '').toUpperCase());
      return Router.push(`/login`);
    });
  };

  function FormRegister() {
    const { children } = props;
    return (
      <Form
        {...formItemLayout}
        name="normal_login"
        className="customForm"
        onFinish={onFinish}
      >
        {children}
        <Form.Item className="groupButtonLogin">
          <Button className="buttonLogin" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }

  return (
    <div className="registerForm">
      <Tabs
        defaultActiveKey={role}
        onChange={(e) => {
          setRole(e);
        }}
      >
        <TabPane tab="As Company" key="employers">
          <>
            <Form
              {...formItemLayout}
              name="normal_login"
              className="customForm"
              onFinish={onFinish}
            >
              <Form.Item
                className="company_name"
                name="company_name"
                // label="Company Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Company Name!',
                  },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Company name"
                />
              </Form.Item>
              <Form.Item
                className="full_name"
                name="full_name"
                // label="Full Name"
                rules={[
                  { required: true, message: 'Please input your Full Name!' },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Full name"
                />
              </Form.Item>
              <Form.Item
                className="email"
                name="email"
                // label="Email"
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
                hasFeedback
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                className="password"
                name="password"
                // label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                className="phone_number"
                name="phone_number"
                // label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Phone Number!',
                  },
                ]}
                hasFeedback
              >
                <Input  style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="agreement" valuePropName="checked">
                <Checkbox>I have read the agreement</Checkbox>
              </Form.Item>
              <Form.Item className="groupButtonLogin">
                <Button
                  className="buttonLogin"
                  type="primary"
                  htmlType="submit"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </>
        </TabPane>
        <TabPane tab="As Referrer" key="recruiters">
          <Form
            {...formItemLayout}
            name="normal_login"
            className="customForm"
            onFinish={onFinish}
          >
            <Form.Item
              name="first_name"
              // label="First Name"
              rules={[
                { required: true, message: 'Please input your First Name!' },
              ]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="First name"
              />
            </Form.Item>
            <Form.Item
              name="last_name"
              // label="Last Name"
              rules={[
                { required: true, message: 'Please input your Last Name!' },
              ]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Last name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              // label="Email"
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
              hasFeedback
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              // label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              // label="Phone Number"
              rules={[
                { required: true, message: 'Please input your Phone Number!' },
              ]}
              hasFeedback
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox>I have read the agreement</Checkbox>
            </Form.Item>
            <Form.Item className="groupButtonLogin">
          <Button className="buttonLogin" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default connect()(Register);
