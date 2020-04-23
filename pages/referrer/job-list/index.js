import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { RedoOutlined, SearchOutlined, DollarCircleOutlined,FileDoneOutlined } from '@ant-design/icons';
import { Table, Row, Col, Button, Tag, Input, Select, Spin } from 'antd';
import { get, debounce } from 'lodash';
import { getListJob } from '../../../containers/referred/actions';
import { getAllCompany } from '../../../containers/company/action';
import { getAllJobType } from '../../../containers/job/actions';


import './styles.scss';

const { Search } = Input;

const { Option } = Select;

const initQuery = {
  company: '',
  key_word: '',
  location: '',
  status: 'accepted',
  job_type: null,
  min_salary: null,
  max_salary: null,
  offset: 0,
  limit: 10,
};

const columns = [
  {
    title: 'Công ty',
    dataIndex: 'company_id',
    render: (text, record, index) => (
      <div className="custom-company" onClick={() => Router.push(`/job-detail/${record.id}`)}>
        <div className="logo-company" style={{ width: 100,marginRight: 10}}>
          <img  style ={{cursor: 'pointer',width: '100%',objectFit: 'cover'}} src={get(record, 'company.avatar') === null ? '/default-avatar.png' : get(record, 'company.avatar')}/>
        </div>
        <div className="info-required">
          <b style={{ cursor: 'pointer'}} className="name-company">{get(record, 'company.name', '')}</b>
          <div className="job-level">
            <span>Cấp độ:&nbsp;</span>
            {
              record.job_levels.map(item => (
                <Tag style={{margin:2, cursor: 'pointer'}} color="blue" key={item}>{item}</Tag>
              ))
            }
          </div>
          <div className="job-role">
            <span>Số lượng yêu cầu: {record.vacancy_number} </span>
          </div>
          
        </div>
      </div>
    ),
  },
  {
    title: 'Vị trí',
    dataIndex: 'company_id',
    render: (text, record, index) => (
      <div className="custom-company" onClick={() => Router.push(`/job-detail/${record.id}`)}>    
          <div className="job-role">
            {
              record.job_role.map(item => (
                <Tag style={{margin:3, cursor: 'pointer'}} color="blue" key={item}>{item}</Tag>
              ))
            }         
          </div>
      </div>
    ),
  },
  {
    title: 'Mức thưởng',
    dataIndex: 'reward',
    align: 'center',
    render: (text, record, index) => <Tag color="green">{record.reward}$</Tag>,
  },
  {
    title: 'Mức lương',
    dataIndex: '',
    align: 'center',
    render: (text, record, index) => <Tag color="blue">{record.min_salary}$ - {record.max_salary}$</Tag>,
  },
  {
    title: 'Đã ứng tuyển',
    dataIndex: 'vacancy_number',
    align: 'center'
  },
  {
    title: 'Giới thiệu của tôi',
    dataIndex: 'address',
    align: 'center',
    render: ()=><div style={{fontSize:23}}><FileDoneOutlined /></div>
  },
];

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
}

