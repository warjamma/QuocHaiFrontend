/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Upload, message } from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { createCandidate,uploadRequest } from '../../../containers/referred/actions';
import './styles.scss';

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
    data.phone_number=initForm.phone_number;
    dispatch(createCandidate({ ...initForm, ...data },id )).then(res => {
      if (res.status) {
        return message.success('Create candidate successfully').then(() => Router.push(`/job-detail/${id}`));
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
    if(e.file.status === 'done') {
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

  return (
    <div className="uploadcv" style={{ backgroundColor: 'white' }}>
      <div className="header">
        <div>Hồ sơ ứng viên</div>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={18} ><iframe style={{ width: '100%', height: '100vh' }} id="input" value={fileLink} src={fileLink} /></Col>
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
            </Form.Item>.

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Gửi ứng viên
              </Button>
              <Button onClick={() => Router.push(`/job-detail/${  id  }`)} htmlType="button" style={{ margin: '0 8px' }} >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default connect()(UploadCV);