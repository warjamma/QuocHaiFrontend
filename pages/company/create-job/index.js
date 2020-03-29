import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Select, Button, InputNumber, Upload } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import './styles.scss';

const layout = {
  labelCol: {
    span: 24 
  },
};

function CreateJob (props) {

  const onFinish = (value) => {
    console.log(value)
  } 

  useEffect(() => {
    console.log('hêr1321')
  }, []);

  return (
    <div className="create-job">
      <div className="create-job__header">
        <div>Tạo công việc mới</div>
      </div>
      {/* <Row className="create-job__body">
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
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item
                    label="Vị trí"
                    hasFeedback
                    name="role"
                    rules={[{ required: true, message: 'This field is required !' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Level"
                    hasFeedback
                    name="level"
                    rules={[{ required: true, message: 'This field is required !' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Form.Item
                  style={{ width: '100%', marginRight: 16 }}
                  label="Địa điểm"
                  hasFeedback
                  name="location"
                  rules={[{ required: true, message: 'This field is required !' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số lượng"
                  hasFeedback
                  name="slot"
                  rules={[{ required: true, message: 'This field is required !' }]}
                >
                  <div><InputNumber /></div>
                </Form.Item>
                <Form.Item
                  label="Team size"
                  hasFeedback
                  name="team_size"
                  rules={[{ required: true, message: 'This field is required !' }]}
                >
                  <div><InputNumber /></div>
                </Form.Item>
              </div>
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
            <Col span={7}>
              <Form.Item label="Upload JD">
                <Form.Item name="dragger" valuePropName="fileList" noStyle>
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
                <Button size="large" style={{ marginRight: 20 }} type="primary" htmlType="submit">
                  <span style={{ fontSize: 13, fontWeight: 'bold' }}>Hoàn Thành</span>
                </Button>
                <Button size="large" >
                  <span style={{ fontSize: 13, fontWeight: 'bold' }}>Làm mới</span>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Row> */}
    </div>
  )
}

export default CreateJob