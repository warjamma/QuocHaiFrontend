import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { RedoOutlined, SearchOutlined, DownloadOutlined, DeleteTwoTone ,EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { Table, Tag, Button, Popconfirm, Form, Row, Col, message, Input, Select, Spin } from 'antd';
import { getListReferred, deleteCandidate } from '../../../containers/referred/actions';
import { getAllCompany } from '../../../containers/company/action';
import renderColorTag from '../../../ultils/renderColorStatus';
import { get, debounce } from 'lodash';
import moment from 'moment';
import './styles.scss'
import Router from 'next/router';

const { Option } = Select;
const initQuery = {
  company_name: '',
  key_word: '',
  // status: null,
  offset: 0,
  limit: 10,
}



function MyReferred(props) {
  const columns = [
    {
      title: 'Vị trí',
      dataIndex: 'job',
      render: (text, record, index) => (
        // <div>
        //   <Link href={`/job-detail/${record.job.id}`}><a className="job-title">{get(record, 'job', {}).job_title}</a></Link>
        // </div>
        <div onClick={() => Router.push('/job-detail/'+record.job.id+'')}>
            {
              get(record, 'candidate', {}).job_role.map(item => (
                <Tag style={{margin:3, cursor: 'pointer'}}  key={item} color="red">{item}</Tag>
              ))
            }
          </div>
      )
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      render: (text, record, index) => (
        <div>
          <div>{get(record, 'candidate', {}).name}</div>
          {/* <div>
            {
              get(record, 'candidate', {}).job_role.map(item => (
                <Tag key={item} color="blue">{item}</Tag>
              ))
            }
          </div> */}
        </div>
      )
    },
    {
      title: 'Level',
      dataIndex: 'job',
      align: 'center',
      render: (text, record, index) => (
        get(record, 'job', {}).job_levels.map(item => (
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
      dataIndex: 'on_boarding_at',
      align: 'center',
      render: (text, record, index) => <div>{get(record, 'on_boarding_at')?moment(get(record, 'on_boarding_at', '')).format('DD-MM-YYYY'):('N/A')}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      editable: true,
      width: 150,
      render: (text, record, index) => <Tag color={renderColorTag(record.status)}>
        {get(record, 'status', '') === 'on_board' ? 'onboarding' : get(record, 'status', '').replace('_', ' ')}
      </Tag>,
    },
    {
      title: 'Cập nhật',
      dataIndex: 'candidate_id',
      align: 'center',
      width: 150,
      render: (candidate_id) => <div className="Action"><Button style={{marginRight:5}} onClick={() => Router.push('/referrer/edit-cv/' + candidate_id + '')}  icon={<EditOutlined />} size="small" />
      <Popconfirm
        title="Are you sure delete title?"
        onConfirm={() => handleDelete(candidate_id)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button icon={<DeleteOutlined />} size="small" />
      </Popconfirm></div>
    },
    
  ];

  const { dispatch, referred } = props
  const [query, setQuery] = useState(initQuery)
  const [listCompany, setListCompany] = useState([]);
  const [fetching, setFetching] = useState(false);

  const onChangeQuery = async (key, value) => {
    let clone = { ...query }
    clone[key] = value
    setQuery(clone)
  }

  const handleFilter = async () => {
    let clone = { ...query };
    clone['offset'] = 0;
    setQuery(clone);
    await dispatch(getListReferred(clone))
  }

  const handleTableChange = async (pagination) => {
    let clone = { ...query };
    clone['offset'] = (pagination.current - 1) * 10;
    clone['limit'] = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListReferred(clone));
  };

  const resetSearch = async () => {
    setQuery(initQuery);
    await dispatch(getListReferred(initQuery));
  }
  
  function cancel(e) {
    console.log(e);
    message.error('Cance');
  }
  const handleDelete = async (candidate_id) => {
    console.log('Received values of fors', candidate_id);
    await dispatch(deleteCandidate(candidate_id)).then(res => {
      if (res.status) {
        Router.push('/referrer/my-referred')
        return message.success('Delete candidate successfully');
      }
      return message.error(res.error);
    })
  };
  useEffect(() => {
    dispatch(getListReferred(query));
    fetchCompany('');
  }, []);

  const fetchCompany = async value => {
    setListCompany([]);
    setFetching(true);
    await dispatch(getAllCompany({offset: 0, limit: 50, key_word: value})).then(res => {
      if (res.status) {
        setListCompany(get(res, 'data.items.company_name'));
        setFetching(false);
      }
    });
  };

  const delayedQuery = useRef(debounce((e, func) => func(e), 800)).current;

  return (
    <div className="my-referred-container">
      <div className="header">
        <div>{`Hồ sơ của bạn (${get(referred, 'list_referred.extra_data.total', 0)})`}</div>
      </div>
      <Form
        name="advanced_search"
        className="ant-advanced-search-form"
        labelCol={{ span: 4 }}
        layout="horizontal"
      >
        <Row gutter={[16, 0]}>
          <Col className="fiter-item" span={14}>
            <div className="title">Tên ứng viên: </div>
            <Input value={query.key_word} onChange={(e) => onChangeQuery('key_word', e.target.value)} placeholder="Tìm theo tên ứng viên..." />
          </Col>
          <Col className="fiter-item" span={6} >
            <div className="title">Công ty: </div>
            <Select
              allowClear
              showSearch
              onChange={(e) => onChangeQuery('company_name', e)}
              style={{ width: '100%' }}
              placeholder="Công ty"
              optionFilterProp="children"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={(e) => delayedQuery(e, fetchCompany)}
              value={query.company_name}
            >
              {listCompany.map((d, index) => (
                <Option value={d} key={index}>{d}</Option>
              ))}
            </Select>
          </Col>
          <Col className="fiter-item" span={4} >
            <div className="title">Trạng thái: </div>
            <Select
              style={{ width: '100%' }}
              placeholder="Trạng thái"
              onChange={(e) => onChangeQuery('status', e)}
              value={query.status}
              value={query.status}
            >
              <Option value="">All</Option>
              <Option value="pending">Pending</Option>
              <Option value="confirmed">Confirmed</Option>
              <Option value="on_board">Onboarding</Option>
              <Option value="interview_failed">Interview failed</Option>
              <Option value="probation_passed">Probation passed</Option>
              <Option value="probation_failed">Probation failed</Option>
            </Select>
          </Col>
          <Col span={24}>
            <div className="filter-button">
              <Button onClick={() => handleFilter()} icon={<SearchOutlined />} type="primary">Tìm kiếm</Button>
              <Button icon={<RedoOutlined />} onClick={() => resetSearch()} type="primary">Làm mới</Button>
            </div>
          </Col>
        </Row>
      </Form>
      {/* end form */}
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
          size: 'small',
          current: (query.offset / 10) + 1
        }}
        onChange={handleTableChange}
      />
    </div>
  )
};

function mapStateToProps(state) {
  const { referred } = state
  return { referred }
}

export default connect(mapStateToProps, null)(MyReferred)
