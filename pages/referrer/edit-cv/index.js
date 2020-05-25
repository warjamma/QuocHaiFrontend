/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Col, Row, Popconfirm, Form, Input, Button, Upload, message } from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { get, cloneDeep } from 'lodash';
import { getCandidateById, updateCandidate, deleteCandidate,uploadRequest } from '../../../containers/referred/actions';
import './styles.scss';

const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

function EditCV(props) {
  const [form] = Form.useForm();
  const { dispatch, referred } = props;
  const router = useRouter();
  const { id,status } = router.query;
  const initForm = get(referred, `candidate_detail.data.candidate`, []);
  const [fileLink, setFileLink] = useState('');
  const [fileData, setFileData] = useState([]);
  const disabledBtn = () => {
    if(status==='on_board'){
      return true;
    }
      return false;
  };
  const onFinish = async (value) => {
    const data = cloneDeep(value);
    if(fileLink) {
      data.cv = fileLink;
    }
    data.bank_name="";
    data.bank_number="";
    data.bank_user="";
    await dispatch(updateCandidate({ ...initForm, ...data }, id)).then(res => {
      if (res.status) {
        Router.push('/referrer/my-referred');
        return message.success('Update candidate successfully');
      }
      return message.error(res.error);
    });
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
    dispatch(getCandidateById({ id })).then(res => {
      const { data, status } = res;
      console.log(data);
      if (status) {
        form.setFieldsValue(data.data.candidate);
      }
    });
  }, []);

  const handleDelete = async (candidateId) => {
    await dispatch(deleteCandidate(candidateId)).then(res => {
      if (res.status) {
        Router.push('/referrer/my-referred');
        return message.success('Delete candidate successfully');
      }
      return message.error(res.error);
    });
  };

  function cancel() {
    message.error('Cancel');
  }

  const setting = {
    onChange,
    onRemove: () => setFileLink(''),
    multiple: true,
    listType: "picture",
    accept: ".pdf",
    customRequest: dummyRequest
  };

  return (
    <div className="Edit-CV" style={{ backgroundColor: 'white' }}>
      <div className="header">
        <div>Hồ sơ ứng viên</div>
      </div>
      <div className="form-body">
      <Row gutter={[16, 16]}>
        {/* {get(referred, 'candidate_detail', [])} */}
        <Col span={18}>
          <iframe  className="view-pdf" id="input" value={fileLink} src={fileLink === '' ? (get(referred, 'candidate_detail.data.candidate.cv', []) === ''?(fileLink):(get(referred, 'candidate_detail.data.candidate.cv', []))) : (fileLink)} /></Col>
        <Col span={6}>
          <Upload
            {...setting}
            fileList={fileData}
          >
            <Button disabled={disabledBtn()}>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload>
          <Form
            form={form}
            {...layout}
            name="basic"
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

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" disabled={disabledBtn()}>
                Cập nhật
              </Button>

              <Popconfirm
                title="Are you sure delete title?"
                onConfirm={() => handleDelete(id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                {/* <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
                  Xóa
                </Button> */}
              </Popconfirm>
              <Button className="btn-cance"  onClick={() => Router.push('/referrer/my-referred')} htmlType="button"  >
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

function mapStateToProps(state) {
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(EditCV);