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
      <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Thông tin post job</div>
      <Row gutter={[16, 16]}>
        <Col span={10} >
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <div className="content" style={{ padding: 18, height: 300 }} >
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={8}><span className='bold-span' style={{ fontWeight: 'bold' }}>Số jobs đã post : </span></Col>
                  <Col span={14}>10 JOBS HOT - 3 THƯỜNG</Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }}>
                  <Col span={8}><span className='bold-span' style={{ fontWeight: 'bold' }}>Post job hot đã mua: </span></Col>
                  <Col span={14}>3 JOBS HOT</Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={8}><span className='bold-span' style={{ fontWeight: 'bold' }}>Post job hot còn lại: </span></Col>
                  <Col span={14}>0 JOBS HOT</Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }}>
                  <Col span={8}><span className='bold-span' style={{ fontWeight: 'bold' }}>Post job thường: </span></Col>
                  <Col span={14}>3 JOBS THƯỜNG</Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }}>
                  <Col span={8}><span className='bold-span' style={{ fontWeight: 'bold' }}>Post job thường còn lại: </span></Col>
                  <Col span={14}>1 JOBS THƯỜNG</Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ background: 'white',height:'50vh' }}>
                <div style={{ background: 'white', padding: 20 }} >
                  <Title level={3}>History</Title>
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
                  <Title level={3}>{get(referred, 'company_detail.data.company.name', [])}[Liên hệ ] với chúng tôi </Title>
                  <div>{get(referred, 'company_detail.data.company.address', [])}</div>
                  <div ><FacebookOutlined />&nbsp;<a href={get(referred, 'company_detail.data.company.facebook')} rel="noopener noreferrer" target="_blank">{get(referred, 'company_detail.data.company.facebook')}facebook.com</a></div>
                  <div ><MailOutlined />&nbsp;<a>{get(referred, 'company_detail.data.company.email_cc')} abc@gmail.com</a></div>
                  <div ><IeOutlined />&nbsp;<a href={get(referred, 'company_detail.data.company.career_site')} rel="noopener noreferrer" target="_blank">{get(referred, 'company_detail.data.company.career_site')}abc.com</a></div>
                  <div ><PhoneOutlined />&nbsp;<a>{get(referred, 'company_detail.data.company.phone_number')}03395764324</a></div>
                </div>
              </Col>
              {/* <Col span={5} >
                <Button style={{ marginBottom: 5, marginTop: 100 }} type="primary" danger block>Contact me</Button>
              </Col> */}
            </Row>
            <Col span={24}>
              <div style={{ background: 'white', padding: 20 }} >
                <Title level={3}>Bảng giá các gói post jobs: </Title>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={3}>JOB HOT</Col>
                  <Col span={19}><span className='bold-span' style={{ fontWeight: 'bold' }}>1 NĂM </span> GIÁ 2.000.000 VNĐ / POST JOBS </Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={3}>JOB THƯỜNG</Col>
                  <Col span={19}><span className='bold-span' style={{ fontWeight: 'bold' }}>1 NĂM </span> GIÁ 1.000.000 VNĐ / POST JOBS  </Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={3}>5 JOB THƯỜNG</Col>
                  <Col span={19}><span className='bold-span' style={{ fontWeight: 'bold' }}>1 NĂM </span> GIÁ 5.000.000 VNĐ / 5 POST JOBS  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ background: 'white', padding: 20 }} >
                <Title level={3}>Giới thiệu về các gói: </Title>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={3}><span className='bold-span' style={{ fontWeight: 'bold' }}>POST JOB HOT</span></Col>
                  <Col span={19}> Với mỗi lần post job sẽ trừ trực tiếp vào số lần post đã mua. Mỗi lần dùng bài post sẽ hiển thị trong  vòng 30 ngày và sẽ luôn đứng top trong những công việc hàng đầu niếu bạn không gia hạn công việc sẽ tự động cancel . Niếu bạn gia hạn công việc sẽ tiếp tục tuyển cho đến kỳ post job đã chọn cho công việc. </Col>
                </Row>
                <Row className='row-detail' style={{ paddingTop: 24 }} >
                  <Col span={3}><span className='bold-span' style={{ fontWeight: 'bold' }}>POST JOB THƯỜNG</span></Col>
                  <Col span={19}> Với mỗi lần post job sẽ trừ trực tiếp vào số lần post đã mua. Mỗi lần dùng bài post sẽ hiển thị trong  vòng 10 ngày niếu bạn không gia hạn công việc sẽ tự động cancel . Niếu bạn gia hạn công việc sẽ tiếp tục tuyển cho đến kỳ post job đã chọn cho công việc. </Col>
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
  // console.log(state);
  const { referred, profile } = state;
  return { referred, profile };
}
export default connect(mapStateToProps, null)(jobDetail);