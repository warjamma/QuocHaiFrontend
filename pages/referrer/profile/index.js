import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Card,Input,Form,Row, Col,notification,Tabs,Select,Button,Upload,Typography} from 'antd';

import {
  SaveTwoTone,EditTwoTone,EditOutlined
  //UploadOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
    layout: "horizontal"
  };
const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
function TabChange({status,fields}){
    return(
      <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="My profile" key="1">
          <EditUser  
                status={status}
                fields={fields}
              ></EditUser>
          </TabPane>
      <TabPane tab="Password" key="2">
          <ChangePassword/>
      </TabPane>
    </Tabs>
    );
  }

  function ChangePassword(){
    return(
      <Form
          {...layout} 
          name="global_state"
          >
          <Form.Item name="currentPassword"  label="Current Password" rules={[
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
          <Button style={{ marginLeft: 150 }}  type="primary"  htmlType="submit" >
            <SaveTwoTone />&nbsp;Save</Button>
          </Form.Item>
      </Form>
    );
  }
  function EditUser({onChange, fields,status}){
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }} disabled={!status}  >
          <Option value="84">+84</Option>
          <Option value="85">+85</Option>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );
    const onFinish = values => {
      console.log('Received values of form: ', values);
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
          <Form.Item  name="userName" label="User name" >
              <Input  disabled={!status} />     
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
            <Input disabled={!status}/>
          </Form.Item>
          <Form.Item name="following" label="Following" >
              <Input  disabled={!status}/>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector}   disabled={!status}/>
          </Form.Item>
          <Form.Item name='bankName'  label="Bank name" >
              <Input disabled={!status}/>
          </Form.Item>
          <Form.Item name='bankAccount' label="Bank number" >
              <Input disabled={!status}/>
          </Form.Item>
          <Form.Item name='bankUserName' label="Bank user">
              <Input disabled={!status}/>
          </Form.Item >
          <Form.Item>
        </Form.Item>
        <Form.Item>
          <Button style={{ marginLeft: 150 }}  type="primary"  htmlType="submit" >
            <SaveTwoTone />&nbsp;Save</Button>
          </Form.Item>
      </Form>
    );

  }
    
function MyProfile(){
  const [status,setStatus] = useState(false);
  const isEdit = () => {
    setStatus(!status)
    };
    const  updateUser = () => {
      notification.open({
          message: 'Confirm save',
          description:
            'Click me to save',
          onClick: () => {
              setStatus(!status)  
            console.log('Notification Clicked!');
            
          },
          style: {cursor: 'pointer'},
          
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
        const normFile = e => {
          console.log('Upload event:', e);
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        };
      
  
    
  return (
    <div >
        <div>
        <Title level={2}>My Profile</Title>
      </div>
        {/* background: '#ececec' , */}
        <div className="site-card-wrapper" style={{padding: 30}}>
        <Row gutter={[16, 16]}>
        <Col span={16} >
        <Card title="Edit my profile" extra={status ? (
            <div onClick={updateUser}  >
            <SaveTwoTone />&nbsp;
            <input value="save" type="submit" form="global_state" style={{color: '#096dd9',
            background: 'white',
            border: 'none',padding:'0'}}/>  
            </div>       
        ) : (          
            <div onClick={isEdit}>    
            <EditTwoTone />&nbsp;
            <a href='#'>Edit</a>   
            </div> 
        )} >
          {status?( <TabChange  status={status}fields={fields} />):
          (<EditUser status={status} fields={fields}></EditUser>)} 
        </Card>
        </Col>
        <Col span={8} > 
            <Card
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <EditOutlined key="edit" />, 
                ]}
              >
              </Card>    
        </Col>
        </Row>

        </div>
    </div>
  );
}

export default connect(null, null)(MyProfile);