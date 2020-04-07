import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Col,Row, Form, Input, Button,Upload, message } from 'antd';
import Router from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import './styles.scss';
UploadCV.propTypes = {
  
};
const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 18 },
};
const propss = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  previewFile(file) {
    console.log('Your upload file:', file);
    // Your process logic. Here we just mock to the same file
    return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then(res => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};
function UploadCV(props) {
  const [fileName,setFileName]=useState('');
  const [fileData,setFileData]=useState('');
  const onFinish = values => {
    console.log('Success:', values);
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
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="ex: username" />
            </Form.Item>

            <Form.Item
              label="Tên hồ sơ hiển thị"
              name="jobTitile"
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
              name="phone"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input  placeholder="ex: Phone Number"/>
            </Form.Item>.

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Gửi ứng viên
              </Button>
                <Button onClick={() => Router.push('/referrer/job-detail')} htmlType="button" style={{ margin: '0 8px' }} >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Col>
    </Row>
    </div>
  );
}

export default UploadCV;