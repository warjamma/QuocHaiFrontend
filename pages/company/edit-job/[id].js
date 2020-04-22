import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Button, InputNumber, payload, Form, Row, Popconfirm, Col, Input, Select, Typography, Upload, message, Card, Alert, Text } from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateJob, getJobById, deleteJob } from '../../../containers/company/action';
import { uploadRequest } from '../../../containers/referred/actions';
import './styles.scss';
import { get } from 'lodash';


EditJob.propTypes = {

};

const role = 'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer'
const language = 'Java, JavaScript, Reactjs, Vuejs, Angular, .Net, Nodejs, ObjectC, Swift, Kotlin, Python, PHP, MySQL, HTML/ CSS, SQL, C#, C++, Spring, AWS, Linux, Cocos2dx, Unity, ASP.NET, Docker, Ruby'

const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

function EditJob(props) {
  const [form] = Form.useForm();
  const { dispatch, referred } = props
  const router = useRouter();
  const { id } = router.query;
  const initForm = get(referred, `job_detail.data.job`, []);
  const [fileLink, setFileLink] = useState('');
  const [fileData, setFileData] = useState([]);
  const onFinish = async (value) => {
    if(fileLink){
      value.jd_files = fileLink;
    }
    await dispatch(updateJob({ ...initForm, ...value }, id)).then(res => {
      if (res.status) {
        return message.success('Update Job successfully').then(res=>Router.push('/company/job-list'));
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
    let fileList = [...e.fileList];
    const last = fileList.slice(-1);
    setFileData(last);
    if(e.file.status === 'done') {
      onRequest(e.file, e.file.name);
    }
  };
  
  useEffect(() => {
    dispatch(getJobById({ id })).then(res => {
      const { data, status } = res;
      if (status) {
        form.setFieldsValue(data.data.job)
      }
    });
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

  const setting = {
    onChange: onChange,
    onRemove: () => setFileLink(''),
    multiple: true,
    listType: "picture",
    accept: ".pdf",
    customRequest: dummyRequest
  };

  return (
    <div className="uploadcv" style={{ backgroundColor: 'white' }}>
      <div className="header">
        <div>Chỉnh sửa công việc</div>
      </div>
      <Row gutter={[16, 16]}>
        {/* {get(referred, 'candidate_detail', [])} */}
        <Col span={18} ><iframe style={{ width: '100%', height: '100vh' }} id="input" value={fileLink} src={fileLink == '' ? (get(referred, 'job_detail.data.job.jd_files', []) == '' ? (fileLink) : (get(referred, 'job_detail.data.job.jd_files', []))) : (fileLink)}></iframe></Col>
        <Col span={6}>
          <Form
            form={form}
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item valuePropName="file">
              <Upload
                {...setting}
                fileList={fileData}
              >
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>

            {/* <Form.Item
              label="Tiêu đề"
              name="job_title"
              // rules={[{ required: true, message: 'This field is required !' }]}
              hasFeedback
            >
              <Input />
            </Form.Item> */}

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
              label="Ngôn ngữ"
              hasFeedback
              name="language"
              rules={[{ required: true, message: 'This field is required !' }]}
            >
              <Select mode="tags" style={{ width: '100%' }}>
                {
                  language.split(', ')
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
                <Form.Item
                  label="Từ"
                  hasFeedback
                  name="min_salary"
                  style={{ width: '100%' }}
                  rules={[{ required: true, message: 'This field is required !' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Đến"
                  hasFeedback
                  name="max_salary"
                  style={{ width: '100%' }}
                  rules={[{ required: true, message: 'This field is required !' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
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
            <Form.Item name="candidate_benefit" label="Phúc lợi">
              <Input.TextArea />
            </Form.Item>
            <Form.Item style={{ marginTop: 20 }}>
              <Button  style={{ margin: '0 8px' }} type="primary" htmlType="submit">
                Cập nhật
              </Button>

              {/* <Popconfirm
                title="Are you sure delete title?"
                onConfirm={() => handleDelete(get(referred, 'job_detail.data.job.id', []))}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
                  Xóa
                </Button>
              </Popconfirm> */}
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