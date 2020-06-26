import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from 'antd';
import DescriptionUpload from '../../../components/DescriptionUpload';
import FooterHome from '../../../components/FooterHome';
import MenuHome from '../../../components/MenuHome';
import './styles.scss';

const { Title } = Typography;
 
function Home() {
 
  const [status, setStatus] = useState(false);


  const changeStatus = () => {
    setStatus(!status);
  };

  return (
    <div className="upload-cv-home">
      <div className="boude-menu">
        <MenuHome />
        <div className="searchh container" >
          {/* <Title level={4}>Upload CV của bạn</Title> */}
        </div>
      </div>

      <div className="container job">
        <div className="row">
          <div className="col-sm-9 job-list">
              <DescriptionUpload />
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
      <div>
        {' '}
        <FooterHome />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { company  } = state;
  return { company  };
}

export default connect(mapStateToProps, null)(Home);
