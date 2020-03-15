import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Tabs, Radio, message} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './styles.scss';

const warning = (mes) => {
  message.error(mes);
};

const { TabPane } = Tabs;

function ForgetPassword(props) {
  const [role, setRole] = useState('employers');

  useEffect(() => {
  });

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'auth/forgetPassword',
      payload: values,
      role,
    });
  };

  return (
    <div className={styles.resetPasswordForm}>
      <div className={styles.loginLogo}>
        <img src={require("../../assets/images/logo.png")} alt="logo" />
        <div>Forget Password</div>
      </div>
      <Radio.Group className={styles.selectRole} onChange={(e) => setRole(e.target.value)} defaultValue={role}>
        <Radio value="employers">Employers</Radio>
        <Radio value="recruiters">Recruiters</Radio>
      </Radio.Group>
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
        <Form.Item className={styles.groupButtonLogin}>
          <Button className={"login-form-button", styles.buttonLogin} type="primary" htmlType="submit">
            Get Code
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

export default connect(mapStateToProps)(ForgetPassword);
