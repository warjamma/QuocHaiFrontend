/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Upload, message } from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { createCandidate, uploadRequest } from '../../../containers/referred/actions';
import './styles.scss';

const initForm = {

  bank_name: "",
	bank_number: "",
	bank_user: "",
	cv: "",
	name: "",
	profile_title: "",
	email: "",
	phone_number: "",
	recommendation: "",
	availability: "none",
	job_role: ["backend", "frontend"],
	job_level: ["trash", "junior"],
	min_salary: 1,
	max_salary: 2,
	current_salary: 3,
	locations: ["Ho Chi Minh", "Trash"],
	skill: [
		{
			"field": "Trash",
			"years": "3 years",
			"rating": "Trash"
		}
	],
	industry_insight: [
		{
			"field": "Trash collecting",
			"years": "whole life",
			"rating": "Trash"
		}
	],
	language: [
		{
			"field": "Trash",
			"years": "whole life",
			"rating": "Trash"
		}
	],
	experience: [
		{
			"industry": "Trash collecting",
			"role": "Trash collector",
			"job_title": "Trash collector",
			"duration": 3
		}
	],
	education: [
		{
			"major": "Trash",
			"degree": "Trash"
		}
	],
	certificate: ["Trash", "Trash"]
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
    // data.phone_number = initForm.phone_number;
    if(data.cv){
      dispatch(createCandidate({ ...initForm, ...data }, id)).then(res => {
        if (res.status) {
          return message.success('Create candidate successfully').then(() => Router.push(`/job-detail/${id}`));
        }
        return message.error(res.error);
      });
    }
    else{
      return message.error("Please upload your cv !");
    }
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

  return (
    <div className="uploadcv" style={{ backgroundColor: 'white' }}>
      <div className="header">
        <div>Hồ sơ ứng viên</div>
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
              </Form.Item>.

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Gửi ứng viên
              </Button>
                <Button className="btn-cance" onClick={() => Router.push(`/job-detail/${id}`)} htmlType="button"   >
                  Hủy
              </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

      </div>
    </div>
  );
}

export default connect()(UploadCV);