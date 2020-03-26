import React, { Component } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'
import { SettingFilled, DollarCircleFilled, FlagFilled } from '@ant-design/icons';
import { Pagination, Row, Col, Button, Tag, Input, Select } from 'antd';

import './styles.scss'

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
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

function JobList () {
  return (
    <div className="job-list-referrer">
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <h1 className="title"><span>614</span> Jobs</h1>
          <div className="list-job">
            <Pagination total={500} itemRender={itemRender} />
              {
                [1, 2, 3, 4, 5, 6 ,7 ,8 ,9, 10].map(item => (
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
            <Pagination total={500} itemRender={itemRender} />
          </div>
        </Col>
        <Col span={7}>
          <div className="filter-box">
            <div className="filter-item">
              <div className="title">Từ khóa</div>
              <Input placeholder="Enter job title, poisition, company..." />
            </div>
            <div className="filter-item">
              <div className="title">Địa điểm</div>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select a location"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Hà Nội</Option>
                <Option value="lucy">Hồ Chí Minh</Option>
                <Option value="tom">Đà Nẵng</Option>
              </Select>
            </div>
            <div className="filter-item">
              <div className="title">Mức thưởng</div>
              <div className="reward-slider">
                <div className="from">Từ</div>
                <Input placeholder="$ 100"/>
                <div className="to">Đến</div>
                <Input placeholder="$ 1000"/>
              </div>
            </div>
            <Button className="find-btn">Find</Button>
          </div>
        </Col>
      </Row>
      
    </div>
  )
};

JobList.getInitialProps = async function({ reduxStore }) {
  return {}
}

export default connect(null, null)(JobList)
