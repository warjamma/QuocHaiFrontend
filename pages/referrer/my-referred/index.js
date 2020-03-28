import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import { Table, Tag, Button,Form,Row, Col, Input,Select,Typography } from 'antd';
import { getListReferred } from '../../../containers/referred/actions';
import { get } from 'lodash';
import './styles.scss'

const { Title } = Typography;
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
    title: 'Referred day',
    dataIndex: 'referredDay',
    key: 'referredday',
    width: 200,
    align: 'center'
  },
  {
    title: 'Onboarding date',
    dataIndex: 'onboarDate',
    key: 'onboarDate',
    width: 200,
    align: 'center'
  },
  {
    title: 'Salary (USD)',
    dataIndex: 'salary',
    key: 'salary',
    width: 140,
    align: 'center',
    render: salary => (
      <span>
        <Tag color="red">{salary}</Tag>
      </span>
    )
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
    referredDay: '13/01/2020',
    onboarDate: '18/03/2020',
    status: 'Pending',
    candidate: 'Phạm Huy Hoàng',
    mail:'lgold141@gmail.com',
    phoneNumber:'+44 7922.819.535',
    salary: '1000$ - 1500$',
  },
  {
    key: '2',
    jobTitile: 'Full-stack Developer',
    referredDay: '13/01/2020',
    onboarDate: '18/03/2020',
    status: 'Pending',
    candidate: 'Nguyễn Viết Chánh',
    mail:'lgold141@gmail.com',
    phoneNumber:'+44 7922.819.535',
    salary: '1000$ - 1500$',
  },
];

const initQuery = {
  company_name: '',
  key_word: '',
  status: null,
  offset: 0,
  limit: 20,
}

function MyReferred (props) {
  const { dispatch, referred } = props
  const [query, setQuery] = useState(initQuery)

  const handleFilter = async (key, value) => {
    let clone = { ...query }
    clone[key] = value
    await dispatch(getListReferred(clone))
  }

  return (
    <div  >
     <div>
        <Title level={2}>My Profile</Title>
      </div>
    <Form
      style={{ paddingTop:30 }}
      name="advanced_search"
      className="ant-advanced-search-form"
      labelCol={{ span: 4 }}
      layout="horizontal"
    >
      <Row gutter={[16, 16]}>
        <Col span={8} >
          <div>Từ khóa: </div>
          <Input onClick={(e) => handleFilter('key_word', e.target.value)} placeholder="Key word..." />
        </Col>
        <Col span={8} >
          <div>Công ty: </div>
          <Select
            placeholder="Select a option and change input text above"
            onChange={(e) => handleFilter('company_name', e)}
          >
            <Option value="KMS">KMS</Option>
            <Option value="Rock Ship">Rock Ship</Option>
            <Option value="ABC">ABC</Option>
          </Select>
        </Col>
        <Col span={8} >
          <div>Trạng thái: </div>
          <Select
            placeholder="Select a option and change input text above"
            onChange={(e) => handleFilter('status', e)}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Cancel">Cancel</Option>
          </Select>
        </Col>
      </Row>   
    </Form>

    {/* end form */}
    <div >
      <Table bordered columns={columns} dataSource={get(referred, 'list_referred.item.refer', [])} expandable={{
        expandedRowRender: record => <p style={{ margin: 0 }}>{record.mail}&nbsp;{record.phoneNumber}</p>,
        rowExpandable: record => record.phoneNumber !== 'Not Expandable',
      }}/>
    </div>
  </div>
  )
};

MyReferred.getInitialProps = async function({ reduxStore }) {
  reduxStore.dispatch(getListReferred({offset: 0, limit: 20}))
  const { referred } = reduxStore.getState()
  return { referred }
}

export default connect(null, null)(MyReferred)