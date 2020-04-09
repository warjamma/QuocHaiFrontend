import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Col,Row, Form, Input, Button,Upload, message } from 'antd';
import Router,{useRouter} from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { createCandidate } from '../../../containers/referred/actions';
import './styles.scss';
UploadCV.propTypes = {
  
};
const initForm = {
    availability: "none",
    certificate: [
        "Trash",
        "Trash"
    ],
    created_at: "2020-04-08T15:56:09.412901",
    current_salary: 4,
    cv: "https://d3t1myknaqth5d.cloudfront.net/files/1583658438.pdf",
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
  wrapperCol: { offset: 0, span: 18 },
};

function UploadCV(props) {
  const { dispatch } = props
  const router = useRouter();
  const { id } = router.query;

  const [fileName,setFileName]=useState('');
  const [fileData,setFileData]=useState('');
  const onFinish = async(value) => {
    console.log('Success:', value);
    await dispatch(createCandidate({...initForm, ...value})).then(res => {
      if(res.status) {
        return message.success('Create candidate successfully');
      }
      return message.error(res.error);
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    
  };
  const onChange = e =>{
        //Show pdf
    let selectedFile = e.target.files;
    let file = null;
    let fileName = "";
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        let fileToLoad = selectedFile[0];
        fileName = fileToLoad.name;
        // FileReader function for read the file.
        let fileReader = new FileReader();
        // Onload of file read the file content
        fileReader.onload = function(fileLoadedEvent) {
            file = fileLoadedEvent.target.result;
            // Print data in console
            //console.log(file);
            setFileData(file);
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
  }
  
  return (
    <div className="uploadcv" style={{backgroundColor:'white'}}>
      <Row gutter={[16, 16]}>
        <Col span={18} ><iframe style={{width:'100%',height:'400%'}}id="input" src={fileData}></iframe></Col>
        <Col span={6}>
        <Form
            {...layout}
            name="basic"
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item >
              <div className="upload-btn-wrapper">
                <button className="btn"><UploadOutlined /> Upload CV</button>
                <input type="file" name="myfile"  className='custom-file-input' onChange={onChange}/>
              </div>
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
              <Input placeholder="ex: Job Title"/>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="ex: Email"/>
            </Form.Item>

            <Form.Item
              label="Điện thoại ứng viên"
              name="phone_number"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input  placeholder="ex: Phone Number"/>
            </Form.Item>.

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Gửi ứng viên
              </Button>
                <Button onClick={() => Router.push('/referrer/job-detail/'+id+'')} htmlType="button" style={{ margin: '0 8px' }} >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Col>
    </Row>
    </div>
  );
}

export default connect() (UploadCV);