import React, { Component, useState, useEffect } from 'react';
import { Table, Row, Col, Button, Input, Select, Tag } from 'antd';
import Router from 'next/router';
import { connect } from 'react-redux';
import { RedoOutlined, SearchOutlined, HighlightOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { getListJob } from '../../../containers/company/action';
import { get } from 'lodash';
import moment from 'moment';
import './styles.scss';

const ButtonAction = styled(Button)`
  padding: 0px 10px;
  &:hover {
    background: #1890FF;
    border-color: #1890FF;
    color: #fff;
  }
`

const { Search } = Input

const { Option } = Select

const columns = [
  {
    title: 'Công việc',
    dataIndex: 'job_title',
    width: 300,
    render: (text, record) => <a onClick={() => Router.push(`/job-detail/${record.id}`)}>{text}</a>
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created',
    align: 'center',
    render: (text, record, index) => <span color="green">{moment(record.created_at).format('DD-MM-YYYY')}</span>,
  },
  {
    title: 'Số lượng yêu cầu',
    dataIndex: 'vacancy_number',
    align: 'center'
  },
  {
    title: 'Số ứng viên hiện có',
    dataIndex: 'candidate',
    align: 'center'
  },
  {
    title: 'Mức lương ($)',
    dataIndex: 'salary',
    align: 'center',
    render: (text, record, index) => <Tag color="blue">{record.min_salary}$ - {record.max_salary}$</Tag>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    align: 'center',
    render: (text, record, index) => <Tag color="green">{record.status}</Tag>,
  },
  {
    title: '',
    dataIndex: 'candidate',
    align: 'center',
    width: 60,
    render: (text, record, index) => <ButtonAction onClick={() => Router.push(`/company/edit-job/${record.id}`)}><EditOutlined /></ButtonAction>,
  },
];

const initQuery = {
  company: '',
  key_word: '',
  location: '',
  status: null,
  job_type: null,
  min_salary: null,
  max_salary: null,
  offset: 0,
  limit: 10,
}



function JobList(props) {
  const { profile, company, dispatch } = props;
  const [query, setQuery] = useState(initQuery);

  const handleTableChange = async (pagination) => {
    let clone = { ...query };
    clone['offset'] = pagination.current * 10;
    await dispatch(getListJob(clone, get(profile, 'data.employer.company_id', '')));
  };

  useEffect(() => {
    dispatch(getListJob(query, get(profile, 'data.employer.company_id', '')));
  }, []);

  return (
    <div className="jobListContainer">
      <div className="header">
        <div>Danh sách công việc (40)</div>
        <Button onClick={() => Router.push('/company/create-job')} icon={<HighlightOutlined />} type="primary">Tạo công việc</Button>
      </div>
      <Row className="filter-box">
        <Col span={24} className="title">Tìm kiếm</Col>
        <Col span={24} className="filter-option">
          <Row gutter={[16, 16]} className="body">
            <Col span={12}>
              <b>Từ khóa</b>
              <Search placeholder="Từ khóa" />
            </Col>
            <Col span={6}>
              <b>Loại công việc</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Chọn loại công việc"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="All">Tất cả</Option>
                <Option value="Developer">Developer</Option>
                <Option value="Kế toán">Kế toán</Option>
                <Option value="HR">HR</Option>
                <Option value="HR1">HR1</Option>
                <Option value="HR2">HR2</Option>
                <Option value="HR3">HR3</Option>
              </Select>
            </Col>
            <Col span={6}>
              <b>Trạng thái</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Trạng thái"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="Pending">Pending</Option>
                <Option value="Approved">Approved</Option>
                <Option value="Rejected">Rejected</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button icon={<SearchOutlined />} type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />} type="primary">Làm mới</Button>
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Table
          bordered
          rowKey="id"
          columns={columns}
          dataSource={get(company, 'list_job.items.job', [])}
          pagination={{ pageSize: 10, total: get(company, 'list_job.extra_data.total', 0) }}
          onChange={handleTableChange}
        />
        
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { company, profile } = state
  return { company, profile }
}

export default connect(mapStateToProps, null)(JobList)
