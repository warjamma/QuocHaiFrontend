import React from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Select } from 'antd';
import Router from 'next/router';
import Particles from 'react-particles-js';
import FooterHome from '../../components/FooterHome';
import MenuHome from '../../components/MenuHome';
import './styles.scss';

const { Title } = Typography;
// const { Search } = Input;
function Home() {
  return (
    <div className="home-page">
      <Particles
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
      />
      <div className="boude-menu">
        <MenuHome />
      </div>

      <div className="container job">
        <div className="row">
          <div className="col-sm-9">
            <div className="showbutton row">
              <div className="col-sm-12" style={{padding:20}}>
              <Title level={3} style={{ fontSize:44, fontWeight:'bold', textTransform:'uppercase', color:'green'}}>BẠN MUỐN TÌM VIỆC </Title>

              </div>
              <div className="col-sm-12">
                <div style={{textTransform:'uppercase', color:'green', fontSize:22, fontStyle:'italic', fontWeight:'bold'}}>Tìm việc phù hợp, nhận thêm tiền thưởng. <span style={{color: '#00cdfb', fontSize:35}}>KHÁM PHÁ NGAY!!!</span></div>
                <p style={{ fontSize:16, fontWeight:600, color: 'black'}}>Kết nối ứng viên với 10.000+ Job chất và 9.000 headhunt</p>
              </div>
              <div className="col-sm-3">
                <Button
                  type="primary"
                  className=" search-btn aa"
                  danger
                  onClick={() =>Router.push('/')}
                >
                  View job
                </Button>
              </div>
              <div className="col-sm-3">
                <Button
                  type="primary"
                  className=" search-btn bb"
                  danger
                  onClick={() =>Router.push('/upload-cv-home')}
                >
                  Upload cv
                </Button>
              </div>
              <div className="col-sm-3">
                <Button
                  type="primary"
                  className=" search-btn cc"
                  danger
                  onClick={() =>Router.push('/upload-cv-home')}
                >
                  Tạo Cv
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
  const { company } = state;
  return { company };
}

export default connect(mapStateToProps, null)(Home);
