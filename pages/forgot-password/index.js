import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Radio, message} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { forgotPassword } from '../../containers/profile/actions';
import './styles.scss';

const success = (mes) => {
  message.success(mes);
};

function ForgetPassword({ dispatch }) {
  const [role, setRole] = useState('employers');

  useEffect(() => {
  });

  const onFinish = async (values) => {
    dispatch(forgotPassword(values, role)).then(res => {
      if(res.status) {
        success(get(res, 'data.message', 'Successfully!'));
      }
    });
  };

  return (
    <div className="resetPasswordForm">
      <div className="loginLogo">
        <img src="/src_assets_images_logo.png" alt="logo" />
        <div>Forget Password</div>
      </div>
      <Radio.Group className="selectRole" onChange={(e) => setRole(e.target.value)} defaultValue={role}>
        <Radio value="employers">Employers</Radio>
        <Radio value="recruiters">Recruiters</Radio>
      </Radio.Group>
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
        <Form.Item className="groupButtonLogin">
          <Button className="login-form-button buttonLogin" type="primary" htmlType="submit">
            Get Code
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect()(ForgetPassword);
