/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import {
  EditTwoTone, UploadOutlined
  // UploadOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Card, Input, Form, Row, Col, notification, Tabs, Button, Upload, message } from 'antd';
import { get, cloneDeep } from 'lodash';
// import { updateProfile, getProfileById } from '../../../containers/company/action';
import { uploadRequestImg, updateProfile, getProfileById } from '../../../containers/referred/actions';
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
      <Form.Item  {...tailLayout} style={{ marginTop: 10 }} >
        <Button type="primary" htmlType="submit" >
          Cập nhật</Button>
        <Button style={{ marginLeft: 5 }} onClick={() => Router.push('/referrer/profile')} >
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
      return { visibility: 'hidden', height: 0 };
    }
    return { padding: 0 };
  };
  const hiddenBtn = () => {
    if (status) {
      return {marginTop: 10};
    }
    return {  visibility: 'hidden'};
  };
  const onFinish = async (value) => {
    const data = cloneDeep(value);
    if (fileLink) {
      data.avatar = fileLink;
    }
    await dispatch(updateProfile({ ...initForm, ...data }, get(profile, 'data.recruiter.id', []))).then(res => {
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
      <Form.Item style={hiddenInput()} name="first_name" label="Tên " rules={[{ required: true, message: 'This field is required !' }]}>
        <Input disabled={!status} />
      </Form.Item>
      <div style={hiddenDiv()} ><span className='bold-span'>Tên: </span>{get(referred, 'recruiter_detail.data.recruiter.first_name', [])}</div>
      <Form.Item style={hiddenInput()} name="last_name" label="Họ tên đệm" rules={[{ required: true, message: 'This field is required !' }]}>
        <Input disabled={!status} />
      </Form.Item>
      <div style={hiddenDiv()} ><span className='bold-span'>Họ tên đệm: </span>{get(referred, 'recruiter_detail.data.recruiter.last_name', [])}</div>
      <Form.Item style={hiddenInput()} name="phone_number" label="Điện thoại" rules={[{ required: true, message: 'This field is required !' }]} >
        <Input disabled={!status} />
      </Form.Item>
      <div style={hiddenDiv()} ><span className='bold-span'>Số điện thoại: </span>  {get(referred, 'recruiter_detail.data.recruiter.phone_number', [])}</div>
      <Form.Item
        style={hiddenInput()}
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
      <div style={hiddenDiv()} ><span className='bold-span'>Email: </span>{get(referred, 'recruiter_detail.data.recruiter.name', [])}</div>
      <Form.Item
        style={hiddenInput()}
        // name='address'
        label="Tên ngân hàng"  >
        <Input disabled={!status} />
      </Form.Item>
      <div style={hiddenDiv()} ><span className='bold-span'>Tên ngân hàng: </span> {get(referred, 'recruiter_detail.data.recruiter.name', [])}</div>
      <Form.Item
        style={hiddenInput()}
        // name='website' 
        label="Số tài khoản"  >
        <Input disabled={!status} />
      </Form.Item>
      <div style={hiddenDiv()} ><span className='bold-span'>Số tài khoản: </span>{get(referred, 'recruiter_detail.data.recruiter.name', [])}</div>
      <Form.Item
        style={hiddenInput()}
        // name='facebook'
        label="Tên chủ thẻ"  >
        <Input disabled={!status} />
      </Form.Item>
      <div style={hiddenDiv()} ><span className='bold-span'>Tên chủ thẻ: </span> {get(referred, 'recruiter_detail.data.recruiter.name', [])}</div>
      <Form.Item
        {...tailLayout} style={hiddenBtn()}>
        <Button disabled={!status} type="primary" htmlType="submit" >
          Cập nhật</Button>
        <Button disabled={!status} style={{ marginLeft: 5 }} onClick={() => Router.push('/referrer/profile')} >
          Hủy</Button>
      </Form.Item>
    </Form >
  );

}
function EditUser2({ referred,form }) {
  return (
    <form form={form}>
      <Row className='row-detail'>
        <Col span={3}><span className='bold-span'>Tên: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.first_name', [])}</Col>
      </Row>

      <Row className='row-detail'>
        <Col span={3}><span className='bold-span'>Họ tên đệm: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.last_name', [])}</Col>
      </Row>

      <Row className='row-detail'>
        <Col span={3}><span className='bold-span'>Email: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.email', [])}</Col>
      </Row>

      <Row className='row-detail'>
        <Col span={3}><span className='bold-span'>Điện thoại: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.phone_number', [])}</Col>
      </Row>

      <Row className='row-detail'>
        <Col span={3}><span className='bold-span'>Tên ngân hàng: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.bank_name', [])}</Col>
      </Row>

      <Row className='row-detail'>
        <Col span={3}><span className='bold-span'>Số tài khoản: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.bank_number', [])}</Col>
      </Row>

      <Row className='row-detail'>
        <Col span={3}><span className='bold-span'>Chủ tài khoản: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.bank_user', [])}</Col>
      </Row>
      

      <Row className='row-detail'>
        <Col span={3}><span className='bold-span'>Giới thiệu công ty: </span></Col>
        <Col span={18}>{get(referred, 'company_detail.data.company.about', [])}</Col>
      </Row>
    </form>
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
      return {display:'block'};
    }
    return {  visibility: 'hidden'};
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
  const id = get(profile, 'data.recruiter.id', []);
  useEffect(() => {
    dispatch(getProfileById({ id }))
      .then(res => {
        const { data, status } = res;
        if (status) {
          form.setFieldsValue(data.data.recruiter);
        }
      });
  }, []);
  const setting = {
    onChange,
    // onRemove: () => setFileLink(''),
    // multiple: true,
    listType: "picture",
    // accept: ".pdf",
    customRequest: dummyRequest
  };

  const initForm = get(referred, 'recruiter_detail.data.recruiter', []);
  return (
    <div className="profile" >
      <div className="header">
        <div>Thông tin cá nhân </div>
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
                (<EditUser2 fileLink={fileLink} form={form} dispatch={dispatch} initForm={initForm} referred={referred} status={status} profile={profile} />)}
            </Card>
          </Col>
          <Col className="right-profile" span={8} >
            <div className="site-card-border-less-wrapper">
              <Card title="Hình đại diện" bordered={false} style={{ width: 300 }}>
                <div className="bouder-img">
                  <img
                    style={get(referred, 'company_detail.data.company.avatar', []) ? { width: 250, height: 250, objectFit: 'cover', margin: 'auto', display: 'block' } : { height: 0 }}
                    // eslint-disable-next-line no-nested-ternary
                    src={fileLink === '' ? (get(referred, 'recruiter_detail.data.recruiter.avatar', []) === '' ? (fileLink) : (get(referred, 'recruiter_detail.data.recruiter.avatar', []))) : (fileLink)}
                    alt=""
                  />
                </div>
                <div className="upload-img"  style={hiddenBtn()} >
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
  console.log('State profile refer', state);
  const { referred, profile } = state;
  return { referred, profile };
}

export default connect(mapStateToProps, null)(CompanyProfile);