/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import {
  EditTwoTone, UploadOutlined, EyeOutlined
  // UploadOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Card, Input, Form, Row, Col, notification, Tabs, Button, Upload, message } from 'antd';
import { get, cloneDeep } from 'lodash';
import { updateProfile, getProfileById } from '../../../containers/company/action';
import { uploadRequestImg } from '../../../containers/referred/actions';
import './styles.scss';

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 16 },
  layout: "vertical"
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 0 },
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
      <Form.Item  {...tailLayout} style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit" >
          Cập nhật</Button>
        <Button style={{ marginLeft: 5 }} onClick={() => Router.push('/company/profile')} >
          Hủy</Button>
      </Form.Item>
    </Form>
  );
}
function EditUser({ status, profile, referred, initForm, dispatch, fileLink, form }) {
  const hiddenInput = () => {
    if (status) {
      return { color: 'red' };
    }
    return { visibility: 'hidden', height: 0 };
  };
  const hiddenDiv = () => {
    if (status) {
      return { visibility: 'hidden', height: 0 ,padding: '0',margin:0};
    }
    return { paddingTop: 24 };
  };
  const hiddenBtn = () => {
    if (status) {
      return { marginTop: 10 };
    }
    return { visibility: 'hidden' };
  };
  const onFinish = async (value) => {
    const data = cloneDeep(value);
    if (fileLink) {
      data.avatar = fileLink;
    }
    // eslint-disable-next-line no-param-reassign
    initForm.in_charge_by = "ACV";
    // eslint-disable-next-line no-param-reassign
    initForm.last_year_revenue = 2;
    // eslint-disable-next-line no-param-reassign
    initForm.role = "Trash";
    // eslint-disable-next-line no-param-reassign
    initForm.linked_in = "https://Trash.co";
    // eslint-disable-next-line no-param-reassign
    initForm.youtube = "https://Trash.co";
    // eslint-disable-next-line no-param-reassign
    initForm.vission = "https://Trash.co";
    // eslint-disable-next-line no-param-reassign
    initForm.product = "https://Trash.co";
    // eslint-disable-next-line no-param-reassign
    initForm.company_size = "https://Trash.co";
    // eslint-disable-next-line no-param-reassign
    initForm.expectation_knowledge = ["it suck", "suck"];

    await dispatch(updateProfile({ ...initForm, ...data }, get(profile, 'data.employer.company.id', []))).then(res => {
      if (res.status) {
        return message.success('Update Profile successfully').then(() => Router.push(`/company-profile/${get(referred, 'company_detail.data.company.id', [])}`));
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
      <Form.Item style={hiddenInput()} name="name" label="Tên công ty" rules={[{ required: true, message: 'This field is required !' }]}>
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Tên: </span></Col>
        <Col span={19}>{get(referred, 'company_detail.data.company.name', [])}</Col>
      </Row>
      <Form.Item style={hiddenInput()} name="phone_number" label="Điện thoại" rules={[{ required: true, message: 'This field is required !' }]} >
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Số điện thoại: </span></Col>
        <Col span={19}>{get(referred, 'company_detail.data.company.phone_number', [])}</Col>
      </Row>
      <Form.Item
        style={hiddenInput()}
        name="email_cc"
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
      <Row className='row-detail' style={hiddenDiv()} >
        <Col span={3}><span className='bold-span'>Email: </span></Col>
        <Col span={19}>{get(referred, 'company_detail.data.company.email_cc', [])}</Col>
      </Row>
      <Form.Item
        style={hiddenInput()}
        name="hotline"
        label="Hotline"
      >
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Hotline: </span></Col>
        <Col span={19}>{get(referred, 'company_detail.data.company.hotline', [])}</Col>
      </Row>
      <Form.Item name='address' label="Địa chỉ" style={hiddenInput()} >
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Địa chỉ: </span></Col>
        <Col span={19}>{get(referred, 'company_detail.data.company.address', [])}</Col>
      </Row>
      <Form.Item
        style={hiddenInput()}
        name='career_site'
        label="Website"  >
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Website: </span></Col>
        <Col span={19}>{get(referred, 'company_detail.data.company.career_site', [])}</Col>
      </Row>
      <Form.Item
        style={hiddenInput()}
        name='facebook'
        label="Facebook"  >
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Facebook: </span></Col>
        <Col span={19}>{get(referred, 'company_detail.data.company.facebook', [])}</Col>
      </Row>
      <Form.Item
        style={hiddenInput()}
        name="employee_benefit"
        label="Phúc lợi" >
        <Input.TextArea disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Phúc lợi: </span></Col>
        <Col span={19}>{get(referred, 'company_detail.data.company.employee_benefit', [])}</Col>
      </Row>
      <Form.Item name="about" label="Giới thiệu công ty" style={hiddenInput()}>
        <Input.TextArea disabled={!status} style={{ height: 200 }} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Giới thiệu công ty: </span></Col>
        <Col span={18}>{get(referred, 'company_detail.data.company.about', [])}</Col>
      </Row>
      <Form.Item  {...tailLayout} style={hiddenBtn()}>
        <Button disabled={!status} type="primary" htmlType="submit" >
          Cập nhật</Button>
        <Button disabled={!status} style={{ marginLeft: 5 }} onClick={() => Router.push('/company/profile')} >
          Hủy</Button>
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

  const hiddenBtn = () => {
    if (status) {
      return { display: 'block' };
    }
    return { visibility: 'hidden' };
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
        <div>Hồ sơ công ty </div><EyeOutlined className="eye-view" style={{ float: 'right', marginRight: 20, fontSize: 20 }} onClick={() => Router.push(`/company-profile/${get(referred, 'company_detail.data.company.id', [])}`)} />
      </div>
      <div className=" filter-box"  >
        <Row gutter={[16, 16]}>
          <Col className="left-profile" span={16} >
            <Card
              title="Thông tin"
              bordered={false}
              extra={status ? (
                <div className="edit" role="presentation" onClick={updateUser}  >
                  {/* <SaveTwoTone />&nbsp; */}
                  {/* <input className="change-edit" value="save" type="submit" form="global_state" /> */}
                  {/* <input className="change-edit" value="save" type="submit" /> */}
                </div>
              ) : (
                  <div className="is-edit" role="presentation" onClick={isEdit}>
                    <EditTwoTone />&nbsp;
                    <span>Edit</span>
                  </div>
                )} >
              {status ? (<TabChange fileLink={fileLink} form={form} dispatch={dispatch} initForm={initForm} referred={referred} status={status} profile={profile} />) :
                (<EditUser referred={referred}  form={form} />)}
            </Card>
          </Col>
          <Col className="right-profile" span={8} >
            <div className="site-card-border-less-wrapper">
              <Card title="Logo" bordered={false} style={{ width: 300 }}>
                <div className="bouder-img">
                  <img
                    style={get(referred, 'company_detail.data.company.avatar', []) ? { width: 250, height: 250, objectFit: 'scale-down', margin: 'auto', display: 'block' } : { height: 0 }}
                    // eslint-disable-next-line no-nested-ternary
                    src={fileLink === '' ? (get(referred, 'company_detail.data.company.avatar', []) === '' ? (fileLink) : (get(referred, 'company_detail.data.company.avatar', []))) : (fileLink)}
                    alt=""
                  />
                </div>
                <div className="upload-img" style={hiddenBtn()} >
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
  const { referred, profile } = state;
  return { referred, profile };
}

export default connect(mapStateToProps, null)(CompanyProfile);