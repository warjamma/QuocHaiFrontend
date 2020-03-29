import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'
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
  status: null,
  job_type: null,
  min_salary: null,
  max_salary: null,
  offset: 0,
  limit: 20,
}

const columns = [
  {
    title: 'Công ty',
    dataIndex: 'company',
    align: 'center'
  },
  {
    title: 'Công việc',
    dataIndex: 'job',
    align: 'center'
  },
  {
    title: 'Mức thưởng',
    dataIndex: 'reward',
    align: 'center'
  },
  {
    title: 'Mức lương',
    dataIndex: 'address',
    align: 'center'
  },
  {
    title: 'Ứng viên',
    dataIndex: 'address',
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
  const [data, setData] = useState({ hits: [] });

  const changeQuery = (key, value) => {
    let clone = { ...query };
    clone[key] = value;
    setQuery(clone)
  } 

  const handleFind = async () => {
    await dispatch(getListJob(query))
  } 

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
      setData(result.data);
    };
    fetchData();
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
              <Search  placeholder="Từ khóa"/>
            </Col>
            <Col span={6}>
              <b>Công ty</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                
                style={{ width: '100%' }}
                placeholder="Công ty"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="All">Tất cả</Option>
                <Option value="All">Rockship</Option>
              </Select>
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
          </Row>
          <Row gutter={[16, 16]} className="body">
            <Col span={6}>
              <b>Địa điểm</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                
                style={{ width: '100%' }}
                placeholder="Địa điểm"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="All">Tất cả</Option>
                <Option value="All">Hà Nội</Option>
                <Option value="All">Hồ Chí Minh</Option>
                <Option value="All">Đà Nẵng</Option>
              </Select>
            </Col>
            <Col span={8}>
              <b>Mức lương</b>
              <div className="salary-form">
                <span className="content">từ</span>
                <Input  addonAfter={<span>$</span>}/>
                <span className="content">đến</span>
                <Input  addonAfter={<span>$</span>}/>
              </div>
            </Col>
            <Col span={6}>
              <b>Trạng thái</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                
                style={{ width: '100%' }}
                placeholder="Trang thái"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="All">Tất cả</Option>
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button icon={<SearchOutlined />}  type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />}  type="primary">Làm mới</Button>
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Table bordered columns={columns} dataSource={get(referred, 'list_job.items.job', [])}  />
      </div>
    </div>
  );
};

JobList.getInitialProps = async function({ reduxStore }) {
  reduxStore.dispatch(getListJob({offset: 0, limit: 20}))
  const { referred } = reduxStore.getState()
  return { referred }
};

export default connect(null, null)(JobList)
