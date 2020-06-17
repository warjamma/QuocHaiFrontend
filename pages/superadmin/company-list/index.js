/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  RedoOutlined,
  SearchOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import {
  Table,
  Row,
  Col,
  Button,
  Tag,
  Input,
  Select,
  Spin,
  DatePicker,
  Form,
  Popconfirm,
} from 'antd';
import { get, debounce } from 'lodash';
import {
  getListJob,
  getListCompany,
} from '../../../containers/referred/actions';

import './styles.scss';

const { RangePicker } = DatePicker;
const { Search } = Input;

const { Option } = Select;

const role =
  'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer';

const initQuery = {
  company: '',
  key_word: '',
  location: '',
  status: 'accepted',
  job_role: null,
  min_salary: null,
  max_salary: null,
  offset: 0,
  limit: 10,
};
const pushRouter = (id) => {
  Router.push({
    pathname: `/superadmin/post-job`,
    query: { id },
  });
};

function JobList(props) {
  const { referred, dispatch } = props;
  const [query, setQuery] = useState(initQuery);
  const [total, setTotal] = useState(null);
  const [listCompany, setListCompany] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [listJobType, setListJobType] = useState([]);
  const router = useRouter();
  const { name } = router.query;
  if (name) {
    initQuery.company = name;
  }
  const changeQuery = (key, value) => {
    const clone = { ...query };
    clone[key] = typeof value === 'object' ? value.join(', ') : value;
    setQuery(clone);
  };

  const handleFind = async () => {
    const clone = { ...query };
    clone.offset = 0;
    setQuery(clone);
    await dispatch(getListCompany(clone));
  };

  const handleTableChange = async (pagination) => {
    const clone = { ...query };
    clone.offset = (pagination.current - 1) * 10;
    clone.limit = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListCompany(clone));
  };

  const resetSearch = async () => {
    setQuery(initQuery);
    await dispatch(getListCompany(initQuery));
  };

  const fetchCompany = (value) => {
    setListCompany([]);
    setFetching(true);
  };

  const fetchJobType = (value) => {
    setListJobType([]);
    setFetching(true);
  };

  useEffect(() => {
    dispatch(getListCompany(query));
    fetchCompany('');
    fetchJobType('');
  }, []);

  const delayedQuery = useRef(debounce((e, func) => func(e), 800)).current;
  // const data = get(referred, 'list_job.items.job', []);
  // const data2 = get(referred, 'list_count_my_refer.items.jobs', []);
  // // eslint-disable-next-line no-plusplus
  // for (let i = 0; i < data.length; i++) {
  //   // eslint-disable-next-line no-plusplus
  //   for (let j = 0; j < data2.length; j++) {
  //     if (data[i].id === data2[j].id) {
  //       data[i].count_my_refer = data2[j].count_my_refer;
  //     }
  //   }
  //   if(!data[i].count_my_refer){
  //     data[i].count_my_refer='0';
  //   }
  // }

  const columns = [
    {
      width: 650,
      title: 'Công ty',
      dataIndex: 'id',
      render: (text, record, index) => (
        <div role="presentation" className="custom-company">
          <div className="logo-company">
            <img
              src={
                get(record, 'avatar') === null
                  ? '/default-avatar.png'
                  : get(record, 'avatar')
              }
              alt="avatar"
            />
          </div>
          <div className="info-required">
            <b
              role="presentation"
              className="name-company"
              onClick={() =>
                Router.push(`/company-profile/${get(record, 'id')}`)
              }
            >
              {get(record, 'name', '')}
            </b>
            <div className="job-level">
              <span>Facebook: {record.facebook} </span>
            </div>
            <div className="job-level">
              <span>Điện thoại: {record.phone_number} </span>
            </div>
            <div className="job-level">
              <span>Địa chỉ: {record.address} </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      width: '15%',
      title: 'Lượt đăng tuyển đã dùng',
      dataIndex: 'id',
      render: (text, record, index) => (
        <div role="presentation" className="custom-role">
          <div className="job-role">
            <b className="name-role" color="blue">
            {get(record, 'purchas_job_proritize_available_to_post')-get(record, 'purchas_job_available_to_post')
                ? get(record, 'purchas_job_proritize_available_to_post')-get(record, 'purchas_job_available_to_post')
                : 0}{' '} ƯU TIÊN
            </b>
            <b className="name-role" color="blue">
            {get(record, 'purchas_job_available_to_post')-get(record, 'job_available_to_post')
                ? get(record, 'purchas_job_available_to_post')-get(record, 'job_available_to_post')
                : 0}{' '} THƯỜNG
            </b>
          </div>
        </div>
      ),
    },
    {
      width: '15%',
      title: 'Lượt đăng tuyển đã mua',
      dataIndex: 'id',
      render: (text, record, index) => (
        <div role="presentation" className="custom-role">
          <div className="job-role">
            <b className="name-role" color="blue">
              {get(record, 'purchas_job_proritize_available_to_post')
                ? get(record, 'purchas_job_proritize_available_to_post')
                : 0}{' '}
              ƯU TIÊN
            </b>
            <b className="name-role" color="blue">
              {get(record, 'purchas_job_available_to_post')
                ? get(record, 'purchas_job_available_to_post')
                : 0}{' '}
              THƯỜNG
            </b>
          </div>
        </div>
      ),
    },
    {
      width: '15%',
      title: 'Lượt đăng tuyển còn lại',
      dataIndex: 'id',
      render: (text, record, index) => (
        <div role="presentation" className="custom-role">
          <div className="job-role">
            <b className="name-role" color="blue">
            {get(record, 'job_proritize_available_to_post')?get(record, 'job_proritize_available_to_post'):0} ƯU TIÊN
            </b>
            <b className="name-role" color="blue">
            {get(record, 'job_available_to_post')?get(record, 'job_available_to_post'):0} THƯỜNG
            </b>
          </div>
        </div>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'status',
      align: 'center',
      editable: true,
      width: 120,
      render: (text, record, index) => (
        <div>
          <Button type="danger" onClick={() => pushRouter(record.id)}>
            Cấp lượt đăng tuyển
          </Button>
        </div>
      ),
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="jobListContainer">
      <div className="header">
        <div>{`Danh sách công ty (${get(
          referred,
          'list_company.extra_data.total',
          []
        )})`}</div>
      </div>
      <Row className="filter-box">
        <Col span={24} className="title">
          Tìm kiếm
        </Col>
        <Col span={24} className="filter-option">
          <Row gutter={[16, 16]} className="body">
            <Col span={12}>
              <b>Từ khóa</b>
              <Search
                value={query.key_word}
                onChange={(e) => changeQuery('key_word', e.target.value)}
                placeholder="Từ khóa"
              />
            </Col>
            <Col span={12}>
              <b>Địa điểm</b>
              <Select
                allowClear
                showSearch
                onChange={(e) => changeQuery('location', e)}
                style={{ width: '100%' }}
                placeholder="Địa điểm"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                value={query.location}
              >
                {/* <Option value="">Tất cả</Option> */}
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                <Option value="Đà Nẵng">Đà Nẵng</Option>
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button
              onClick={() => handleFind()}
              icon={<SearchOutlined />}
              type="primary"
            >
              Tìm kiếm
            </Button>
            <Button
              icon={<RedoOutlined />}
              onClick={() => resetSearch()}
              type="primary"
            >
              Làm mới
            </Button>
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Table
          columns={columns}
          loading={get(referred, 'is_loading', false)}
          bordered
          rowKey="id"
          dataSource={get(referred, 'list_company.items.company', [])}
          pagination={{
            pageSize: query.limit,
            total: get(referred, 'list_company.extra_data.total', 0),
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50'],
            size: 'small',
            current: query.offset / 10 + 1,
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  // console.log(state);
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(JobList);
