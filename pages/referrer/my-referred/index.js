import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { RedoOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { Table, Tag, Button,Form,Row, Col, Input,Select,Typography } from 'antd';
import { getListReferred } from '../../../containers/referred/actions';
import renderColorTag from '../../../ultils/renderColorStatus';
import { get } from 'lodash';
import moment from 'moment';
import './styles.scss'

const { Option } = Select;

const columns = [
  {
    title: 'Công việc',
    dataIndex: 'job',
    render: (text, record, index) => (
      <div>
        <Link href={`/job-detail/${record.job.id}`}><a>{get(record, 'job', {}).job_title}</a></Link>
      </div>
    )
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    render: (text, record, index) => (
      <div>
        <div>{get(record, 'candidate', {}).name}</div>
        <div>
          {
            get(record, 'candidate', {}).job_role.map(item => (
              <Tag key={item} color="blue">{item}</Tag>
            ))
          }
        </div>
      </div>
    )
  },
  {
    title: 'Level',
    dataIndex: 'created',
    align: 'center',
    render: (text, record, index) => (
      get(record, 'candidate', {}).job_level.map(item => (
        <Tag key={item} color="blue">{item}</Tag>
      ))
    )
  },
  {
    title: 'Mức Thưởng ($)',
    dataIndex: 'reward',
    align: 'center',
    render: (text, record, index) => <Tag color="blue">{get(record, 'job.reward')}$</Tag>,
  },
  {
    title: 'Onboarding date',
    dataIndex: 'status',
    align: 'center',
    render: (text, record, index) => <div>{moment(get(record, 'created_at', '')).format('DD-MM-YYYY')}</div>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    align: 'center',
    editable: true,
    width: 150,
    render: (text, record, index) => <Tag color={renderColorTag(record.status)}>{record.status.replace('_', ' ')}</Tag>,
  },
  {
    title: 'Hồ sơ',
    dataIndex: 'cv',
    align: 'center',
    width: 80,
    render: (text, record, index) => <Button onClick={() => window.open(get(record, 'candidate', {}).cv, "_blank")} type="primary" icon={<DownloadOutlined />} size="small" />,
  },
];

const initQuery = {
  company_name: '',
  key_word: '',
  status: null,
  offset: 0,
  limit: 10,
}

function MyReferred (props) {
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

  const handleTableChange = async (pagination) => {
    let clone = { ...query };
    clone['offset'] = pagination.current * 10;
    clone['limit'] = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListReferred(query));
  };

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
          <Col className="fiter-item" span={14}>
            <div className="title">Từ khóa: </div>
            <Input onChange={(e) => onChangeQuery('key_word', e.target.value)} placeholder="Key word..." />
          </Col>
          <Col className="fiter-item" span={6} >
            <div className="title">Công ty: </div>
            <Select
              style={{ width: '100%' }}
              placeholder="Công ty"
              onChange={(e) => onChangeQuery('company_name', e)}
            >
              <Option value="">Tất cả</Option>
            </Select>
          </Col>
          <Col className="fiter-item" span={4} >
            <div className="title">Trạng thái: </div>
            <Select
              style={{ width: '100%' }}
              placeholder="Trạng thái"
              onChange={(e) => onChangeQuery('status', e)}
            >
              <Option value="">All</Option>
              <Option value="pending">Pending</Option>
              <Option value="accepted">Accepted</Option>
              <Option value="reject">Rejected</Option>
              <Option value="on_board">On board</Option>
              <Option value="probation">Probation</Option>
              <Option value="done">Done</Option>
            </Select>
          </Col>
          <Col span={24}>
            <div className="filter-button">
              <Button onClick={() => handleFilter()} icon={<SearchOutlined />}  type="primary">Tìm kiếm</Button>
              <Button icon={<RedoOutlined />}  type="primary">Làm mới</Button>
            </div>
          </Col>
        </Row>   
      </Form>
    {/* end form */}
    <div >
      <Table
        loading={get(referred, 'is_loading', false)}
        bordered
        rowKey="id"
        columns={columns}
        dataSource={get(referred, 'list_referred.items.refer', [])}
        pagination={{
          pageSize: query.limit,
          total: get(referred, 'list_referred.extra_data.total', 0),
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50'],
          size: 'small'
        }}
        onChange={handleTableChange}
      />
    </div>
  </div>
  )
};

function mapStateToProps(state) {
  const { referred } = state
  return { referred }
}

export default connect(mapStateToProps, null)(MyReferred)
