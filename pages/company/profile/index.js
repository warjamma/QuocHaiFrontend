/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  SaveTwoTone, EditTwoTone, UploadOutlined
  // UploadOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Card, Input, Form, Row, Col, notification, Tabs, Button, Upload, message } from 'antd';
import { get, cloneDeep } from 'lodash';
import { updateProfile, getProfileById } from '../../../containers/company/action';
import { uploadRequestImg } from '../../../containers/referred/actions';
import './styles.scss';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
  layout: "horizontal"
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 0 },
};
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};


function TabChange({ status, profile, referred, initForm, dispatch, form, fileLink }) {
  return (
    <Tabs className="form-body" defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Hồ sơ công ty" key="1">
        <EditUser
          form={form}
          profile={profile}
          status={status}
          referred={referred}
          initForm={initForm}
          dispatch={dispatch}
          fileLink={fileLink}
        />
      </TabPane>
      <TabPane tab="Mật khẩu" key="2">
        <ChangePassword />
      </TabPane>
    </Tabs>
  );
}

function ChangePassword(props) {
  // const { dispatch, referred } = props;
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      {...layout}
      name="global_state"
    >
      <Form.Item name="currentPassword" label="Current Password"
        rules={[
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
      <Form.Item  {...tailLayout} >
        <Button type="primary" htmlType="submit" >
          <SaveTwoTone />&nbsp;Cập nhật</Button>
      </Form.Item>
    </Form>
  );
}
function EditUser({ status, profile, initForm, dispatch, fileLink, form }) {


  const onFinish = async (value) => {
    const data = cloneDeep(value);
    if (fileLink) {
      data.avatar = fileLink;
    }
    initForm.career_site = "https://Trash.co";
    //initForm.avatar = "https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk";
    initForm.in_charge_by = "ACV";
    initForm.last_year_revenue = 2;
    initForm.role = "Trash";
    initForm.linked_in = "https://Trash.co";
    initForm.youtube = "https://Trash.co";
    initForm.vission = "https://Trash.co";
    initForm.product = "https://Trash.co";
    initForm.company_size = "https://Trash.co";
    initForm.expectation_knowledge = ["it suck", "suck"];

    await dispatch(updateProfile({ ...initForm, ...data }, get(profile, 'data.employer.company.id', []))).then(res => {
      if (res.status) {
        return message.success('Update Profile successfully');
      }
      return message.error(res.error);
    });
  };

  return (
    <Form
      form={form}
      {...layout}
      name="global_state"
      onFinish={onFinish}
    >
      <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'This field is required !' }]}>
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item name="phone_number" label="Điện thoại" rules={[{ required: true, message: 'This field is required !' }]} >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item

        // name="email"
        label="E-mail"
      // rules={[
      //   {
      //     type: 'email',
      //     message: 'The input is not valid E-mail!',
      //   },
      //   {
      //     required: true,
      //     message: 'Please input your E-mail!',
      //   },
      // ]}
      >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item

        // name="hotline"
        label="Hotline"
      >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item name="email_cc" label="Email CC"  >
        <Input disabled={!status} />
      </Form.Item>

      <Form.Item name='address' label="Địa chỉ"  >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item
        // name='website' 
        label="Website"  >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item
        name='facebook'
        label="Facebook"  >
        <Input disabled={!status} />
      </Form.Item>
      <Form.Item
        // name="candidate_benefit" 
        label="Phúc lợi" >
        <Input.TextArea disabled={!status} />
      </Form.Item>
      <Form.Item name="about" label="Giới thiệu công ty" >
        <Input.TextArea disabled={!status} style={{ height: 200 }} />
      </Form.Item>
      <Form.Item  {...tailLayout}>
        <Button disabled={!status} type="primary" htmlType="submit" >
          <SaveTwoTone />&nbsp;Cập nhật</Button>
      </Form.Item>
    </Form>
  );

}

function CompanyProfile(props) {
  const [fileLink, setFileLink] = useState('');
  const [fileData, setFileData] = useState([]);
  const [form] = Form.useForm();
  const [status, setStatus] = useState(false);
  const isEdit = () => {
    setStatus(!status);
  };
  const { profile, referred, dispatch } = props;

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
  const onRequest = async (value) => {
    await dispatch(uploadRequestImg({ value })).then(res => {
      setFileLink(res.data);
      if (res.status) {
        return message.success('Upload request');
      }
      return message.error(res.error);
    });

  };
  const onChange = e => {
    const fileList = [...e.fileList];
    const last = fileList.slice(-1);
    setFileData(last);
    if (e.file.status === 'done') {
      onRequest(e.file, e.file.name);
    }
  };
  const id = get(profile, 'data.employer.company.id', []);
  useEffect(() => {
    dispatch(getProfileById({ id })).then(res => {
      const { data, status } = res;
      if (status) {
        form.setFieldsValue(data.data.company);
      }
    });;
  }, []);
  const setting = {
    onChange,
    // onRemove: () => setFileLink(''),
    // multiple: true,
    listType: "picture",
    // accept: ".pdf",
    customRequest: dummyRequest
  };

  const initForm = get(referred, 'company_detail.data.company', []);
  return (
    <div className="profile" >
      <div className="header">
        <div>Hồ sơ công ty</div>
      </div>
      <div className=" filter-box"  >
        <Row gutter={[16, 16]}>
          <Col className="left-profile" span={16} >
            <Card
              bordered={false}
              extra={status ? (
                <div className="edit" role="presentation" onClick={updateUser}  >
                  <SaveTwoTone />&nbsp;
                  {/* <input className="change-edit" value="save" type="submit" form="global_state" /> */}
                  <input className="change-edit" value="save" type="submit" />
                </div>
              ) : (
                  <div role="presentation" onClick={isEdit}>
                    <EditTwoTone />&nbsp;
                    <span>Edit</span>
                  </div>
                )} >
              {status ? (<TabChange fileLink={fileLink} form={form} dispatch={dispatch} initForm={initForm} referred={referred} status={status} profile={profile} />) :
                (<EditUser fileLink={fileLink} form={form} dispatch={dispatch} initForm={initForm} referred={referred} status={status} profile={profile} />)}
            </Card>
          </Col>
          <Col className="right-profile" span={8} >
            <div className="site-card-border-less-wrapper">
              <Card title="Logo công ty" bordered={false} style={{ width: 300 }}>
                <div className="bouder-img">
                  <img
                    style={{ width: 250, height: 250, objectFit: 'cover', margin: 'auto', display: 'block' }}
                    src={fileLink === '' ? (get(referred, 'company_detail.data.company.avatar', []) === '' ? (fileLink) : (get(referred, 'company_detail.data.company.avatar', []))) : (fileLink)}src={fileLink === '' ? (get(referred, 'company_detail.data.company.avatar', []) === '' ? (fileLink) : (get(referred, 'company_detail.data.company.avatar', []))) : (fileLink)}
                    // src={get(referred, 'company_detail.data.company.avatar', [])}
                   alt=""
                  // value={fileLink}
                  />
                </div>
                {/* <img disabled src={fileLink} style={fileLink ? ({ width: 250, height: 250, objectFit: 'cover' }) : ({ height: 0 })} /> */}
                <div className="upload-img" >
                  <Upload
                    {...setting}
                    // fileList={fileData}
                    showUploadList={false}
                  >
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

function mapStateToProps(state) {
  console.log('State profile company', state);
  const { referred, profile } = state;
  return { referred, profile };
}

export default connect(mapStateToProps, null)(CompanyProfile);