import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Select, Menu, Typography, Card, Layout } from 'antd';
import { MailOutlined, DollarOutlined } from '@ant-design/icons';
import Router from 'next/router';
import './styles.scss';

const { Title } = Typography;
const { Footer } = Layout;
function Home() {
  const [current, setCurrent] = useState('');
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (

    <div className='home-page'>
      <div className="boude-menu">
        <Row className="menu">
          <Col span={3} />
          {/* <Col span={3} >
            <img src="https://www.rockship.co/images/rs-logo-img.png" alt="#" />
          </Col> */}
          <Col span={9} >
            <a href="/"  ><img className="name-logo" src="https://www.rockship.co/images/rs-logo-text.png" alt="#" /></a>

          </Col>
          <Col span={9} className="task-bar">
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
              <Menu.Item key="home" icon={<MailOutlined />}>
                <a href="/" style={{ color: 'white' }}>All jobs</a>
              </Menu.Item>
              <Menu.Item key="it-companies" icon={<MailOutlined />}>
                IT Companies
        </Menu.Item>
              <Menu.Item key="blog" icon={<MailOutlined />}>
                <a href="/blog" style={{ color: 'white' }}>Blog</a>
              </Menu.Item>
              <Menu.Item key="upload-cv" icon={<MailOutlined />}>
                <a href="/upload-candidate/e93fc859-8c27-4d29-a540-fcefbe545f85" style={{ color: 'white' }}>Upload cv</a>
              </Menu.Item>
              <Menu.Item key="login" icon={<MailOutlined />}>
                <a href="/login" style={{ color: 'white' }}>Đăng nhập</a>
              </Menu.Item>
            </Menu>
          </Col>
          {/* <Col span={3} /> */}
          <Col span={3} />
        </Row>
        <Row className="search">
          <Col span={3} />
          <Col span={12} className="search1">
            <Select
              placeholder="Keyword skill (Java, iOS...), Job Title, Company..."
              mode="tags"
              style={{ width: '100%' }}
            >
              {
                'C-level, Department head, Director, Junior, Manager, Middle, Senior, Specialist, Team Leader'.split(', ')
                  .map(item => (
                    <Select.Option key={item} value={item}>{item}</Select.Option>
                  ))
              }
            </Select>
          </Col>
          {/* <Col span={1}/> */}
          <Col span={3} className="search2">
            <Select
              placeholder="All location"
              // mode="tags"
              style={{ width: '100%' }}
            >
              {
                'Tát cả, TP Hồ Chí Minh, Hà Nội'.split(', ')
                  .map(item => (
                    <Select.Option key={item} value={item}>{item}</Select.Option>
                  ))
              }
            </Select>
          </Col>
          {/* <Col span={1}/> */}
          <Col span={3} className="search-btn">
            <Button type="primary" className=" search-btn" danger>  Tìm kiếm </Button>
          </Col>
          <Col span={3} />
        </Row>
      </div>


      <div className="content-page">
        <Row >
          <Col span={3} />
          <Col span={14} >
            <div className="news">
              <Row gutter={[8, 8]}>
                {/* <Col span={3} /> */}
                <Col span={9} >
                  <img className="img-news" alt="#" src="https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg" />
                </Col>
                <Col span={15} >
                  <Title level={3}>Why You'll Love Working Here</Title>
                  <div className="content-news">Ever wanted an image to fit exactly into a certain given dimension, but while keeping its aspect ratio and avoid having a squished image? This wasn’t something that could easily be done using CSS for the longest time. One trick was to resort to using a background image instead to go around the issue. Well the problem is no more with the object-fit property!</div>
                </Col>
                {/* <Col span={3} /> */}
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
