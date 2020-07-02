import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Select, Input } from 'antd';
import { get } from 'lodash';
import Router from 'next/router';
import Particles from 'react-particles-js';
import FooterHome from '../components/FooterHome';
import MenuHome from '../components/MenuHome';
import JobInfo from '../components/JobInfo';
import { getListJob } from '../containers/job/actions';
import SliderHome from '../components/SliderHome';
import './styles.scss';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;
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
function Home(props) {
  const { dispatch, referred } = props;
  const [status, setStatus] = useState(false);
  const [query, setQuery] = useState(initQuery);
  const changeQuery = (key, value) => {
    const clone = { ...query };
    clone[key] = typeof value === 'object' ? value.join(', ') : value;
    setQuery(clone);
  };
  const handleFind = async () => {
    const clone = { ...query };
    clone.offset = 0;
    setQuery(clone);
    await dispatch(getListJob(clone)).then((res) => {
      if (res.data.items.job.length === 0) {
        const clone2 = { ...initQuery };
        clone2.offset = 0;
        setQuery(clone2);
        dispatch(getListJob(clone2));
        setStatus(true);
      } else {
        setStatus(false);
      }
    });
  };
  const hiddenNotFound = () => {
    if (!status) {
      return { visibility: 'hidden', height: 0 };
    }
    return {
      paddingLeft: 32,
      fontSize: 14,
      color: '#212224',
      fontWeight: 600,
    };
  };
  useEffect(() => {
    dispatch(getListJob(query));
  }, []);
  const dandleLoadMore = async () => {
    const clone = { ...query };
    clone.limit += 10;
    setQuery(clone);
    await dispatch(getListJob(clone));
  };

  return (
    <div className="home-page">
      <SliderHome/>
      {/* <Particles
        params={{
          particles: {
            // line_linked: {
            //   shadow: {
            //     enable: true,
            //     color: '#3CA9D1',
            //     blur: 5,
            //   },
            // },
            number: {
              value: 0,
            },
            size: {
              value: 0,
            },
          },
        }}
        style={{
          width: '100%',
          backGroud: '#051633',
        }}
      /> */}
      <div className="boude-menu">
        <MenuHome />
        <div className="searchh container">
          <div className="row">
            <div className="search1 col-sm-4">
              {/* <Search value={query.key_word} onChange={(e) => changeQuery('key_word', e.target.value)} placeholder="Từ khóa" /> */}
              <Select
                placeholder="Keyword skill (Java, iOS...), Job Title, Company..."
                mode="tags"
                style={{ width: '100%' }}
                allowClear
                showSearch
                onChange={(e) => changeQuery('key_word', e)}
                optionFilterProp="children"
                // filterOption={(input, option) =>
                //   option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                //   0
                // }
                value={query.job_type}
              >
                {'Account Management, Administration, Backend, Branding, Business Analyst, Business Development, CEO, CFO, CMO, Consultant, Content Creator, COO, CTO, Customer Service, Data Analyst, Designer, Developer, DevOps, Digital Marketing, Engineering, Finace/Accounting, Frontend, Fullstack, Game, General management, HR, HSE, Import - Export, Logistic, maintenance, Management, Market Research, marketing, Merchandising, Mobile, Office Management, Operation Management, Operations, Planning, Product Management, Production, Project Management, Public Relation, QA/QC, Quality Control, Recruitment, Research & Development, Researcher, Sales, Scrum Master, Software Architect, Software Development, Supply Chain, Teacher, Techical Sales, Tester, Traditional Marketing, Trainer'
                  .split(', ')
                  .map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
              </Select>
              <div>
                <div className="search2 ">
                  <Select
                    style={{ width: '100%' }}
                    allowClear
                    showSearch
                    onChange={(e) => changeQuery('location', e)}
                    placeholder="All location"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    value={query.location}
                  >
                    <Option value="">Tất cả</Option>
                    <Option value="Hà Nội">Hà Nội</Option>
                    <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                    <Option value="Đà Nẵng">Đà Nẵng</Option>
                  </Select>
                </div>
                <div className="search-btn ">
                  <Button
                    type="primary"
                    className=" search-btn"
                    danger
                    onClick={() => handleFind()}
                  >
                    ROCKSEARCH
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-sm-8"> </div>
          </div>
        </div>
      </div>

      <div className="container job">
        <div className="row">
          <div className="col-sm-9">
            <div className="job-list">
              <div className="col-sm-12" style={hiddenNotFound()}>
                {' '}
                The job you're looking for doesn't exist.
              </div>
              {get(referred, 'list_job.items.job', []).map((item) => {
                return (
                  <div key={item.id}>
                    <JobInfo
                      value={item}
                      loading={get(referred, 'is_loading', false)}
                    />
                  </div>
                );
              })}
              <div className="col-sm-12 mt-4" style={{ maginTop: '10px' }}>
                <Button
                  // type="primary"
                  className=" search-btn"
                  danger
                  onClick={() => dandleLoadMore()}
                  style={{
                    textAlign: 'center',
                    display: 'block',
                    margin: 'auto',
                    borderColor: '#222222',
                    color: '#222222',
                    width: 250,
                  }}
                >
                  Load more
                </Button>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div
              className="row news-right"
              style={{
                padding: 10,
                background: '#f4f4f4',
                borderRadius: 8,
                margin: '24px 0px 0px 20px',
              }}
            >
              <div style={{ padding: 10 }}>
                <Title level={3}>TÌM VIỆC KHÓ - CÓ ROCKSEARCH</Title>
                <div
                  className="content-news"
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    marginBottom: 20,
                  }}
                >
                  <Button
                    role="presentation"
                    onClick={() => Router.push(`/recuiterment`)}
                    style={{
                      background: '#f67f32',
                      borderColor: '#f67f32',
                      color: 'white',
                    }}
                  >
                    Upload CV của bạn tại đây
                  </Button>
                </div>
                <Title level={4}>SỞ HỮU NGAY CV XỊN CÙNG VIỆC LÀM MƠ ƯỚC</Title>
                <p>
                  30.000+ cơ hội việc làm được kết nối thành công qua Rocksearch
                  mỗi ngày
                </p>
              </div>
              <img
                className="img-news"
                alt="#"
                src="https://aimacademy.vn/wp-content/uploads/2019/10/AIM-CV-Digital-02.png"
              />
              <div className="title-right-child">POPS WorldWide</div>
              <div className="location">Hồ chí minh</div>
              <div className="description">
                POPS Worldwide is a leading digital entertainment company &
                based in VN
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '60px' }}>
        {' '}
        <FooterHome />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { referred, profile } = state;
  return { referred, profile };
}

export default connect(mapStateToProps, null)(Home);
