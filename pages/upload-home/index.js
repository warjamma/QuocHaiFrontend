import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Select, Input } from 'antd';
import { get } from 'lodash';
import Router from 'next/router';
import FooterHome from '../../components/FooterHome';
import MenuHome from '../../components/MenuHome';
import JobInfo from '../../components/JobInfo';
import { getListJob } from '../../containers/job/actions';
import './styles.scss';

const { Title } = Typography;
// const { Search } = Input;
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
  const { dispatch, company } = props;

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
    await dispatch(getListJob(clone));
  };

  useEffect(() => {
    dispatch(getListJob(query));
  }, [query]);
  return (
    <div className="home-page">
      <div className="boude-menu">
        <MenuHome />
        <div className="searchh container">
          <div className="row">
            <div className="search1 col-sm-6">
              {/* <Search value={query.key_word} onChange={(e) => changeQuery('key_word', e.target.value)} placeholder="Từ khóa" /> */}
              <Select
                placeholder="Keyword skill (Java, iOS...), Job Title, Company..."
                mode="tags"
                style={{ width: '100%' }}
                allowClear
                showSearch
                onChange={(e) => changeQuery('job_role', e)}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                value={query.job_type}
              >
                {'C-level, Department head, Director, Junior, Manager, Middle, Senior, Specialist, Team Leader'
                  .split(', ')
                  .map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
              </Select>
            </div>
            <div className="search2 col-sm-3">
              <Select
                placeholder="All location"
                // mode="tags"
                style={{ width: '100%' }}
              >
                {'Tát cả, TP Hồ Chí Minh, Hà Nội'.split(', ').map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="search-btn col-sm-3">
              <Button
                type="primary"
                className=" search-btn"
                danger
                onClick={() => handleFind()}
              >
                {' '}
                Tìm kiếm{' '}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container job">
        <div className="row">
          <div className="col-sm-9 job-list">
            {get(company, 'list_job.items.job', []).map((item) => {
              return (
                <div key={item.id}>
                  <JobInfo
                    value={item}
                    loading={get(company, 'is_loading', false)}
                  />
                </div>
              );
            })}
          </div>
          <div className="col-sm-3">
            <div
              className="row news-right"
              style={{
                padding: 10,
                background: '#C4C4C4',
                borderRadius: 8,
                margin: '30px 0px 0px 20px',
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
                    onClick={() => Router.push(`/upload-cv-home`)}
                    type="danger"
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
              {/* <Title level={3} className="title-right">Company Spotlight</Title> */}
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
      {/* <div style={hiddenForm()} className="container">
        <Title level={3}>TÌM VIỆC KHÓ - CÓ ROCKSEARCH</Title>
        <UploadCandidate />
      </div> */}
      <div>
        {' '}
        <FooterHome />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { company } = state;
  return { company };
}

export default connect(mapStateToProps, null)(Home);
