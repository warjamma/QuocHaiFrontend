import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router';
import { RedoOutlined, SearchOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Table, Row, Col, Button, Tag, Input, Select } from 'antd';
import { getListJob } from '../../../containers/referred/actions';
import { get } from 'lodash';
import axios from 'axios';

import './styles.scss'

const { Search } = Input

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
  limit: 20,
}

const columns = [
  {
    title: 'Công ty',
    dataIndex: 'company_id',
    render: (text, record, index) => (
      <div className="custom-company" onClick={() => Router.push('/referrer/job-detail/'+record.id+'')}>
        <div className="logo-company" />
        <div className="info-required">
          <b className="name-company">Rockship</b>
          <div className="job-role">
            <span>Vị trí tuyển dụng : </span>
            {
              record.job_role.map(item => (
                <Tag color="blue" key={item}>{item}</Tag>
              ))
            }
          </div>
          <div className="job-level">
            <span>Level yêu cầu : </span>
            {
              record.job_levels.map(item => (
                <Tag color="blue" key={item}>{item}</Tag>
              ))
            }
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Công việc',
    dataIndex: 'job_title',
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
    title: 'Ứng viên',
    dataIndex: 'vacancy_number',
    align: 'center'
  },
  {
    title: 'Giới thiệu của tôi',
    dataIndex: 'address',
    align: 'center'
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
  const { referred, dispatch } = props
  const [query, setQuery] = useState(initQuery);
  const [total, setTotal] = useState(null);

  const changeQuery = (key, value) => {
    let clone = { ...query };
    clone[key] = typeof value === 'object' ? value.join(', ') : value ;
    console.log(clone)
    setQuery(clone)
  }

  const handleFind = async () => {
    await dispatch(getListJob(query))
  }

  const handleTableChange = async (pagination) => {
    let clone = { ...query };
    clone['offset'] = pagination.current * 10;
    await dispatch(getListJob(clone))
  };

  useEffect(() => {
    dispatch(getListJob(query));
  }, []);
  

  return (
    <div className="jobListContainer">
      <div className="header">
        <div>Danh sách công việc (40)</div>
      </div>
      <Row className="filter-box">
        <Col span={24} className="title">Tìm kiếm</Col>
        <Col span={24} className="filter-option">
          <Row gutter={[16, 16]} className="body">
            <Col span={12}>
              <b>Từ khóa</b>
              <Search onChange={(e) => changeQuery('key_word', e.target.value)} placeholder="Từ khóa"/>
            </Col>
            <Col span={6}>
              <b>Công ty</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                onChange={(e) => changeQuery('company', e)}
                style={{ width: '100%' }}
                placeholder="Công ty"
                optionFilterProp="children"
                defaultValue=""
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Tất cả</Option>
              </Select>
            </Col>
            <Col span={6}>
              <b>Loại công việc</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                onChange={(e) => changeQuery('job_type', e)}
                style={{ width: '100%' }}
                placeholder="Chọn loại công việc"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="body">
            <Col span={6}>
              <b>Địa điểm</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                onChange={(e) => changeQuery('location', e)}
                style={{ width: '100%' }}
                placeholder="Địa điểm"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                <Option value="Đà Nẵng">Đà Nẵng</Option>
              </Select>
            </Col>
            <Col span={8}>
              <b>Mức lương</b>
              <div className="salary-form">
                <span className="content">từ</span>
                <Input onChange={(e) => changeQuery('min_salary', e.target.value)} addonAfter={<span>$</span>}/>
                <span className="content">đến</span>
                <Input onChange={(e) => changeQuery('max_salary', e.target.value)} addonAfter={<span>$</span>}/>
              </div>
            </Col>
            <Col span={6}>
              <b>Trạng thái</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                onChange={(e) => changeQuery('status', e)}
                style={{ width: '100%' }}
                placeholder="Trang thái"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button onClick={() => handleFind()} icon={<SearchOutlined />}  type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />}  type="primary">Làm mới</Button>
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Table
          bordered
          rowKey="id"
          columns={columns}
          dataSource={get(referred, 'list_job.items.job', [])}
          pagination={{ pageSize: 20, total: 100 }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { referred } = state
  return { referred }
}

export default connect(mapStateToProps, null)(JobList)
