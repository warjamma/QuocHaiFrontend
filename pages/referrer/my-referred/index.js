import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Tag, Button,Form,Row, Col, Input,Select,Typography } from 'antd';
import Link from 'next/link'
const { Title } = Typography;
function MyReferred () {
  const { Option } = Select;
  
  const columns = [
    {
      title: 'Candidate',
      dataIndex: 'candidate',
      key: 'candidate',
      width: 200,
      render: (text => (<a href="#">{text}</a>) ,
            mail=><div>{mail}  </div>,
            phoneNumber=> <div>{phoneNumber}</div> )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: status => (
        <span>
          <Tag color="warning">{status}</Tag>
        </span>
      )
    },
    {
      title: 'Referred',
      dataIndex: 'referred',
      key: 'referred',
      width: 200,
      align: 'center'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 200,
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitile',
      key: 'jobTitile',
      render: text => <a>{text}</a>,
    },
  
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (text, record) => (
        <span>
          <Button>Edit</Button>
        </span>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '2',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },  
    {
      key: '3',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },  
    {
      key: '4',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '5',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '6',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '7',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '8',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '9',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '10',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '11',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '12',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '13',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '14',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '15',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '16',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '17',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '18',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '19',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '20',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '21',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '22',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
    {
      key: '23',
      jobTitile: 'Backend Developer',
      referred: '03',
      date: '18/03/2020',
      status: 'Pending',
      candidate: 'Phạm Huy Hoàng',
      mail:'huyhoang8a5@gmail.com',
      phoneNumber:'+44 7922.819.535'
    },
  ];
  return (
    <div  >
     <div>
        <Title level={2}>My Referred</Title>
      </div>
    <Form
      style={{ paddingTop:30 }}
      name="advanced_search"
      className="ant-advanced-search-form"
      labelCol={{ span: 4 }}
      layout="horizontal"
    >
      <Row gutter={[16, 16]}>
      <Col span={12} >
        <Form.Item name={'Company'} label={'Company'} style={{ textAlign: 'left' }}  >
          <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
            <Option value="KMS">KMS</Option>
            <Option value="Rock Ship">Rock Ship</Option>
            <Option value="ABC">ABC</Option>
        </Select>
        </Form.Item>
      </Col>
      <Col span={12} >
        <Form.Item name={'Status'} label={'Status'}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
            <Option value="Pending">Pending</Option>
            <Option value="Cancel">Cancel</Option>
            <Option value="Completed">Completed</Option>
        </Select>
        </Form.Item>
      </Col>
      </Row>   
    </Form>

    {/* end form */}
    <div >
      <Table bordered columns={columns} dataSource={data} expandable={{
    expandedRowRender: record => <p style={{ margin: 0 }}>{record.mail}&nbsp;{record.phoneNumber}</p>,
    rowExpandable: record => record.phoneNumber !== 'Not Expandable',
  }}/>
    </div>
  </div>
  )
};

MyReferred.getInitialProps = async function({ reduxStore }) {
  return {}
}

export default connect(null, null)(MyReferred)