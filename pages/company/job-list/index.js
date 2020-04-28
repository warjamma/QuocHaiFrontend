/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect } from 'react';
import { Table, Row, Col,Popconfirm, Button,message, Input, Select, Tag } from 'antd';
import Router from 'next/router';
import { connect } from 'react-redux';
import { RedoOutlined,DeleteOutlined , SearchOutlined, HighlightOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { get } from 'lodash';
import moment from 'moment';
import { getListJob,deleteJob } from '../../../containers/company/action';
import renderColorTag from '../../../ultils/renderColorStatus';
import './styles.scss';

const ButtonAction = styled(Button)`
  padding: 0px 10px;
  &:hover {
    background: #1890FF;
    border-color: #1890FF;
    color: #fff;
  }
`;
const role = 'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer';

const { Search } = Input;

const { Option } = Select;


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
};


function JobList(props) {
  const { profile, company, dispatch } = props;
  const [query, setQuery] = useState(initQuery);

  useEffect(() => {
    dispatch(getListJob(query, get(profile, 'data.employer.company_id', '')));
  }, []);

  const handleDelete = async (jobId) => {
    await dispatch(deleteJob(jobId)).then(res => {
      if (res.status) {
        Router.push('/company/job-list');
        return message.success('Delete candidate successfully');
      }
      return message.error(res.error);
    });
  };

  function cancel(e) {
    message.error('Cancel');
  }

  const columns = [
    // {
    //   title: 'Công việc',
    //   dataIndex: 'job_title',
    //   width: 300,
    //   render: (text, record) => <a className="job-title" onClick={() => Router.push(`/job-detail/${record.id}`)}>{text}</a>
    // },
    {
    title: 'Vị trí',
    dataIndex: 'company_id',
    render: (text, record, index) => (
      <div role="presentation" className="custom-role" onClick={() => Router.push(`/job-detail/${record.id}`)}>    
          <div className="job-role">
            {
              record.job_role.map(item => (
                <b className="name-role" key={item}>{item}</b>
              ))
            }         
          </div>
      </div>
    ),
  },
    {
      title: 'Ngày tạo',
      dataIndex: 'created',
      align: 'center',
      render: (text, record, index) => <span color="green">{moment(record.created_at).format('DD-MM-YYYY')}</span>,
    },
    {
      title: 'Cấp độ yêu cầu',
      dataIndex: 'job_levels',
      render: (text, record, index) => (
        <div>
          {
            record.job_levels.map(item => (
              <Tag color="blue" key={item}>{item}</Tag>
            ))
          }
        </div>
      )
    },
    {
      title: 'Số lượng yêu cầu',
      dataIndex: 'vacancy_number',
      align: 'center'
    },
    {
      title: 'Số ứng viên hiện có',
      dataIndex: 'current_applied',
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
      width: 150,
      render: (text, record, index) => (<div className="Action"><Button onClick={() => Router.push(`/company/edit-job/${record.id}`)}><EditOutlined /></Button>
      &nbsp;
          <Popconfirm
            title="Are you sure delete title?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
          <Button><DeleteOutlined /></Button>
          </Popconfirm> </div>)
          ,
    },
  ];
  
  const handleTableChange = async (pagination) => {
    const clone = { ...query };
    clone.offset = (pagination.current - 1) * 10;
    clone.limit = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListJob(clone, get(profile, 'data.employer.company_id', '')));
  };

  const onChangeQuery = async (key, value) => {
    const clone = { ...query };
    clone[key] = value;
    setQuery(clone);
  };

  const handleFilter = async () => {
    const clone = { ...query };
    clone.offset = 0;
    setQuery(clone);
    await dispatch(getListJob(clone, get(profile, 'data.employer.company_id', '')));
  };

  const resetSearch = async () => {
    setQuery(initQuery);
    await dispatch(getListJob(initQuery, get(profile, 'data.employer.company_id', '')));
  };

  return (
    <div className="jobListContainer">
      <div className="header">
        <div>{`Danh sách công việc (${get(company, 'list_job.extra_data.total', 0)})`}</div>
        <Button onClick={() => Router.push('/company/create-job')} icon={<HighlightOutlined />} type="primary">Tạo công việc</Button>
      </div>
      <Row className="filter-box">
        <Col span={24} className="title">Tìm kiếm</Col>
        <Col span={24} className="filter-option">
          <Row gutter={[16, 16]} className="body">
            <Col span={12}>
              <b>Từ khóa</b>
              <Search value={query.key_word} onChange={(e) => onChangeQuery('key_word', e.target.value)} placeholder="Từ khóa" />
            </Col>
            <Col span={6}>
              <b>Vị trí</b>
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
                value={query.job_type}
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
                value={query.status}
              >
                <Option value="">All</Option>
                <Option value="pending">Pending</Option>
                <Option value="accepted">Approved</Option>
                <Option value="reject">Denied</Option>
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button icon={<SearchOutlined />} onClick={() => handleFilter()} type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />} onClick={() => resetSearch()} type="primary">Làm mới</Button>
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
            current: (query.offset / 10) + 1
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { company, profile } = state;
  return { company, profile };
}

export default connect(mapStateToProps, null)(JobList);
