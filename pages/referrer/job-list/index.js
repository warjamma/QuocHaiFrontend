import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'
import { SettingFilled, DollarCircleFilled, FlagFilled } from '@ant-design/icons';
import { Pagination, Row, Col, Button, Tag, Input, Select } from 'antd';
import { getListJob } from '../../../containers/referred/actions';
import { get } from 'lodash';

import './styles.scss'

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

function onSearch(val) {
  console.log('search:', val);
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

  const changeQuery = (key, value) => {
    let clone = { ...query };
    clone[key] = value;
    setQuery(clone)
  } 

  const handleFind = async () => {
    await dispatch(getListJob(query))
  } 

  return (
    <div className="job-list-referrer">
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <h1 className="title"><span>{get(referred, 'list_job.pagination.count', 0)}</span> Jobs</h1>
          {
            get(referred, 'list_job.pagination.count', 0) ? (
              <div className="list-job">
                <Pagination total={get(referred, 'list_job.pagination.count', 0)} itemRender={itemRender} />
                  {
                    get(referred, 'list_job.items.job', []).map(item => (
                      <Row key={item} className="item">
                        <Col span={4}>
                          <img className="logo-company" src="https://topdev.vn/files/logos/eee36e0693d50266f16846c4bdf57168.png" alt="logo" />
                          <div className="slot">(+ 5 slot)</div>
                        </Col>
                        <Col className="info-company" span={15}>
                          <div className="job-name">
                            [Junior/Senior] Software Developer (.NET, JavaScript) (ASP.NET, C#, ReactJS, Visual Studio)
                          </div>
                          <div className="company-name">GrapeCity</div>
                          <div className="list-required">
                            {
                              ['Junior', 'Senior'].map(item => (
                                <Tag key={item} color="blue">{item}</Tag>
                              ))
                            }
                          </div>
                          <div className="salary-job">
                            <div className="item-s">
                              <FlagFilled />
                              <div>Hồ Chí Minh</div>
                            </div>
                            <div className="item-s">
                              <SettingFilled />
                              <div>Outsourcing</div>
                            </div>
                            <div className="item-s">
                              <DollarCircleFilled />
                              <div className="money">$700 - $2,000</div>
                            </div>
                          </div>
                          <div className="list-required">
                            {
                              ['ASP.NET', 'JavaScript', 'C#', '.NET', 'ReactJS', 'Visual Studio'].map(item => (
                                <Tag key={item} color="blue">{item}</Tag>
                              ))
                            }
                          </div>
                        </Col>
                        <Col className="review-of" span={5}>
                          <div className="review-of__item reward-m">
                            <div>
                              <Tag color="green">$ 100</Tag>
                            </div>
                          </div>
                          <div className="review-of__item">
                            <Button>My referred (0)</Button>
                          </div>
                        </Col>
                      </Row>
                    ))
                  }
                <Pagination total={get(referred, 'list_job.pagination.count', 0)} itemRender={itemRender} />
              </div>
            ) : null
          }
        </Col>
        <Col span={7}>
          <div className="filter-box">
            <div className="filter-item">
              <div className="title">Từ khóa</div>
              <Input onChange={(e) => changeQuery('key_word', e.target.value)} placeholder="Enter job title, poisition, company..." />
            </div>
            <div className="filter-item">
              <div className="title">Công Ty</div>
              <Input onChange={(e) => changeQuery('company', e.target.value)} placeholder="Enter job title, poisition, company..." />
            </div>
            <div className="filter-item">
              <div className="title">Công việc</div>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select a location"
                optionFilterProp="children"
                onChange={(e) => changeQuery('job_type', e)}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="Developer">Developer</Option>
              </Select>
            </div>
            <div className="filter-item">
              <div className="title">Địa điểm</div>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select a location"
                optionFilterProp="children"
                onChange={(e) => changeQuery('location', e)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="HaNoi">Hà Nội</Option>
                <Option value="HoChi minh">Hồ Chí Minh</Option>
                <Option value="DaNang">Đà Nẵng</Option>
              </Select>
            </div>
            <div className="filter-item">
              <div className="title">Mức thưởng</div>
              <div className="reward-slider">
                <div className="from">Từ</div>
                <Input onChange={(e) => changeQuery('min_salary', e.target.value)} placeholder="$ 100"/>
                <div className="to">Đến</div>
                <Input onChange={(e) => changeQuery('max_salary', e.target.value)} placeholder="$ 1000"/>
              </div>
            </div>
            <Button onClick={handleFind} className="find-btn">Find</Button>
          </div>
        </Col>
      </Row>
      
    </div>
  )
};

JobList.getInitialProps = async function({ reduxStore }) {
  reduxStore.dispatch(getListJob({offset: 0, limit: 20}))
  const { referred } = reduxStore.getState()
  return { referred }
}

export default connect(null, null)(JobList)
