import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Checkbox, Tabs, Select, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './styles.scss';

const { TabPane } = Tabs;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const warning = (mes) => {
  message.error(mes);
};

const success = (mess) => {
  message.success(mess);
};

function Register(props) {
  const [role, setRole] = useState('employers');
  const { dispatch } = props;
  useEffect(() => {
    const { isError, message, history } = props;
    console.log(process.env)
    if (localStorage.getItem('token')) {
      history.push('/dashboard');
    }
    if (isError) {
      warning(message)
    }
  });

  const onFinish = async (values) => {
    const { dispatch } = props;
    delete values.prefix;
    Object.keys(values).forEach(item => {
      if(!values[item]) delete values[item];
    })
    console.log('Received values of form: ', values);
    dispatch({
      type: 'auth/register',
      payload: values,
      role,
    }).then(res => {
      dispatch({
        type: 'auth/verifyUser',
        payload: res,
        role,
      })
    })
    success('Register successfully')
  };
  

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select dropdownClassName={styles.dropdownCusstomRegister} showArrow={false} defaultValue={
        <div className={styles.renderItemSelect}>
          (+82)
          <span role="img" aria-label="USA">
            🇺🇸
          </span>
        </div>
      } style={{ width: 80 }}>
        <Option value="89" label="China">
          <div className={styles.renderItemSelect}>
            (+89) 
            <span role="img" aria-label="China">
              🇨🇳
            </span>
          </div>
        </Option>
        <Option value="82" label="USA">
          <div className={styles.renderItemSelect}>
            (+82) 
            <span role="img" aria-label="USA">
              🇺🇸
            </span>
          </div>
        </Option>
        <Option value="81" label="Japan">
          <div className={styles.renderItemSelect}>
            (+81) 
            <span role="img" aria-label="Japan">
              🇯🇵
            </span>
          </div>
        </Option>
        <Option value="80" label="Korea">
          <div className={styles.renderItemSelect}>
            (+80) 
            <span role="img" aria-label="Korea">
              🇰🇷
            </span>
          </div>
        </Option>
      </Select>
    </Form.Item>
  );

  function FormRegister(props) {
    return (
      <Form
        {...formItemLayout}
        name="normal_login"
        className={styles.customForm}
        onFinish={onFinish}
      >
        {props.children}
        <Form.Item className={styles.groupButtonLogin}>
          <Button className={styles.buttonLogin} type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className={styles.registerForm}>
      <div className={styles.loginLogo}>
        <img src={require("../../assets/images/logo.png")} alt="logo" />
        <div>Register</div>
      </div>
      <Tabs defaultActiveKey={role} onChange={(e) => {
        setRole(e)
        dispatch({type: 'auth/clear'})
      }}>
        <TabPane tab="As Company" key="employers">
          <FormRegister>
            <Form.Item
              name="company_name"
              label="Company Name"
              rules={[{ required: true, message: 'Please input your Company Name!' }]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Company name" 
              />
            </Form.Item>
            <Form.Item
              name="full_name"
              label="Full Name"
              rules={[{ required: true, message: 'Please input your Full Name!' }]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Full name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
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
              label="Password"
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
              label="Phone Number"
              rules={[{ required: true, message: 'Please input your Phone Number!' }]}
              hasFeedback
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
          </FormRegister>
        </TabPane>
        <TabPane tab="As Referrer" key="recruiters">
          <FormRegister>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true, message: 'Please input your First Name!' }]}
              hasFeedback
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First name" />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[{ required: true, message: 'Please input your Last Name!' }]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Last name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
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
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
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
              label="Phone Number"
              rules={[{ required: true, message: 'Please input your Phone Number!' }]}
              hasFeedback
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
          </FormRegister>
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

export default connect(mapStateToProps)(Register);
