import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Select, Menu, Typography, Card, Layout } from 'antd';
import { MailOutlined, DollarOutlined } from '@ant-design/icons';
import HeaderHome from '../../components/HeaderHome';
import UploadCandidate from '../../components/UploadCandidate';
import FooterHome from '../../components/FooterHome';

import Router from 'next/router';
import './styles.scss';

const { Title } = Typography;
const { Footer } = Layout;
function Home() {
  const [current, setCurrent] = useState('');
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const [status, setStatus] = useState(false);
  const changeStatus = () => {
    console.log('vo day');
    setStatus(!status);
  }
  const hiddenForm = () => {
    if (!status) {
      return { visibility: 'hidden', height: 0 }
    }
  }
  return (

    <div className='home-page'>
      <div className="boude-menu">
        <HeaderHome />

      </div>
      {/* <div className="content-page">
      </div>
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
      </div> */}

      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="row">
              <div className="col-sm-3">
                <img alt="example" src="https://cdn.itviec.com/employers/dxc-vietnam/logo/s65/U7GERVChzwPaBYXec1bQgPmP/DXC%20logo-icon.png" />
              </div>
              <div className="col-sm-9">
                <div className="row">
                  <div className="col-sm-9">
                    <Title level={3}>Why You'll Love Working Here</Title>
                    <div style={{ color: '#68ba50' }}><DollarOutlined /> You'll love it</div>
                  </div>
                  <div className="col-sm-3" style={{ float: 'right', background: '#ff9e34', color: 'white', fontSize: '8', padding: 3 }}>
                    Ant Design
              </div>
                  <div className="col-sm-9">
                    <div > Role: As a COBOL Software Engineer, you will collaborate proactively with functional analysts to translate business and integration requirements into...</div>
                  </div>
                  <div className="col-sm-3" >
                    <div style={{ float: 'right' }}>Hồ Chí Minh</div><br />
                    <div style={{ float: 'right' }}>Tân Bình</div>
                  </div>
                  <div className="col-sm-9">
                    <Button style={{ marginRight: 5 }}>J2EE</Button>
                    <Button style={{ marginRight: 5 }}>Java</Button>
                    <Button>Spring</Button>
                  </div>
                  <div className="col-sm-3" >
                    <div style={{ float: 'right' }}>7 minutes ago</div><br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="row news-right" style={{ padding: 10 }}>
              <div style={{ padding: 10 }}>
                  <Title level={3}>TÌM VIỆC KHÓ - CÓ  ROCKSEARCH</Title>
                  <div className="content-news" style={{ marginTop: 20, textAlign: 'center', marginBottom: 20 }}><Button type="danger" href="/upload-home"  >Upload CV của bạn tại đây</Button></div>
                  <Title level={4}>SỞ HỮU NGAY CV XỊN CÙNG VIỆC LÀM MƠ ƯỚC</Title>
                  <p>30.000+ cơ hội việc làm được kết nối thành công qua Rocksearch mỗi ngày</p>
              </div>
              {/* <Title level={3} className="title-right">Company Spotlight</Title> */}
              <img className="img-news" alt="#" src="https://aimacademy.vn/wp-content/uploads/2019/10/AIM-CV-Digital-02.png" />
              <div className="title-right-child">POPS WorldWide</div>
              <div className="location">Hồ chí minh</div>
              <div className="description">POPS Worldwide is a leading digital entertainment company & based in VN</div>
            </div>
          </div>
        </div>
      </div>
      <FooterHome />
    </div>
  );
};

export default connect(null, null)(Home);
