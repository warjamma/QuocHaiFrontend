import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, payload,Popconfirm, Form, Input, Button, Upload, message } from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { createCandidate, uploadRequest, getCandidateById, updateCandidate, deleteCandidate } from '../../../containers/referred/actions';
import './styles.scss';
import { get } from 'lodash';


EditCV.propTypes = {

};
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
}
const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

function EditCV(props) {
  const [form] = Form.useForm();
  const { dispatch, referred } = props
  const router = useRouter();
  const { id } = router.query;
  console.log('id', id)
  const initForm = get(referred, `candidate_detail.data.candidate`, []);
  const [fileLink, setFileLink] = useState('');
  const [fileData, setFileData] = useState('');
  const onFinish = async (value) => {
    value.cv = fileLink;
    await dispatch(updateCandidate({ ...initForm, ...value }, id)).then(res => {
      if (res.status) {
        return message.success('Update candidate successfully');
      }
      return message.error(res.error);
    })
  };
  const onRequest = async (value) => {
    await dispatch(uploadRequest({ value })).then(res => {
      setFileLink(res.data);
      if (res.status) {
        return message.success('Upload request');
      }
      return message.error(res.error);
    })

  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onChange = e => {
    if (e.file.status !== 'uploading') {
      console.log(e.file, e.fileList);
    }
    if (e.file.status === 'done') {
      console.log(e.file)
      onRequest(e.file, e.file.name);
    } else if (e.file.status === 'error') {
      message.error(`${e.file.name} file upload failed.`);
    }
  };
  useEffect(() => {
    console.log('vo day roi')
    dispatch(getCandidateById({ id })).then(res => form.resetFields());
  }, []);
  const handleDelete = async (candidate_id) => {
    console.log('Received values of fors', candidate_id);
    await dispatch(deleteCandidate(candidate_id)).then(res => {
      if (res.status) {
        return message.success('Delete candidate successfully');
      }
      return message.error(res.error);
    })
  };
  function cancel(e) {
    console.log(e);
    message.error('Cance');
  }
  return (
    <div className="EditCV" style={{ backgroundColor: 'white' }}>
      <Row gutter={[16, 16]}>
        {/* {get(referred, 'candidate_detail', [])} */}
        <Col span={18} ><iframe style={{ width: '100%', height: '100%' }} id="input" value={fileLink} src={fileLink == '' ? (get(referred, 'candidate_detail.data.candidate.cv', [])==''?(fileLink):(get(referred, 'candidate_detail.data.candidate.cv', []))) : (fileLink)}></iframe></Col>
        <Col span={6}>
          <Form
            form={form}
            initialValues={{
              name: get(referred, 'candidate_detail.data.candidate.name', []),
              email: get(referred, 'candidate_detail.data.candidate.email', []),
              profile_title: get(referred, 'candidate_detail.data.candidate.profile_title', []),
              phone_number: get(referred, 'candidate_detail.data.candidate.phone_number', []),
            }}
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item valuePropName="file">
              <Upload
                customRequest={dummyRequest}
                accept=".pdf"
                name="cv"
                onRemove={() => setFileLink('')}
                onChange={onChange}
                listType="picture"
              >
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>

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
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input placeholder="ex: Phone Number" />
            </Form.Item>.

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>

              <Popconfirm
                title="Are you sure delete title?"
                onConfirm={() => handleDelete(id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
                  Xóa
                </Button>
              </Popconfirm>
              <Button onClick={() => Router.push('/referrer/my-referred')} htmlType="button"  >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  console.log('memberdetail in state', state);
  const { referred } = state
  return { referred }
}

export default connect(mapStateToProps, null)(EditCV);