/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { Button, Row, Col, Typography } from 'antd';
import { get } from 'lodash';
import {
  FacebookOutlined,
  IeOutlined,
  MailOutlined,
  PhoneOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { getCompanyById } from '../../../containers/referred/actions';
import './styles.scss';


const { Title } = Typography;
function jobDetail(props) {
  const router = useRouter();
  const { id } = router.query;

  const { dispatch, referred, profile } = props;
  // get(profile,)
  // useEffect(() => {
  //   dispatch(getCompanyById({ id }));
  // }, []);

  // const pushRouter = (name) => {
  //   Router.push({
  //     pathname: `/job-list`,
  //     query: { name },
  //   });
  // };
  return (
    <div className="company-profile" >
      <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Số lượt đăng tuyển</div>
      <Row gutter={[16, 16]}>
        <Col span={10} >
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <div className="content" style={{ padding: 18, height: 300 }} >
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={9}><span className='bold-span' style={{ fontWeight: 'bold' }}>Số lượt đã đăng tuyển : </span></Col>
                  <Col span={13}>10 lượt ưu tiên - 3 lượt thường</Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }}>
                  <Col span={9}><span className='bold-span' style={{ fontWeight: 'bold' }}>Lượt đăng tuyển ưu tiên đã mua: </span></Col>
                  <Col span={13}>3 lượt</Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={9}><span className='bold-span' style={{ fontWeight: 'bold' }}>Lượt đăng tuyển ưu tiên còn lại: </span></Col>
                  <Col span={13} style={{ fontWeight: 'bold', color: 'blue' }}>0 lượt</Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }}>
                  <Col span={9}><span className='bold-span' style={{ fontWeight: 'bold' }}>Lượt đăng tuyển thường đã mua: </span></Col>
                  <Col span={13} >3 lượt</Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }}>
                  <Col span={9}><span className='bold-span' style={{ fontWeight: 'bold' }}>Lượt đăng tuyển thường còn lại: </span></Col>
                  <Col span={13} style={{ fontWeight: 'bold', color: 'blue' }}>1 lượt</Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ background: 'white', height: '50vh' }}>
                <div style={{ background: 'white', padding: 20 }} >
                  <Title level={3}>Lịch sử hoạt động</Title>
                  <Row className='row-detail' style={{ paddingTop: 24 }} >
                    <Col span={5}>11:33 12-11-2019</Col>
                    <Col span={17}><span className='bold-span' style={{ fontWeight: 'bold' }}>30 JOBS HOT </span> ON 12.11.2019 <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>< EllipsisOutlined /></span> </Col>
                    <Col span={5}>11:33 12-11-2019</Col>
                    <Col span={17}><span className='bold-span' style={{ fontWeight: 'bold' }}>30 JOBS HOT </span> ON 12.11.2019 <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>< EllipsisOutlined /></span> </Col>
                    <Col span={5}>11:33 12-11-2019</Col>
                    <Col span={17}><span className='bold-span' style={{ fontWeight: 'bold' }}>30 JOBS HOT </span> ON 12.11.2019 <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>< EllipsisOutlined /></span> </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <div className="content"   >
            <Row gutter={[16, 16]}>
              <Col span={6} ><img style={{ padding: 'auto', margin: 'auto', display: 'block', height: 250, width: 250, objectFit: 'scale-down' }} alt="example" src='https://d3t1myknaqth5d.cloudfront.net/files/1589253980.jpeg' /></Col>
              {/* <Col span={4} ><img style={{ padding: 'auto', margin: 'auto', display: 'block', height: 250, width: 250, objectFit: 'scale-down' }} alt="example" src={'get(referred, 'company_detail.data.company.avatar', [])'} /></Col> */}
              <Col span={18} >
                <div style={{ background: 'white', padding: 20 }} >
                  <Title level={3}> [Liên hệ ] {get(profile, 'data.employer.company.name', [])} </Title>
                  <div>{get(profile, 'data.employer.company.address', [])}</div>
                  <div ><FacebookOutlined />&nbsp;<a href={get(profile, 'data.employer.company.facebook')} rel="noopener noreferrer" target="_blank">{get(profile, 'data.employer.company.facebook')}</a></div>
                  <div ><MailOutlined />&nbsp;<a>{get(profile, 'data.employer.company.email_cc')} </a></div>
                  <div ><IeOutlined />&nbsp;<a href={get(profile, 'data.employer.company.career_site')} rel="noopener noreferrer" target="_blank">{get(profile, 'data.employer.company.career_site')}</a></div>
                  <div ><PhoneOutlined />&nbsp;<a>{get(profile, 'data.employer.company.phone_number')}</a></div>
                </div>
              </Col>
              {/* <Col span={5} >
                <Button style={{ marginBottom: 5, marginTop: 100 }} type="primary" danger block>Contact me</Button>
              </Col> */}
            </Row>
            <Col span={24}>
              <div style={{ background: 'white', padding: 20 }} >
                <Title level={3}>Bảng giá các gói đăng tuyển: </Title>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={5}>ĐĂNG TUYỂN ƯU TIÊN</Col>
                  <Col span={17}><span className='bold-span' style={{ fontWeight: 'bold' }}>1 NĂM </span> Gói 3 lượt: 3.250.000 x 3 = 9.750.000 đ giảm giá 16% khi mua 2 gói = 16.380.000 đ </Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={5} >ĐĂNG TUYỂN THƯỜNG</Col>
                  <Col span={17}>
                    <Row className='row-detail' >
                      <Col span={24}><span className='bold-span' style={{ fontWeight: 'bold' }}>1 NĂM </span> Gói 3 lượt: 1.450.000 x 3 = 4.350.000 đ  </Col>
                      <Col span={24}><span className='bold-span' style={{ fontWeight: 'bold' }}>1 NĂM </span> Gói 5 lượt: 1.450.000 x 5 = 7.250.000 đ giảm giá 16% = 6.090.000 đ  </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={24}>Nếu hết thời hạn đăng tuyển mà công ty chưa tuyển được nhân viên ở vị trí đó thì chúng tôi sẽ tặng thêm 10 ngày hiển thị.</Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ background: 'white', padding: 20 }} >
                <Title level={3}>Giới thiệu về các gói: </Title>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={5}><span className='bold-span' style={{ fontWeight: 'bold' }}>LƯỢT ĐĂNG TUYỂN ƯU TIÊN</span></Col>
                  <Col span={17}> Với mỗi lần post job sẽ trừ trực tiếp vào số lượt đăng tuyển ưu tiên đã mua. Mỗi lần bài đăng tuyển ưu tiên sẽ hiển thị trong vòng 30 ngày và sẽ luôn đứng top trong những công việc hàng đầu niếu bạn không gia hạn công việc sẽ tự động cancel . Niếu bạn gia hạn công việc sẽ tiếp tục tuyển cho đến kỳ post job đã chọn cho công việc. </Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={5}><span className='bold-span' style={{ fontWeight: 'bold' }}>LƯỢT ĐĂNG TUYỂN THƯỜNG</span></Col>
                  <Col span={17}> Với mỗi lần post job sẽ trừ trực tiếp vào số lượt đăng tuyển thường đã mua. Mỗi lần dùng bài đăng tuyển thường sẽ hiển thị trong  vòng 30  ngày niếu bạn không gia hạn công việc sẽ tự động cancel . Niếu bạn gia hạn công việc sẽ tiếp tục tuyển cho đến kỳ post job đã chọn cho công việc. </Col>
                </Row>
              </div>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
}
function mapStateToProps(state) {
  console.log(state);
  const { referred, profile } = state;
  return { referred, profile };
}
export default connect(mapStateToProps, null)(jobDetail);