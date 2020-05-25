import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Select, Menu, Typography, Card, Layout } from 'antd';
import { MailOutlined, DollarOutlined } from '@ant-design/icons';
import HeaderHome from '../components/HeaderHome'
import './styles.scss';
import { Router } from 'next/router';

const { Title } = Typography;
const { Footer } = Layout;
function Home() {
  
  return (

    <div className='home-page'>
      <div className="boude-menu">
        <HeaderHome/>
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
                'Tát cả,TP Hồ Chí Minh, Hà Nội'.split(', ')
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
            <div className="jobs">
              <Row className="card">
                {/* <Col span={3} /> */}
                <Col span={24} className="content">
                  <Card className="involveJob" >
                    <Title level={3}>1,173 IT jobs in Vietnam for you</Title>
                    <Card className="moreJobs">
                      <Row gutter={[16, 16]} className="oneRow">
                        <Col span={6} >
                          <img alt="example" src="https://cdn.itviec.com/employers/dxc-vietnam/logo/s65/U7GERVChzwPaBYXec1bQgPmP/DXC%20logo-icon.png" />
                        </Col>
                        <Col span={18} >
                          <Row>
                            <Col span={18} >
                              <Title level={3}>Why You'll Love Working Here</Title>
                              <div style={{ color: '#68ba50' }}><DollarOutlined /> You'll love it</div>
                            </Col>
                            <Col span={6} >
                              <div style={{ float: 'right', background: '#ff9e34', color: 'white', fontSize: '8', padding: 3 }}>Ant Design</div><br />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={18} >
                              <div>Role: As a COBOL Software Engineer, you will collaborate proactively with functional analysts to transla
                                            te business and integration requirements into...</div>
                            </Col>
                            <Col span={6} >
                              <div style={{ float: 'right' }}>Hồ Chí Minh</div><br />
                              <div style={{ float: 'right' }}>Tân Bình</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={18} >
                              <Button style={{ marginRight: 5 }}>J2EE</Button>
                              <Button style={{ marginRight: 5 }}>Java</Button>
                              <Button>Spring</Button>
                            </Col>
                            <Col span={6} >
                              <div style={{ float: 'right' }}>7 minutes ago</div><br />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Card>
                </Col>
                {/* <Col span={3} /> */}
              </Row>
            </div>
            
            <div className="news">
              <Row gutter={[8, 8]}>
                {/* <Col span={3} /> */}
                <Col span={9} >
                  <img className="img-news" alt="#" src="https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg" />
                </Col>
                <Col span={15}  >
                  <Title level={3}>Why You'll Love Working Here</Title>
                  <div className="content-news">Ever wanted an image to fit exactly into a certain given dimension, but while keeping its aspect ratio and avoid having a squished image? This wasn’t something that could easily be done using CSS for the longest time. One trick was to resort to using a background image instead to go around the issue. Well the problem is no more with the object-fit property!</div>
                </Col>
                {/* <Col span={3} /> */}
              </Row>
            </div>

          </Col>
          <Col span={4}  >
            <div className="news-right">
              <Row gutter={[8, 8]}style={{padding:10  }}>
                <Col span={24} >
                  <Title level={3}>TÌM VIỆC KHÓ - CÓ  ROCKSEARCH</Title>
                  <div className="content-news" style={{marginTop:20, textAlign:'center', marginBottom:20 }}><Button type="danger" href="/upload-home"  >Upload CV của bạn tại đây</Button></div>
                  <Title level={4}>SỞ HỮU NGAY CV XỊN CÙNG VIỆC LÀM MƠ ƯỚC</Title>
                  <p>30.000+ cơ hội việc làm được kết nối thành công qua Rocksearch mỗi ngày</p></Col>
                  
              </Row>
              {/* <Title level={3} className="title-right">Company Spotlight</Title> */}
              <img className="img-news" alt="#" src="https://aimacademy.vn/wp-content/uploads/2019/10/AIM-CV-Digital-02.png" />
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
