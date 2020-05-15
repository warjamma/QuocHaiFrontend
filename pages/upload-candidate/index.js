/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import { Input, Menu, Form, Row, Col, Select, Button, Upload, message } from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined, MailOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { createCandidateNoAddJob, uploadRequest } from '../../containers/referred/actions';
import './styles.scss';

const { Option } = Select;

const initForm = {

  availability: "none",
  certificate: [
    "Trash",
    "Trash"
  ],
  created_at: "2020-04-08T15:56:09.412901",
  current_salary: 4,
  cv: "",
  education: [
    {
      degree: "Trash",
      major: "Trash"
    }
  ],
  email: "",
  expectation: "sadsad",
  experience: [
    {
      duration: 3,
      industry: "Trash collecting",
      job_title: "Trash collector",
      role: "Trash collector"
    }
  ],
  industry_insight: [
    {
      field: "Trash collecting",
      rating: "Trash",
      years: "whole life"
    }
  ],
  job_level: [
    "trash",
    "junior"
  ],
  job_role: [
    "backend",
    "frontend"
  ],
  language: [
    {
      field: "Trash",
      rating: "Trash",
      years: "whole life"
    }
  ],
  locations: [
    "Ho Chi Minh",
    "Trash"
  ],
  max_salary: 12,
  min_salary: 23,
  name: "",
  phone_number: "",
  profile_title: "",
  recommendation: "none",
  recruiter_id: "",
  skill: [
    {
      field: "Trash",
      rating: "Trash",
      years: "3 years"
    }
  ],
  status: "pending",
  updated_at: "2020-04-08T15:56:09.412907",
  verify_token: ""
};
const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 18 },
};

const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

