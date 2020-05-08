/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import {
  EditTwoTone, UploadOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Card, Input, Form, Row, Col, notification, Select, Tabs, Button, Upload, message } from 'antd';
import { get, cloneDeep } from 'lodash';
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
const { Option } = Select;

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
      return { visibility: 'hidden', height: 0, padding: '0', margin: 0 };
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
    else if (!initForm.avatar) {
      data.avatar = "";
    }
    else {
      data.avatar = initForm.avatar;
    }
    if (!value.bank_name) {
      data.bank_name = "";
    }
    if (!value.bank_number) {
      data.bank_number = "";
    }
    if (!value.bank_user) {
      data.bank_user = "";
    }
    data.about = " ";
    data.last_name = " ";
    data.address = " ";
    data.technical_specializes = ["Trash", "Trash"];
    data.job_levels = ["Trash", "Trash"];
    data.informative_in = ["Trash", "Trash"];
    data.candidate_skills = ["Trash", "Trash"];
    data.languages = ["Trash", "Trash"];
    data.locations = ["Trash", "Trash"];
    data.facebook = " ";
    data.linked_in = " ";
    data.skype = " ";
    await dispatch(updateProfile({ ...initForm, ...data }, get(profile, 'data.recruiter.id', []))).then(res => {
      if (res.status) {
        return message.success('Update Profile successfully').then(() => Router.push(`/referrer/profile`));;
      }
      return message.error(res.error);
    });
  };
  const bankName = ['TMCP NGOAI THUONG VIET NAM(VIETCOMBANK)','BUSAN', 'BANK OF INDIA', 'E.SUN', 'KY THUONG VN(TECHCOMBANK)', 'VIET NAM THUONG TIN(VIETBANK)', 'SHINHAN VN','HONGKONG AND SHANGHAI BANK (HSBC)','SAI GON THUONG TIN(SACOMBANK)','DBS BANK LTD CN HCM','UOB VIETNAM(UOB VN)','NNO&PT NONG THON VN(AGRIBANK','SAI GON(SCB)','DONG A(DONG A BANK','BAN VIET(CIET CAPITAL BANK','BUU DIEN LIEN VIET(LIEN VIET POST BANK)','SIAM COMMERCIAL BANK PUBLIC COMBANK','MAY BANK(HN)','BANK OF CHINA','JD MORGAN CHASE BANK','SUMITIMO MITSUI BANKING CORPORA..','BNP PARIBAS CHI NHANH HN','CONG THUONG VN(VIETTINBANK)','XUATNHAPKHAU(EXIMBANK)','SAI GON CONG THUONG(SAIGONBANK)','VIET NAM THINH VUONG(VP BANK)','QUAN DOI(MB)','DAI DUONG(OCEANBANK)','DAU KHI TOAN CAU(GPBANK)','DONG NAM A(SEABANK)','XANG DAU PETROLIMEX(PGBANK)','SAI GON- HA NOI(SHB)','TIEN PHONG(TIEN PHONG BANK)','CITI BANK HN','HANG HAI HN(MARITIME BANK)','QUOC DAN(NCB)','OVERSEA-CHINESE BANKING CORP LTD','CHINA CONSTRUCTION BANK CORPOR..','CIMB BANK','CHINH SACH XA HOI(VBSP)','XAY DUNG VN(CB BANK)','AN BINH(ABBANK)','A CHAY(ACB)','PHUONG DONG(OCB)','BAO VIET(BAO VIET BANK)','NAM A(NAM A BANK)','WOORI RANK VIET NAM','BANGKOK BANK HANOI','BANGKOK BANK HCM','CTI BANK','PUBLIC BANK VN','BPCE IOM','FIRST COMMERCIAL BANK HANOI','MIZUHO CORPORATE BANK LTD.,HN','BANK OF COMMUNICATIONS','DEUTSCHE BANK','CTBC (NHTM CHINATRUST)','NH SINOPAC','TAIPEI FUBONC.B','KIENLONG (KIEN LING BANK)','PHAT TRIEN TP HCM(HD BANK)','DAI CHUNG(PVCOMBANK)','BAC A(BAC A BANK)','VIET A (VIET A BANK)','PHAT TRIEN VIET NAM(VDB)','STANDARD CHARTERED BANK','HONG LEONG VN','BNP-PARIBAS CN HCM','HONG LEONG VN','BNP-PARIBAS CN HCM','MIZUHO CORPORATE BANK,LTD','INDUSTRIAL 7 COMMERCIAL BANK OF..','QUOC TE(VIB)','DAU TU VA PHAT TRIEN VN(BIDV)'];
  return (
    <Form
      form={form}
      {...layout}
      name="global_state"
      onFinish={onFinish}
    >
      <Form.Item style={hiddenInput()} name="first_name" label="Họ tên " rules={[{ required: true, message: 'This field is required !' }]}>
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Tên: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.first_name', [])}</Col>
      </Row>
      <Form.Item style={hiddenInput()} name="phone_number" label="Điện thoại" rules={[{ required: true, message: 'This field is required !' }]} >
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Điện thoại: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.phone_number', [])}</Col>
      </Row>
      <Form.Item
        style={hiddenInput()}
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
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Email: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.email', [])}</Col>
      </Row>
      <Form.Item
        style={hiddenInput()}
        name='bank_name'
        label="Tên ngân hàng"  >
        <Select
          allowClear
          showSearch
          style={{ width: '100%' }}
          placeholder="Công ty"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {bankName.map((d) => (
            <Option value={d} key={d}>{d}</Option>
          ))}
        </Select>
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Tên ngân hàng: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.bank_name', [])}</Col>
      </Row>
      <Form.Item
        style={hiddenInput()}
        name='bank_number'
        label="Số tài khoản"  >
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Số tài khoản: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.bank_number', [])}</Col>
      </Row>
      <Form.Item
        style={hiddenInput()}
        name='bank_user'
        label="Tên chủ thẻ"  >
        <Input disabled={!status} />
      </Form.Item>
      <Row className='row-detail' style={hiddenDiv()}>
        <Col span={3}><span className='bold-span'>Chủ tài khoản: </span></Col>
        <Col span={19}>{get(referred, 'recruiter_detail.data.recruiter.bank_user', [])}</Col>
      </Row>
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
  const changeCSSUpload = () => {
    if (!get(referred, 'recruiter_detail.data.recruiter.avatar', [])) {
      if (fileLink) {
        return {
          width: 250, height: 250, objectFit: 'scale-down', margin: 'auto', display: 'block'
        };
      }
      return { height: 0 };
    }

    return {
      width: 250, height: 250, objectFit: 'scale-down', margin: 'auto', display: 'block'
    };

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
                (<EditUser fileLink={fileLink} form={form} dispatch={dispatch} initForm={initForm} referred={referred} status={status} profile={profile} />)}
            </Card>
          </Col>
          <Col className="right-profile" span={8} >
            <div className="site-card-border-less-wrapper">
              <Card title="Hình đại diện" bordered={false} style={{ width: 300 }}>
                <div className="bouder-img">
                  <img
                    style={changeCSSUpload()}
                    // eslint-disable-next-line no-nested-ternary
                    src={fileLink === '' ? (get(referred, 'recruiter_detail.data.recruiter.avatar', []) === '' ? (fileLink) : (get(referred, 'recruiter_detail.data.recruiter.avatar', []))) : (fileLink)}
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
  console.log('State profile refer', state);
  const { referred, profile } = state;
  return { referred, profile };
}

export default connect(mapStateToProps, null)(CompanyProfile);