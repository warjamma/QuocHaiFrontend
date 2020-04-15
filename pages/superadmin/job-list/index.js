import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'
import { CloseOutlined, SearchOutlined, QuestionCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { Table, Row, Col, Button, Tag, Input, Select, Tabs, Modal, Tooltip } from 'antd';
import { getListJob } from '../../../containers/referred/actions';
import { actionApproveJob, actionRejectJob } from '../../../containers/job/actions';
import { get } from 'lodash';

import './styles.scss'

const { Search } = Input

const { Option } = Select;

const initQuery = {
  company: '',
  key_word: '',
  location: '',
  status: 'pending',
  job_type: null,
  min_salary: null,
  max_salary: null,
  offset: 0,
  limit: 10,
}

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
  const [activeTab, setTab] = useState('Pending');
  const [visibleModal, toggleModal] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const columns = [
    {
      title: 'Công ty',
      dataIndex: 'company_id',
      render: (text, record, index) => (
        <div className="custom-company">
          <div className="logo-company">
            <img src={get(record, 'company.avatar') === null ? '/default-avatar.png' : get(record, 'company.avatar')}/>
          </div>
          <div className="info-required">
            <b className="name-company">{get(record, 'company.name', '')}</b>
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
      render: (text, record, index) => (
        <div>
          <Link href={`/job-detail/${record.id}`}><a className="job-title">{get(record, 'job_title', '')}</a></Link>
        </div>
      )
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
            activeTab === 'Reject' && (
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

  const changeQuery = (key, value) => {
    let clone = { ...query };
    clone[key] = typeof value === 'object' ? value.join(', ') : value ;
    setQuery(clone)
  }

  const onChangeTab = async (value) => {
    setTab(value);
    let clone = { ...query };
    clone['status'] = value.toLowerCase();
    setQuery(clone);
    await dispatch(getListJob(clone))
  }

  const handleFind = async () => {
    let clone = { ...query };
    clone['offset'] = 0;
    setQuery(clone)
    await dispatch(getListJob(clone))
  }

  const handleTableChange = async (pagination) => {
    let clone = { ...query };
    clone['offset'] = (pagination.current - 1) * 10;
    clone['limit'] = pagination.pageSize;
    setQuery(clone)
    await dispatch(getListJob(clone))
  };

  const approveJob = async (id) => {
    await dispatch(actionApproveJob(id));
    dispatch(getListJob(query));
  }

  const rejectJob = async () => {
    await dispatch(actionRejectJob(selectedJob, {reason: reason}));
    toggleModal(false);
    setReason('');
    dispatch(getListJob(query));
  }

  const selectDeny = (id) => {
    toggleModal(true);
    setSelectedJob(id) 
  }

  useEffect(() => {
    dispatch(getListJob(query));
  }, []);

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
              <Search onChange={(e) => changeQuery('key_word', e.target.value)} placeholder="Từ khóa"/>
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
          <div className="filter-button">
            <Button onClick={() => handleFind()} icon={<SearchOutlined />}  type="primary">Tìm kiếm</Button>
            {/* <Button icon={<RedoOutlined />}  type="primary">Làm mới</Button> */}
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Tabs
          onChange={(e) => onChangeTab(e)}
          activeKey={activeTab}
          type="card"
        >
          {[{title: 'Pending'}, {title: 'Accepted'}, {title: 'Reject'}].map(pane => (
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
        title="Confirm deny"
        visible={visibleModal}
        onOk={() => rejectJob()}
        onCancel={() => {
          toggleModal(!visibleModal);
          setReason('')
        }}
      >
        <Input.TextArea placeholder="" autoSize={{ minRows: 4 }} onChange={(e) => setReason(e.target.value)} />
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  const { referred } = state
  return { referred }
}

export default connect(mapStateToProps, null)(JobList)
