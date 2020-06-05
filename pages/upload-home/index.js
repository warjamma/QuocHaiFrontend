import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Select } from 'antd';
import HeaderHome from '../../components/HeaderHome';
import UploadCandidate from '../../components/UploadCandidate';
import FooterHome from '../../components/FooterHome';
import MenuHome from '../../components/MenuHome';
import JobInfo from '../../components/JobInfo';
import './styles.scss';

const { Title } = Typography;
function Home() {
  const [status, setStatus] = useState(false);
  const changeStatus = () => {
    setStatus(!status);
  };
  const hiddenForm = () => {
    if (!status) {
      return { visibility: 'hidden', height: 0 };
    }
  };
  return (
    <div className="home-page">
      <div className="boude-menu">
        {/* <HeaderHome /> */}
        <MenuHome />
        <div className="searchh container">
          <div className="row">
            <div className="search1 col-sm-6">
              <Select
                placeholder="Keyword skill (Java, iOS...), Job Title, Company..."
                mode="tags"
                style={{ width: '100%' }}
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
                {'Tát cả,TP Hồ Chí Minh, Hà Nội'.split(', ').map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div  className="search-btn col-sm-3">
              <Button type="primary" className=" search-btn" danger>
                {' '}
                Tìm kiếm{' '}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="content-page">

        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <Title level={3}>TÌM VIỆC KHÓ - CÓ  ROCKSEARCH</Title>
              <div className="content-news" style={{ marginTop: 20, marginBottom: 20 }}><Button type="danger" onClick={() => changeStatus()}>Upload CV của bạn tại đây</Button></div>
              <Title level={4}>SỞ HỮU NGAY CV XỊN CÙNG VIỆC LÀM MƠ ƯỚC</Title>
              <p>30.000+ cơ hội việc làm được kết nối thành công qua Rocksearch mỗi ngày</p>
              <div style={hiddenForm()}>
                <Title level={3}>TÌM VIỆC KHÓ - CÓ  ROCKSEARCH</Title>
                <UploadCandidate />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="news-right">
                <Title level={3} className="title-right">Company Spotlight</Title>
                <div className="title-right-child">POPS WorldWide</div>
                <div className="location">Hồ chí minh</div>
                <div className="description">POPS Worldwide is a leading digital entertainment company & based in VN</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container job">
        <div className="row">
          <div className="col-sm-9 job-list">
            <JobInfo />
            <JobInfo />
            <JobInfo />
            <JobInfo />
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
                  <Button onClick={() => changeStatus()} type="danger">
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
      <div style={hiddenForm()} className="container">
        <Title level={3}>TÌM VIỆC KHÓ - CÓ ROCKSEARCH</Title>
        <UploadCandidate />
      </div>
      <div>
        {' '}
        <FooterHome />
      </div>
    </div>
  );
}

export default connect(null, null)(Home);