function UploadCV(props) {
  const { dispatch } = props;
  const router = useRouter();
  const { id } = router.query;

  const [fileLink, setFileLink] = useState('');
  const [fileData, setFileData] = useState([]);
  const onFinish = async (value) => {
    const data = cloneDeep(value);
    data.cv = fileLink;
    data.phone_number = initForm.phone_number;
    dispatch(createCandidateNoAddJob({ ...initForm, ...data })).then(res => {
      if (res.status) {
        return message.success('Create candidate successfully').then(() => Router.push(`/`));
      }
      return message.error(res.error);
    });
  };
  const onRequest = async (value) => {
    dispatch(uploadRequest({ value })).then(res => {
      setFileLink(res.data);
      if (res.status) {
        return message.success('Upload request');
      }
      return message.error(res.error);
    });

  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChange = e => {
    const fileList = [...e.fileList];
    const last = fileList.slice(-1);
    setFileData(last);
    if (e.file.status === 'done') {
      onRequest(e.file, e.file.name);
    }
  };

  const setting = {
    onChange,
    onRemove: () => setFileLink(''),
    multiple: true,
    listType: "picture",
    accept: ".pdf",
    customRequest: dummyRequest
  };
  const bankName = ['TMCP NGOAI THUONG VIET NAM(VIETCOMBANK)', 'BUSAN', 'BANK OF INDIA', 'E.SUN', 'KY THUONG VN(TECHCOMBANK)', 'VIET NAM THUONG TIN(VIETBANK)', 'SHINHAN VN', 'HONGKONG AND SHANGHAI BANK (HSBC)', 'SAI GON THUONG TIN(SACOMBANK)', 'DBS BANK LTD CN HCM', 'UOB VIETNAM(UOB VN)', 'NNO&PT NONG THON VN(AGRIBANK', 'SAI GON(SCB)', 'DONG A(DONG A BANK', 'BAN VIET(CIET CAPITAL BANK', 'BUU DIEN LIEN VIET(LIEN VIET POST BANK)', 'SIAM COMMERCIAL BANK PUBLIC COMBANK', 'MAY BANK(HN)', 'BANK OF CHINA', 'JD MORGAN CHASE BANK', 'SUMITIMO MITSUI BANKING CORPORA..', 'BNP PARIBAS CHI NHANH HN', 'CONG THUONG VN(VIETTINBANK)', 'XUATNHAPKHAU(EXIMBANK)', 'SAI GON CONG THUONG(SAIGONBANK)', 'VIET NAM THINH VUONG(VP BANK)', 'QUAN DOI(MB)', 'DAI DUONG(OCEANBANK)', 'DAU KHI TOAN CAU(GPBANK)', 'DONG NAM A(SEABANK)', 'XANG DAU PETROLIMEX(PGBANK)', 'SAI GON- HA NOI(SHB)', 'TIEN PHONG(TIEN PHONG BANK)', 'CITI BANK HN', 'HANG HAI HN(MARITIME BANK)', 'QUOC DAN(NCB)', 'OVERSEA-CHINESE BANKING CORP LTD', 'CHINA CONSTRUCTION BANK CORPOR..', 'CIMB BANK', 'CHINH SACH XA HOI(VBSP)', 'XAY DUNG VN(CB BANK)', 'AN BINH(ABBANK)', 'A CHAY(ACB)', 'PHUONG DONG(OCB)', 'BAO VIET(BAO VIET BANK)', 'NAM A(NAM A BANK)', 'WOORI RANK VIET NAM', 'BANGKOK BANK HANOI', 'BANGKOK BANK HCM', 'CTI BANK', 'PUBLIC BANK VN', 'BPCE IOM', 'FIRST COMMERCIAL BANK HANOI', 'MIZUHO CORPORATE BANK LTD.,HN', 'BANK OF COMMUNICATIONS', 'DEUTSCHE BANK', 'CTBC (NHTM CHINATRUST)', 'NH SINOPAC', 'TAIPEI FUBONC.B', 'KIENLONG (KIEN LING BANK)', 'PHAT TRIEN TP HCM(HD BANK)', 'DAI CHUNG(PVCOMBANK)', 'BAC A(BAC A BANK)', 'VIET A (VIET A BANK)', 'PHAT TRIEN VIET NAM(VDB)', 'STANDARD CHARTERED BANK', 'HONG LEONG VN', 'BNP-PARIBAS CN HCM', 'HONG LEONG VN', 'BNP-PARIBAS CN HCM', 'MIZUHO CORPORATE BANK,LTD', 'INDUSTRIAL 7 COMMERCIAL BANK OF..', 'QUOC TE(VIB)', 'DAU TU VA PHAT TRIEN VN(BIDV)'];
  return (
    <div className="uploadcv">
   
      <Row className="menu">
        <Col span={2} />
        <Col span={20} className="task-bar">
          <div className="header">
            <div>Hãy upload CV của bạn tại đây</div>
          </div>
          <div className="form-body">
            <Row gutter={[16, 16]}>
              <Col span={18} ><iframe className="view-pdf" id="input" value={fileLink} src={fileLink} /></Col>
              <Col span={6}>
                <Upload
                  {...setting}
                  fileList={fileData}
                >
                  <Button>
                    <UploadOutlined /> Click to upload
            </Button>
                </Upload>
                <Form
                  {...layout}
                  name="basic"
                  // initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                >
                  <Form.Item
                    label="Tên ứng viên"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input placeholder="ex: username" />
                  </Form.Item>

                  <Form.Item
                    label="Tên hồ sơ hiển thị"
                    name="profile_title"
                    rules={[{ required: true, message: 'Please input your Job Title!' }]}
                  >
                    <Input placeholder="ex: Job Title" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input placeholder="ex: Email" />
                  </Form.Item>

                  <Form.Item
                    label="Điện thoại ứng viên"
                    name="phone_number"
                  >
                    <Input placeholder="ex: Phone Number" />
                  </Form.Item>

                  <Form.Item
                    // style={hiddenInput()}
                    name='bank_name'
                    label="Tên ngân hàng"  >
                    <Select
                      allowClear
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Bank name"
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
                  <Form.Item
                    label="Số tài khoản"
                    name="bank_number"
                  >
                    <Input placeholder="ex: Bank Number" />
                  </Form.Item>
                  <Form.Item
                    label="Chủ tài khoản"
                    name="bank_user"
                  >
                    <Input placeholder="ex: Bank User" />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Gửi ứng viên
              </Button>
                    <Button className="btn-cance" onClick={() => Router.push(`/`)} htmlType="button"   >
                      Hủy
              </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={2} />
      </Row>
    </div >
  );
}

export default connect()(UploadCV);