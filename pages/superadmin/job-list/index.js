/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RedoOutlined, SearchOutlined, QuestionCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { Table, Row, Col, Button, Tag, Input, Select, Tabs, Modal, Tooltip, Spin } from 'antd';
import { get, debounce } from 'lodash';
import Router from 'next/router';
import { getListJob } from '../../../containers/referred/actions';
import { actionApproveJob, actionRejectJob, getAllJobType } from '../../../containers/job/actions';
import { getAllCompany } from '../../../containers/company/action';

import './styles.scss';

const { Search } = Input;

const { Option } = Select;

const role = 'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer';

const initQuery = {
  company: '',
  key_word: '',
  location: '',
  status: 'pending',
  job_role: null,
  min_salary: null,
  max_salary: null,
  offset: 0,
  limit: 10,
};

function JobList (props) {
  const { referred, dispatch } = props;
  const [query, setQuery] = useState(initQuery);
  const [activeTab, setTab] = useState('Pending');
  const [visibleModal, toggleModal] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [listCompany, setListCompany] = useState([]);
  const [fetching, setFetching] = useState(false);

  const changeQuery = (key, value) => {
    const clone = { ...query };
    clone[key] = typeof value === 'object' ? value.join(', ') : value ;
    setQuery(clone);
  };

  const onChangeTab = async (value) => {
    const clone = { ...query };
    if (value === 'Denied') {
      const replace = 'Reject';
      setTab('Denied');  
      clone.status = replace.toLowerCase();
    }
    else {
      setTab(value);
      clone.status = value.toLowerCase();
    }
    setQuery(clone);
    await dispatch(getListJob(clone));
  };

  const handleFind = async () => {
    const clone = { ...query };
    clone.offset = 0;
    setQuery(clone);
    await dispatch(getListJob(clone));
  };

  const handleTableChange = async (pagination) => {
    const clone = { ...query };
    clone.offset = (pagination.current - 1) * 10;
    clone.limit = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListJob(clone));
  };

  const resetSearch = async () => {
    setQuery(initQuery);
    await dispatch(getListJob(initQuery));
  };

  const approveJob = async (id) => {
    await dispatch(actionApproveJob(id));
    dispatch(getListJob(query));
  };

  const rejectJob = async () => {
    await dispatch(actionRejectJob(selectedJob, {reject_reason: reason}));
    toggleModal(false);
    setReason('');
    dispatch(getListJob(query));
  };

  const selectDeny = (id) => {
    toggleModal(true);
    setSelectedJob(id); 
  };

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

  useEffect(() => {
    dispatch(getListJob(query));
    fetchCompany('');
  }, []);

  const columns = [
    {
      title: 'Công ty',
      dataIndex: 'company_id',
      render: (text, record, index) => (
        <div className="custom-company">
          <div className="logo-company" >
            <img
              src={get(record, 'company.avatar') === null ? '/default-avatar.png' : get(record, 'company.avatar')}
              alt="avatar"
            />
          </div>
          <div className="info-required">
            <b role="presentation" className="name-company" onClick={()=>Router.push(`/company-profile/${get(record, 'company_id')}`)}>{get(record, 'company.name', '')}</b>
            <div className="job-level">
              <span>Cấp độ: </span>
              {
                record.job_levels.map(item => (
                  <Tag color="blue" key={item}>{item}</Tag>
                ))
              }
            </div>
            <div className="job-level">
              <span>Số lượng yêu cầu: {record.vacancy_number} </span>
            </div>
            <div className="job-level">
              <span>Địa điểm: <Tag color="blue">{record.locations}</Tag> </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Vị trí',
      dataIndex: 'company_id',
      align: 'center',
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
      title: '',
      dataIndex: '',
      align: 'center',
      width: 'max-content',
      render: (text, record, index) => (
        <div className="group-btn-action">
          {
            activeTab === 'Pending' && (
              <div className="group-btn-action">
                <Button type="primary" onClick={() => approveJob(record.id)}>Approve</Button>
                <Button danger onClick={() => selectDeny(record.id)}>Deny</Button>
              </div>
            )
          }
          {
            activeTab === 'Accepted' && (
              <Button danger onClick={() => selectDeny(record.id)}>Deny</Button>
            )
          }
          {
            activeTab === 'Denied' && (
              <div>
                <Button style={{ marginBottom: 7 }} type="primary" onClick={() => approveJob(record.id)}>Approve</Button>
                <Tooltip placement="left" title={record.reject_reason}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </div>
            )
          }
        </div>
      )
    },
  ];

  const delayedQuery = useRef(debounce((e, func) => func(e), 800)).current;

  return (
    <div className="jobListContainer">
      <div className="header">
        <div>{`Danh sách công việc (${get(referred, 'list_job.extra_data.total', 0)})`}</div>
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
                {listCompany.map((d) => (
                  <Option value={d} key={d}>{d}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <b>Vị trí</b>
              <Select
                allowClear
                showSearch
                onChange={(e) => changeQuery('job_role', e)}
                style={{ width: '100%' }}
                placeholder="Chọn vị trí"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={query.job_type}
              >
                {role.split(', ').map((d) => (
                  <Option value={d} key={d}>{d}</Option>
                ))}
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button onClick={() => handleFind()} icon={<SearchOutlined />}  type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />} onClick={() => resetSearch()} type="primary">Làm mới</Button>
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Tabs
          onChange={(e) => onChangeTab(e)}
          activeKey={activeTab}
          type="card"
        >
          {[{title: 'Pending'}, {title: 'Accepted'}, {title: 'Denied'}].map(pane => (
            <Tabs.TabPane tab={pane.title} key={pane.title}>
              <Table
                bordered
                rowKey="id"
                loading={get(referred, 'is_loading', false)}
                columns={columns}
                dataSource={get(referred, 'list_job.items.job', [])}
                pagination={{
                  pageSize: query.limit,
                  total: get(referred, 'list_job.extra_data.total', 0),
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30', '50'],
                  size: "small",
                  current: (query.offset / 10) + 1
                }}
                onChange={handleTableChange}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
      <Modal
        title="Lý do"
        visible={visibleModal}
        onOk={() => rejectJob()}
        onCancel={() => {
          toggleModal(!visibleModal);
          setReason('');
        }}
      >
        <Input.TextArea placeholder="" autoSize={{ minRows: 4 }} onChange={(e) => setReason(e.target.value)} />
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(JobList);
