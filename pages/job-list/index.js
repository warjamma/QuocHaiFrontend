/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { RedoOutlined, SearchOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Table, Row, Col, Button, Tag, Input, Select, Spin } from 'antd';
import { get, debounce } from 'lodash';
import { getListJob, getCountMyRefer } from '../../containers/referred/actions';
import { getAllCompany } from '../../containers/company/action';
import { getAllJobType } from '../../containers/job/actions';


import './styles.scss';

const { Search } = Input;

const { Option } = Select;

const role = 'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer';

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
const pushRouter = (name) => {
  Router.push({
    pathname: `/referrer/my-referred`,
    query: { name },
  });
};
const columns = [
  {
    title: 'Công ty',
    dataIndex: 'company_id',
    render: (text, record, index) => (
      <div role="presentation" className="custom-company" >
        <div className="logo-company"  >
          <img
            src={get(record, 'company.avatar') === null ? '/default-avatar.png' : get(record, 'company.avatar')}
            alt="avatar"
          />
        </div>
        <div className="info-required">
          <b role="presentation" className="name-company" onClick={() => Router.push(`/company-profile/${get(record, 'company_id')}`)}>{get(record, 'company.name', '')}</b>
          <div className="job-level">
            <span>Cấp độ:&nbsp;</span>
            {
              record.job_levels.map(item => (
                <Tag onClick={() => Router.push(`/job-detail/${record.id}`)} className="tag-level" color="blue" key={item}>{item}</Tag>
              ))
            }
          </div>
          <div className="job-role">
            <span>Số lượng yêu cầu: {record.vacancy_number} </span>
          </div>
          <div className="job-level">
            <span>Địa điểm: <Tag onClick={() => Router.push(`/job-detail/${record.id}`)} color="blue">{record.locations}</Tag> </span>
          </div>

        </div>
      </div>
    ),
  },
  {
    title: 'Vị trí',
    dataIndex: 'company_id',
    render: (text, record, index) => (
      <div role="presentation" className="custom-role" onClick={() => Router.push(`/job-detail/${record.id}`)}>
        <div className="job-role">
          {
            record.job_role.map(item => (
              <b className="name-role" color="blue" key={item}>{item}</b>
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
    dataIndex: 'current_applied',
    align: 'center',
    render: (record) => <div>{record}</div>
  },
  {
    title: 'Giới thiệu của tôi',
    dataIndex: 'count_my_refer',
    align: 'center',
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    render: (text, record, index) => <b onClick={() => pushRouter(get(record, 'company.name',''))} className="bold-number">{record.count_my_refer} CV </b>
   // render: (text, record, index) => <b onClick={() => Router.push(`/referrer/my-referred/${get(record, 'company.name')}`)} className="bold-number">{record.count_my_refer} CV </b>
  },
];

function JobList(props) {
  const { referred, dispatch } = props;
  const [query, setQuery] = useState(initQuery);
  const [total, setTotal] = useState(null);
  const [listCompany, setListCompany] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [listJobType, setListJobType] = useState([]);
  const router = useRouter();
  const { name } = router.query;
  if(name){
    initQuery.company=name;
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

  const fetchCompany = value => {
    setListCompany([]);
    setFetching(true);
    dispatch(getAllCompany({ offset: 0, limit: 50, key_word: value })).then(res => {
      if (res.status) {
        setListCompany(get(res, 'data.items.company_name'));
        setFetching(false);
      }
    });
  };

  const fetchJobType = value => {
    setListJobType([]);
    setFetching(true);
    dispatch(getAllJobType({ offset: 0, limit: 50, key_word: value })).then(res => {
      if (res.status) {
        setListJobType(get(res, 'data.items.job_type'));
        setFetching(false);
      }
    });
  };

  useEffect(() => {
    dispatch(getListJob(query));
    dispatch(getCountMyRefer());
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
              <Search value={query.key_word} onChange={(e) => changeQuery('key_word', e.target.value)} placeholder="Từ khóa" />
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
                <Input value={query.min_salary} onChange={(e) => changeQuery('min_salary', e.target.value)} addonAfter={<span>$</span>} />
                <span className="content">đến</span>
                <Input value={query.max_salary} onChange={(e) => changeQuery('max_salary', e.target.value)} addonAfter={<span>$</span>} />
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
            <Button onClick={() => handleFind()} icon={<SearchOutlined />} type="primary">Tìm kiếm</Button>
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
            total: get(referred, 'list_job.extra_data.total', 0),
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
  // console.log(state);
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(JobList);
