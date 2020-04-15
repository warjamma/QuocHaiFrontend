import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Button,InputNumber,payload,Form,Row,Popconfirm, Col, Input,Select,Typography, Upload, message,Card,Alert,Text} from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateJob, getJobById,deleteJob } from '../../../containers/company/action';
import { uploadRequest } from '../../../containers/referred/actions';
import './styles.scss';
import { get } from 'lodash';


EditJob.propTypes = {

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
  jd_files: ''
}
const role = 'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer'

const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};

function EditJob(props) {
  const [form] = Form.useForm();
  const { dispatch, referred } = props
  const router = useRouter();
  const { id } = router.query;
  console.log('id', id)
  const initForm = get(referred, `job_detail.data.job`, []);
  const [fileLink, setFileLink] = useState('');
  const [fileData, setFileData] = useState('');
  const onFinish = async (value) => {
    value.jd_files = fileLink;
    await dispatch(updateJob({ ...initForm, ...value }, id)).then(res => {
      if (res.status) {
        return message.success('Update Job successfully');         
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
    dispatch(getJobById({ id })).then(res => form.resetFields());
  }, []);
  const handleDelete = async (job_id) => {
    console.log('Received values of fors', job_id);
    await dispatch(deleteJob(job_id)).then(res => {
      if (res.status) {
        Router.push('/company/job-list')
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
    <div className="uploadcv" style={{ backgroundColor: 'white' }}>
      <Row gutter={[16, 16]}>
        {/* {get(referred, 'candidate_detail', [])} */}
        <Col span={18} ><iframe style={{ width: '100%', height: '100%' }} id="input" value={fileLink} src={fileLink == '' ? (get(referred, 'job_detail.data.job.jd_files', []) == '' ? (fileLink) : (get(referred, 'job_detail.data.job.jd_files', []))) : (fileLink)}></iframe></Col>
        <Col span={6}>
          <Form
            form={form}
            initialValues={{
              job_title: get(referred, 'job_detail.data.job.job_title', []),
              job_role: get(referred, 'job_detail.data.job.job_role', []),
              job_levels: get(referred, 'job_detail.data.job.job_levels', []),
              locations: get(referred, 'job_detail.data.job.locations', []),
              vacancy_number: get(referred, 'job_detail.data.job.vacancy_number', []),
              team_size: get(referred, 'job_detail.data.job.team_size', []),
              currency: get(referred, 'job_detail.data.job.currency', []),
              min_salary: get(referred, 'job_detail.data.job.min_salary', []),
              max_salary: get(referred, 'job_detail.data.job.max_salary', []),
              reward: get(referred, 'job_detail.data.job.reward', []),
            }}
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item>
              <Upload accept=".pdf" name="jd_files" onRemove={() => setFileLink('')} onChange={onChange} listType="picture">
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
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

                    style={{ width: '50%', marginRight: 5 }}
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
            <Form.Item style={{ marginTop: 20 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>

              <Popconfirm
                title="Are you sure delete title?"
                onConfirm={() => handleDelete(get(referred, 'job_detail.data.job.id', []))}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
                  Xóa
                </Button>
              </Popconfirm>
              <Button onClick={() => Router.push('/company/job-list')} htmlType="button"  >
                Quay lại
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

export default connect(mapStateToProps, null)(EditJob);