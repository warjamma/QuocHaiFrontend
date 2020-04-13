import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { RedoOutlined, SearchOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Table, Tag, Button, Form, Row, Col, Input, Select, Typography } from 'antd';
import { getListReferred } from '../../../containers/referred/actions';
import { get } from 'lodash';
import moment from 'moment'
import './styles.scss'
import Router from 'next/router';

const { Title } = Typography;
const { Option } = Select;
const initQuery = {
  company_name: '',
  key_word: '',
  // status: null,
  offset: 0,
  limit: 10,
}

const columns = [
  {
    title: 'Candidate',
    dataIndex: 'candidate',
    key: 'candidate',
    width: 200,
    render:(record,text)=> <a>{record.name}</a>, 
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    align: 'center',
    render: (record) => {
      return (
        <span>
          <Tag color="warning">{record}</Tag>
        </span>
      )
    }
  },
  {
    title: 'Referred day',
    dataIndex: 'updated_at',
    key: 'updated_at',
    width: 200,
    align: 'center',
    render:(text, record, index)=>(
      <div>{moment(record.updated_at).subtract(10, 'days').calendar()}</div>
      )
  },
  {
    title: 'Onboarding date',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 200,
    align: 'center',
    render:(text, record, index)=>(
      <div>{moment(record.created_at).subtract(10, 'days').calendar()}</div>
      )
  },
  {
    title: 'Salary (USD)',
    dataIndex: 'job',
    key: 'salary',
    width: 140,
    align: 'center',
    render: (record,text) => 
      <span>
        <Tag color="red">{record.min_salary}$ - {record.max_salary}$</Tag>
      </span>
    
  },
  {
    width: 200,
    title: 'Job Title',
    dataIndex: 'job',
    key: 'job',
    render:(record,text)=> <a>{record.job_title}</a>,
  },

  {
    title: 'Action',
    key: 'action',
    dataIndex: 'candidate_id',
    width: 100,
    align: 'center',
    render: (candidate_id) => (
      <span>
        <Button style={{margin:2}}onClick={() => Router.push('/referrer/edit-cv/'+candidate_id+'')}>Edit</Button>
        {/* <Button >Delete</Button> */}
      </span>
    ),
  },
];



function MyReferred(props) {
  const { dispatch, referred } = props
  const [query, setQuery] = useState(initQuery)

  const onChangeQuery = async (key, value) => {
    let clone = { ...query }
    clone[key] = value
    setQuery(clone)
  }

  const handleFilter = async () => {
    await dispatch(getListReferred(query))
  }

  useEffect(() => {
    dispatch(getListReferred(query));
  }, []);

  return (
    <div className="my-referred-container">
      <div className="header">
        <div>Hồ sơ của bạn (40)</div>
      </div>
      <Form
        name="advanced_search"
        className="ant-advanced-search-form"
        labelCol={{ span: 4 }}
        layout="horizontal"
      >
        <Row gutter={[16, 0]}>
          <Col className="fiter-item" span={8}>
            <div className="title">Từ khóa: </div>
            <Input onClick={(e) => onChangeQuery('key_word', e.target.value)} placeholder="Key word..." />
          </Col>
          <Col className="fiter-item" span={8} >
            <div className="title">Công ty: </div>
            <Select
              style={{ width: '100%' }}
              placeholder="Select a option and change input text above"
              onChange={(e) => onChangeQuery('company_name', e)}
            >
              <Option value="KMS">KMS</Option>
              <Option value="Rock Ship">Rock Ship</Option>
              <Option value="ABC">ABC</Option>
            </Select>
          </Col>
          {/* <Col className="fiter-item" span={8} >
            <div className="title">Trạng thái: </div>
            <Select
              style={{ width: '100%' }}
              placeholder="Select a option and change input text above"
              onChange={(e) => onChangeQuery('status', e)}
            >
              <Option value="Pending">Pending</Option>
              <Option value="Cancel">Cancel</Option>
            </Select>
          </Col> */}
          <Col span={24}>
            <div className="filter-button">
              <Button onClick={() => handleFilter()} icon={<SearchOutlined />} type="primary">Tìm kiếm</Button>
              <Button icon={<RedoOutlined />} type="primary">Làm mới</Button>
            </div>
          </Col>
        </Row>
      </Form>
      {/* end form */}
      <div >
        <Table
          bordered
          rowKey="id"
          columns={columns}
          dataSource={get(referred, 'list_referred.items.refer', [])}
          expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.candidate.email}&nbsp;{record.candidate.phone_number}</p>,
            rowExpandable: record => record.phoneNumber !== 'Not Expandable',
          }} />
        {console.log(get(referred,'list_referred.items.refer',[]))}
      </div>
    </div>
  )
};

function mapStateToProps(state) {
  //console.log('state', state)
  const { referred } = state
  return { referred }
}

export default connect(mapStateToProps, null)(MyReferred)
