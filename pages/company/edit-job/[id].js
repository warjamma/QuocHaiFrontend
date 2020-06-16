/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Button, InputNumber, Form, Row, Col, Input, Select, Upload, message,Modal, Space } from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { get, cloneDeep } from 'lodash';
import  moment from 'moment';
import { updateJob, getJobById, extendJob } from '../../../containers/company/action';
import { uploadRequest } from '../../../containers/referred/actions';
import './styles.scss';

const role = [['Account Management'], ['Administration'], ['Backend'], ['Branding'], ['Business Analyst'], ['Business Development'], ['CEO'], ['CFO'], ['CMO'], ['Consultant'], ['Content Creator'], ['COO'], ['CTO'], ['Customer Service'], ['Data Analyst'], ['Designer'], ['Developer'], ['DevOps'], ['Digital Marketing'], ['Engineering'], ['Finace/Accounting'], ['Frontend'], ['Fullstack'], ['Game'], ['General management'], ['HR'], ['HSE'], ['Import - Export'], ['Logistic'], ['maintenance'], ['Management'], ['Market Research'], ['marketing'], ['Merchandising'], ['Mobile'], ['Office Management'], ['Operation Management'], ['Operations'], ['Planning'], ['Product Management'], ['Production'], ['Project Management'], ['Public Relation'], ['QA/QC'], ['Quality Control'], ['Recruitment'], ['Research & Development'], ['Researcher'], ['Sales'], ['Scrum Master'], ['Software Architect'], ['Software Development'], ['Supply Chain'], ['Teacher'], ['Techical Sales'], ['Tester'], ['Traditional Marketing'], ['Trainer']];
const language = 'Java, JavaScript, Reactjs, Vuejs, Angular, .Net, Nodejs, ObjectC, Swift, Kotlin, Python, PHP, MySQL, HTML/ CSS, SQL, C#, C++, Spring, AWS, Linux, Cocos2dx, Unity, ASP.NET, Docker, Ruby';

const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};

const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

function EditJob(props) {
  const [form] = Form.useForm();
  const { dispatch, referred } = props;
  const router = useRouter();
  const { id } = router.query;
  const initForm = get(referred, `job_detail.data.job`, []);
  const [fileLink, setFileLink] = useState('');
  const [fileData, setFileData] = useState([]);
  // const  warning=()=> {
  //   Modal.warning({
  //     title: 'Bạn đã hết số lần post jobs',
  //     content: 'Vui lòng mua thêm gói post jobs để tiếp tục gia hạn',
  //   });
  // };
 
  const onFinish = async (value) => {
    const data = cloneDeep(value);
    if(fileLink){
      data.jd_files = fileLink;
    }
    // if(data.post_job){
    //   warning();
    // }
    await dispatch(updateJob({ ...initForm, ...data }, id)).then(res => {
      if (res.status) {
        return message.success('Update Job successfully').then(() => Router.push('/company/job-list'));
      }
      return message.error(res.error);
    });
    // if (value) {
    //   const date2 = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSz');
    //   const payload = { expire_at: date2};
    //   // console.log(date);
    //   dispatch(extendJob(id, payload)).then((res2) => {
    //     if (res2.status) {
    //       return message.success('Extend succes');
    //     }
    //     return message.error(res2.error);
    //   });
    // }
  };
  const onRequest = async (value) => {
    await dispatch(uploadRequest({ value })).then(res => {
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
  
  useEffect(() => {
    dispatch(getJobById({ id })).then(res => {
      const { data, status } = res;
      if (status) {
        form.setFieldsValue(data.data.job);
      }
    });
  }, []);

  // const handleDelete = async (jobId) => {
  //   console.log('Received values of fors', jobId);
  //   await dispatch(deleteJob(jobId)).then(res => {
  //     if (res.status) {
  //       Router.push('/company/job-list');
  //       return message.success('Delete candidate successfully');
  //     }
  //     return message.error(res.error);
  //   });
  // };

  // function cancel(e) {
  //   message.error('Cance');
  // }

  const setting = {
    onChange,
    onRemove: () => setFileLink(''),
    multiple: true,
    listType: "picture",
    accept: ".pdf",
    customRequest: dummyRequest
  };
  const dayCreate =get(referred, 'job_detail.data.job.created_at', []);
  // console.log('day neeeeeeeeee',moment(day_create).format('YYYY-MM-DD'));
  // const ab = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSz');
  const ab = moment().format('YYYY-MM-DD');
  // console.log('abbbbbbbbbb',ab);
  const now = moment(ab);  ;
  // console.log(now ) ;// 31
  // const end = moment('2020-05-01');
  // console.log(end ) ;// 31
  const dayend=now.diff(dayCreate, 'days');
  console.log(dayend) ;
  return (
    <div className="uploadcv" style={{ backgroundColor: 'white' }}>
      <div className="header">
        <div>Chỉnh sửa công việc</div>
      </div>
      <Row gutter={[16, 16]}>
        {/* {get(referred, 'candidate_detail', [])} */}
        <Col span={18} ><iframe style={{ width: '100%', height: '100vh' }} id="input" value={fileLink} src={fileLink === '' ? (get(referred, 'job_detail.data.job.jd_files', []) === '' ? (fileLink) : (get(referred, 'job_detail.data.job.jd_files', []))) : (fileLink)} /></Col>
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
              <Select style={{ width: '100%' }}>
                {
                  role.map(item => (
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
                // defaultValue={1000}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item name="candidate_benefit" label="Phúc lợi">
              <Input.TextArea />
            </Form.Item>
            <div style={{color:'red',fontWeight:'bold'}}>THỜI GIAN KẾT THÚC CÔNG VIỆC CÒN {20-dayend} NGÀY</div>
            <Form.Item
              label="Gia hạn công việc"
              hasFeedback
              // name="post_job"
            >
              <Select style={{ width: '100%' }} placeholder="Chọn kiểu gia hạn">
                <Select.Option value="post-hot">1 tháng POST HOT -Còn 03</Select.Option>
                <Select.Option value="post">1 tháng POST THƯỜNG - Còn 02</Select.Option>
              </Select>
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
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(EditJob);