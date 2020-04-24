/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Input, Form, Row, Col, notification, Tabs, Button, Upload } from 'antd';
import {
  SaveTwoTone, EditTwoTone, UploadOutlined
  // UploadOutlined,
} from '@ant-design/icons';
import './styles.scss';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
  layout: "horizontal"
};
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function TabChange({ status, fields }) {
  return (
    <Tabs className="form-body" defaultActiveKey="1" onChange={callback}>
      <TabPane tab="My profile" key="1">
        <EditUser
          status={status}
          fields={fields}
        />
      </TabPane>
      <TabPane tab="Password" key="2">
        <ChangePassword />
      </TabPane>
    </Tabs>
  );
}

function ChangePassword() {
  return (
    <Form
      {...layout}
      name="global_state"
    >
      <Form.Item name="currentPassword" label="Current Password" rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
        hasFeedback >
        <Input.Password />
      </Form.Item>

      <Form.Item name="newPassword" label="New Password" rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
        hasFeedback >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button style={{ marginLeft: 150 }} type="primary" htmlType="submit" >
          <SaveTwoTone />&nbsp;Cập nhật</Button>
      </Form.Item>
    </Form>
  );
}
function EditUser({ fields, status }) {
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }} disabled={!status}  >
  //       <Option value="84">+84</Option>
  //       <Option value="85">+85</Option>
  //       <Option value="86">+86</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );
  const onFinish = values => {
  };
  return (
    <Form
      {...layout}
      name="global_state"
      fields={fields}
      initialValues={{
        prefix: '84',
      }}
      onFinish={onFinish}
    >
      <Form.Item name="userName" label="User name" >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
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
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item name="following" label="Following" >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        {/* addonBefore={prefixSelector} */}
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item name='bankName' label="Bank name" >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item name='bankAccount' label="Bank number" >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item name='bankUserName' label="Bank user">
        <Input disabled={!status} />
      </Form.Item >
      <Form.Item>
        <Button disabled={!status} style={{ marginLeft: 150 }} type="primary" htmlType="submit" >
          <SaveTwoTone />&nbsp;Cập nhật</Button>
      </Form.Item>
    </Form>
  );

}

function MyProfile() {
  const [status, setStatus] = useState(false);
  const isEdit = () => {
    setStatus(!status);
  };
  const updateUser = () => {
    notification.open({
      message: 'Confirm save',
      description:
        'Click me to save',
      onClick: () => {
        setStatus(!status);

      },
      style: { cursor: 'pointer' },

    });
  };
  const [fields] = useState([
    {
      name: ['userName'],
      value: 'Nguyen Van Lam',
    },
    {
      name: ['email'],
      value: 'lgold141@gmail.com',
    },
    {
      name: ['following'],
      value: 'fb.com',
    },
    {
      name: ['phoneNumber'],
      value: '0396490264',
    },
    {
      name: ['bankName'],
      value: 'VietComBank',
    },
    {
      name: ['bankAccount'],
      value: '0296666666666',
    },
    {
      name: ['bankUserName'],
      value: 'Nguyen Van A',
    },
  ]);

  return (
    <div className="profile" >
      <div className="header">
        <div>Thông tin cá nhân</div>
      </div>
      <div className=" filter-box"  >
        <Row gutter={[16, 16]}>
          <Col className="left-profile" span={16} >
            <Card
              bordered={false}
              extra={status ? (
                <div className="edit" role="presentation" onClick={updateUser}  >
                  <SaveTwoTone />&nbsp;
                  <input className="change-edit"  value="save" type="submit" form="global_state" />
                </div>
              ) : (
                  <div role="presentation" onClick={isEdit}>
                    <EditTwoTone />&nbsp;
                    <span>Edit</span>
                  </div>
                )} >
              {status ? (<TabChange status={status} fields={fields} />) :
                (<EditUser  status={status} fields={fields} />)}
            </Card>
          </Col>
          <Col className="right-profile" span={8} >
            <div className="site-card-border-less-wrapper">
              <Card title="Hình đại diện" bordered={false} style={{ width: 300 }}>
                <img
                  src=' https://ai.whis.tech/media/image/5e9b8143ba922d1909a10196.jpg'
                  alt=""
                />
                {/* <img disabled src={fileLink} style={fileLink ? ({ width: 250, height: 250, objectFit: 'cover' }) : ({ height: 0 })} /> */}
                <div className="upload-img" >
                  <Upload >
                    <Button className="btn-upload" disabled={!status} >
                      <UploadOutlined /> Click to upload
                </Button>
                  </Upload>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default connect(null, null)(MyProfile);