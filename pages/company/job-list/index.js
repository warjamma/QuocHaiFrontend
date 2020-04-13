import React, { Component, useState, useEffect } from 'react';
import { Table, Row, Col, Button, Input, Select, Tag } from 'antd';
import Router from 'next/router';
import { connect } from 'react-redux';
import { RedoOutlined, SearchOutlined, HighlightOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { getListJob } from '../../../containers/company/action';
import renderColorTag from '../../../ultils/renderColorStatus';
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
const role = 'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer'

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
    render: (text, record, index) => <Tag color={renderColorTag(record.status)}>{record.status}</Tag>,
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
    clone['offset'] = (pagination.current - 1) * 10;
    clone['limit'] = pagination.pageSize;
    setQuery(clone)
    await dispatch(getListJob(clone, get(profile, 'data.employer.company_id', '')));
  };

  const onChangeQuery = async (key, value) => {
    let clone = { ...query }
    clone[key] = value
    setQuery(clone)
  }

  const handleFilter = async () => {
    await dispatch(getListJob(query, get(profile, 'data.employer.company_id', '')));
  }

  useEffect(() => {
    console.log(query)
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
              <Search onChange={(e) => onChangeQuery('key_word', e.target.value)} placeholder="Từ khóa" />
            </Col>
            <Col span={6}>
              <b>Loại công việc</b>
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="Chọn loại công việc"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(e) => onChangeQuery('job_type', e)}
              >
                {
                  role.split(', ')
                    .map(item => (
                      <Option key={item} value={item}>{item}</Option>
                    ))
                }
              </Select>
            </Col>
            <Col span={6}>
              <b>Trạng thái</b>
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="Trạng thái"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(e) => onChangeQuery('status', e)}
              >
                <Option value="">All</Option>
                <Option value="pending">Pending</Option>
                <Option value="accepted">Accepted</Option>
                <Option value="reject">Rejected</Option>
                <Option value="on_board">On board</Option>
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button icon={<SearchOutlined />} onClick={() => handleFilter()} type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />} type="primary">Làm mới</Button>
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Table
          loading={get(company, 'is_loading', false)}
          bordered
          rowKey="id"
          columns={columns}
          dataSource={get(company, 'list_job.items.job', [])}
          pagination={{
            pageSize: query.limit,
            total: get(company, 'list_job.extra_data.total', 0),
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50'],
            size: 'small',
          }}
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
