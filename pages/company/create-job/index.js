import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import { Row, Col, Input, Form, Select, Button, InputNumber, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import { createJob } from '../../../containers/company/action';
import './styles.scss';

const layout = {
  labelCol: {
    span: 24
  },
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
  currency: ""
}

const role = 'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer'

function CreateJob(props) {
  const { dispatch } = props

  const onFinish = async (value) => {
    await dispatch(createJob({ ...initForm, ...value })).then(res => {
      if (res.status) {
        return (
          message.success('Create job successfully'),
          Router.push('/company/job-list')
        );
      }
      return message.error(res.error);
    })
  }

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="create-job">
      <div className="create-job__header">
        <div>Tạo công việc mới</div>
      </div>
      <Row className="create-job__body">
        <Form
          {...layout}
          name="basic"
          style={{ width: '100%' }}
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col span={17}>
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
              <Row gutter={[16, 0]}>
                <Col span={14}>
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
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Số lượng"
                    hasFeedback
                    name="vacancy_number"
                    rules={[{ required: true, message: 'This field is required !' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      defaultValue={1}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
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
                </Col>
              </Row>
              <Form.Item
                label="Tiền tệ"
                hasFeedback
                name="currency"
                rules={[{ required: true, message: 'This field is required !' }]}
                style={{ width: '120px' }}
              >
                <Select style={{ width: '100%' }}>
                  <Select.Option disabled value="VNĐ">VNĐ</Select.Option>
                  <Select.Option value="USD">USD</Select.Option>
                </Select>
              </Form.Item>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item
                    label="Mức lương"
                    hasFeedback
                  >
                    <Input.Group className="flex-input" compact>
                      <span className="content">Từ</span>
                      <Form.Item
                        hasFeedback
                        name="min_salary"
                        rules={[{ required: true, message: 'This field is required !' }]}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          defaultValue={1000}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                      <span className="content">đến</span>
                      <Form.Item
                        hasFeedback
                        name="max_salary"
                        rules={[{ required: true, message: 'This field is required !' }]}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          defaultValue={1000}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Mức thưởng"
                    hasFeedback
                    name="reward"
                    rules={[{ required: true, message: 'This field is required !' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      defaultValue={1000}
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={7}>
              <Form.Item label="Chi tiết công việc">
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p style={{ fontSize: 12 }}>Click or drag file to this area to upload</p>
                    <p style={{ fontSize: 12 }} className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col span={12}>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button size="large" style={{ marginRight: 20, fontSize: 13, fontWeight: 'bold' }} type="primary" htmlType="submit">
                  Hoàn Thành
                </Button>
                <Button size="large" style={{ fontSize: 13, fontWeight: 'bold' }} onClick={() => { Router.push('/company/job-list') }}>
                  Hủy bỏ
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  )
}

export default connect()(CreateJob);
