import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Select, Menu, Typography, Card, Layout } from 'antd';
import { MailOutlined, DollarOutlined } from '@ant-design/icons';
import HeaderHome from '../../components/HeaderHome';
import UploadCandidate from '../../components/UploadCandidate';

import Router from 'next/router';
import './styles.scss';

const { Title } = Typography;
const { Footer } = Layout;
function Home() {
  const [current, setCurrent] = useState('');
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const [ status,setStatus ] = useState(false);
  const changeStatus =()=>{
    console.log('vo day');
    setStatus(!status);
  }
  const hiddenForm = ()=>{
    if(!status){
      return {visibility: 'hidden',height:0}
    }
  }
  return (

    <div className='home-page'>
      <div className="boude-menu">
        <HeaderHome />

      </div>
      <div className="content-page">
        <Row >
          <Col span={3} />
          <Col span={14} >
            <div className="news">
              <Row gutter={[8, 8]} style={{ padding: 10 }}>
                <Col span={24} >
                  <Title level={3}>TÌM VIỆC KHÓ - CÓ  ROCKSEARCH</Title>
                  <div className="content-news" style={{ marginTop: 20, marginBottom: 20 }}><Button type="danger"  onClick={()=>changeStatus()}>Upload CV của bạn tại đây</Button></div>
                  <Title level={4}>SỞ HỮU NGAY CV XỊN CÙNG VIỆC LÀM MƠ ƯỚC</Title>
                  <p>30.000+ cơ hội việc làm được kết nối thành công qua Rocksearch mỗi ngày</p></Col>
                <Col span={24}  style={hiddenForm()} >
                  <Title level={3}>TÌM VIỆC KHÓ - CÓ  ROCKSEARCH</Title>
                  <UploadCandidate />
                </Col>

              </Row>
            </div>
          </Col>
          <Col span={4}  >
            <div className="news-right">
              <Title level={3} className="title-right">Company Spotlight</Title>
              <img className="img-news" alt="#" src="https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg" />
              <div className="title-right-child">POPS WorldWide</div>
              <div className="location">Hồ chí minh</div>
              <div className="description">POPS Worldwide is a leading digital entertainment company & based in VN</div>
            </div>
          </Col>
          <Col span={3} />
        </Row>
      </div>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </div>
  );
};

export default connect(null, null)(Home);