function JobList (props) {
  const { referred, dispatch } = props;
  const [query, setQuery] = useState(initQuery);
  const [total, setTotal] = useState(null);
  const [listCompany, setListCompany] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [listJobType, setListJobType] = useState([]);

  const changeQuery = (key, value) => {
    const clone = { ...query };
    clone[key] = typeof value === 'object' ? value.join(', ') : value ;
    setQuery(clone);
  };

  const handleFind = async () => {
    const clone = { ...query };
    clone.offset = 0;
    setQuery(clone);
    await dispatch(getListJob(clone));
  };

  const handleTableChange = async (pagination) => {
    const clone = { ...query };
    clone.offset = (pagination.current-1) * 10;
    clone.limit = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListJob(clone));
  };
  
  const resetSearch = async () => {
    setQuery(initQuery);
    await dispatch(getListJob(initQuery));
  };

  useEffect(() => {
    dispatch(getListJob(query));
    fetchCompany('');
    fetchJobType('');
  }, []);
  
  const fetchCompany = value => {
    setListCompany([]);
    setFetching(true);
    dispatch(getAllCompany({offset: 0, limit: 50, key_word: value})).then(res => {
      if (res.status) {
        setListCompany(get(res, 'data.items.company_name'));
        setFetching(false);
      }
    });
  };

  const fetchJobType = value => {
    setListJobType([]);
    setFetching(true);
    dispatch(getAllJobType({offset: 0, limit: 50, key_word: value})).then(res => {
      if (res.status) {
        setListJobType(get(res, 'data.items.job_type'));
        setFetching(false);
      }
    });
  };

  const delayedQuery = useRef(debounce((e, func) => func(e), 800)).current;

  return (
    <div className="jobListContainer">
      <div className="header">
        <div>{`Danh sách công việc (${get(referred, 'list_job.extra_data.total', [])})`}</div>
      </div>
      <Row className="filter-box">
        <Col span={24} className="title">Tìm kiếm</Col>
        <Col span={24} className="filter-option">
          <Row gutter={[16, 16]} className="body">
            <Col span={12}>
              <b>Từ khóa</b>
              <Search value={query.key_word} onChange={(e) => changeQuery('key_word', e.target.value)} placeholder="Từ khóa"/>
            </Col>
            <Col span={6}>
              <b>Công ty</b>
              <Select
                allowClear
                showSearch
                onChange={(e) => changeQuery('company', e)}
                style={{ width: '100%' }}
                placeholder="Công ty"
                optionFilterProp="children"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={(e) => delayedQuery(e, fetchCompany)}
                value={query.company}
              >
                {listCompany.map((d, index) => (
                  <Option value={d} key={index}>{d}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <b>Loại công việc</b>
              <Select
                allowClear
                showSearch
                onChange={(e) => changeQuery('job_type', e)}
                style={{ width: '100%' }}
                placeholder="Chọn loại công việc"
                optionFilterProp="children"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={(e) => delayedQuery(e, fetchJobType)}
                value={query.job_type}
              >
                {listJobType.map((d, index) => (
                  <Option value={d} key={index}>{d}</Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="body">
            <Col span={6}>
              <b>Địa điểm</b>
              <Select
                allowClear
                showSearch
                onChange={(e) => changeQuery('location', e)}
                style={{ width: '100%' }}
                placeholder="Địa điểm"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={query.location}
              >
                {/* <Option value="">Tất cả</Option> */}
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                <Option value="Đà Nẵng">Đà Nẵng</Option>
              </Select>
            </Col>
            <Col span={8}>
              <b>Mức lương</b>
              <div className="salary-form">
                <span className="content">từ</span>
                <Input value={query.min_salary} onChange={(e) => changeQuery('min_salary', e.target.value)} addonAfter={<span>$</span>}/>
                <span className="content">đến</span>
                <Input value={query.max_salary} onChange={(e) => changeQuery('max_salary', e.target.value)} addonAfter={<span>$</span>}/>
              </div>
            </Col>
            {/* <Col span={6}>
              <b>Trạng thái</b>
              <Select
                allowClear
                showSearch
                onChange={(e) => changeQuery('status', e)}
                style={{ width: '100%' }}
                placeholder="Trang thái"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={query.status}
              >
                <Option value="">Tất cả</Option>
              </Select>
            </Col> */}
          </Row>
          <div className="filter-button">
            <Button onClick={() => handleFind()} icon={<SearchOutlined />}  type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />} onClick={() => resetSearch()} type="primary">Làm mới</Button>
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Table
          loading={get(referred, 'is_loading', false)}
          bordered
          rowKey="id"
          columns={columns}
          dataSource={get(referred, 'list_job.items.job', [])}
          pagination={{
            pageSize: query.limit,
            total: get(referred, 'list_job.extra_data.total',0),
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50'],
            size: 'small',
            current: (query.offset / 10) + 1
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(JobList);
