import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form, Select, Input, Button, Upload, message, InputNumber } from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { createJob } from '../../../containers/company/action';
import { uploadRequest } from '../../../containers/referred/actions';
import './styles.scss';
UploadCV.propTypes = {

};
const initForm = {
  job_title: "",
  job_levels: [],
  job_role: [],
  locations: [],
  min_salary: null,
  max_salary: null,
  vacancy_number: null,
  responsibility: "none",
  expectation: "none",
  candidate_benefit: "none",
  priority: "none",
  note: "none",
  education: "University",
  language: [
    {
      field: "English",
      years: "3 years"
    }
  ],
  industry_knowledge: [
    {
      field: "",
      years: "1 years"
    }
  ],
  skill_requirement: [
    {
      field: "",
      years: "1 years"
    }
  ],
  report_to: "",
  team_size: null,
  interview_process: "",
  email_cc: "",
  use_test: true,
  reward: null,
  currency: "",
  jd_files:''
}
const role = 'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer'

const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 18 },
};

function UploadCV(props) {
  const { dispatch } = props
  const router = useRouter();
  const { id } = router.query;

  const [fileLink, setFileLink] = useState('');
  const [fileData, setFileData] = useState('');
  const onFinish = async (value) => {
    value.jd_files = fileLink;
    await dispatch(createJob({ ...initForm, ...value }, id)).then(res => {
      if (res.status) {
        return message.success('Create job successfully'),
          Router.push('/company/job-list')
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
    onRequest(e.target.files, e.target.name);

  }

  return (
    <div className="uploadcv" style={{ backgroundColor: 'white' }}>
      <Row gutter={[16, 16]}>
        <Col span={18} ><iframe style={{ width: '100%', height: '400%' }} id="input" value={fileLink} src={fileLink}></iframe></Col>
        <Col span={6}>
          <Form
            {...layout}
            name="basic"
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            initialValues={{min_salary:1000,max_salary:1000,reward:1000,vacancy_number:1}}
          >
            <Form.Item name='jd_files'  >
              <div className="upload-btn-wrapper">
                <button className="btn"><UploadOutlined /> Upload JD</button>
                <input type="file" name="jd_files" className='custom-file-input' onChange={onChange} />
              </div>
            </Form.Item>

            <Form.Item
              label="Tiêu đề"
              name="job_title"
              rules={[{ required: true, message: 'This field is required !' }]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Vị trí"
              hasFeedback
              name="job_role"
              rules={[{ required: true, message: 'This field is required !' }]}
            >
              <Select mode="multiple" style={{ width: '100%' }}>
                {
                  role.split(', ')
                    .map(item => (
                      <Select.Option key={item} value={item}>{item}</Select.Option>
                    ))
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="Cấp độ"
              hasFeedback
              name="job_levels"
              rules={[{ required: true, message: 'This field is required !' }]}
            >
              <Select mode="multiple" style={{ width: '100%' }}>
                {
                  'C-level, Department head, Director, Junior, Manager, Middle, Senior, Specialist, Team Leader'.split(', ')
                    .map(item => (
                      <Select.Option key={item} value={item}>{item}</Select.Option>
                    ))
                }
              </Select>
            </Form.Item>
            <Form.Item
              style={{ width: '100%', marginRight: 16 }}
              label="Địa điểm"
              hasFeedback
              name="locations"
              rules={[{ required: true, message: 'This field is required !' }]}
            >
              <Select mode="multiple" style={{ width: '100%' }}>
                {
                  ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng']
                    .map(item => (
                      <Select.Option key={item} value={item}>{item}</Select.Option>
                    ))
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="Số lượng"
              hasFeedback
              name="vacancy_number"
              rules={[{ required: true, message: 'This field is required !' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
              // defaultValue={1}
              />
            </Form.Item>
            <Form.Item
              label="Kích cỡ team"
              hasFeedback
              name="team_size"
              rules={[{ required: true, message: 'This field is required !' }]}
            >
              <Select style={{ width: '100%' }}>
                <Select.Option value="large">Lớn</Select.Option>
                <Select.Option value="medium">Vừa</Select.Option>
                <Select.Option value="small">Nhỏ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Tiền tệ"
              hasFeedback
              name="currency"
              rules={[{ required: true, message: 'This field is required !' }]}
              style={{ width: '100%' }}
            >
              <Select style={{ width: '100%' }}>
                <Select.Option disabled value="VNĐ">VNĐ</Select.Option>
                <Select.Option value="USD">USD</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Mức lương"
              hasFeedback
              style={{ width: '100%' }}
            >
              <Input.Group className="flex-input" compact>
                {/* <span className="content">Từ</span> */}
                <Form.Item
                  label="Từ"
                  hasFeedback
                  name="min_salary"
                  rules={[{ required: true, message: 'This field is required !' }]}
                >
                  <InputNumber
                  
                    style={{ width: '50%',marginRight:5}}
                    //defaultValue={1000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                {/* <span className="content">đến</span> */}
                <Form.Item
                  label="Đến"
                  hasFeedback
                  name="max_salary"
                  rules={[{ required: true, message: 'This field is required !' }]}
                >
                  <InputNumber
                    style={{ width: '50%' }}
                    //defaultValue={1000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
                    label="Mức thưởng"
                    hasFeedback
                    name="reward"
                    rules={[{ required: true, message: 'This field is required !' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      //defaultValue={1000}
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Gửi ứng JD
              </Button>
              <Button onClick={() => Router.push('/company/job-list')} htmlType="button" style={{ margin: '0 8px' }} >
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