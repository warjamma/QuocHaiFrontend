/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { Button, Row, Col, Typography,Table, Tag, Space } from 'antd';
import { get } from 'lodash';
import {
    FacebookOutlined,
    IeOutlined,
    MailOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import { getCompanyById } from '../../../containers/referred/actions';
import './styles.scss';


const { Title } = Typography;
const data = [
    {
      key: '1',
      date: '3/4/2020',
      'post-job-hot': 30,
      'post-job': 30,
      'current-post': 0,
      'current-post-hot': 0,
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      date: '3/5/2020',
      'post-job-hot': 40,
      'post-job': 30,
      'current-post': 4,
      'current-post-hot': 6,
      tags: ['nice', 'developer'],
    },
    {
      key: '3',
      date: '3/6/2020',
      'post-job-hot': 20,
      'post-job': 30,
      'current-post': 7,
      'current-post-hot': 8,
      tags: ['nice', 'developer'],
    },
  ];
  
function jobDetail(props) {
    const router = useRouter();
    const { id } = router.query;

    const { dispatch, referred, profile } = props;
    useEffect(() => {
        dispatch(getCompanyById({ id }));
    }, []);

    const pushRouter = (name) => {
        Router.push({
            pathname: `/job-list`,
            query: { name },
        });
    };
    const columns = [
        {
          title: 'Ngày',
          dataIndex: 'date',
          key: 'date',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Post jobs hot',
          dataIndex: 'post-job-hot',
          key: 'post-job',
        },
        {
            title: 'Post hot còn',
            dataIndex: 'current-post-hot',
            key: 'current-post-hot',
          },
        {
          title: 'Post jobs',
          dataIndex: 'post-job',
          key: 'post-job',
        },
        {
          title: 'Post còn',
          dataIndex: 'current-post',
          key: 'current-post',
        },
      ];
    return (
        <div className="company-profile" >
            <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Thông tin post job</div>
            <div className="content">
                <Row gutter={[16, 16]}>
                    <Col span={4} ><img style={{ padding: 'auto', margin: 'auto', display: 'block', height: 250, width: 250, objectFit: 'scale-down' }} alt="example" src='https://d3t1myknaqth5d.cloudfront.net/files/1589253980.jpeg' /></Col>
                    {/* <Col span={4} ><img style={{ padding: 'auto', margin: 'auto', display: 'block', height: 250, width: 250, objectFit: 'scale-down' }} alt="example" src={'get(referred, 'company_detail.data.company.avatar', [])'} /></Col> */}
                    <Col span={15} >
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>{get(referred, 'company_detail.data.company.name', [])}[Liên hệ ] với chúng tôi để có thể mua những gói ưu đãi hấp dẫn cho doanh nghiệp của bạn</Title>
                            <div>{get(referred, 'company_detail.data.company.address', [])}</div>
                            <div ><FacebookOutlined />&nbsp;<a href={get(referred, 'company_detail.data.company.facebook')} rel="noopener noreferrer" target="_blank">{get(referred, 'company_detail.data.company.facebook')}facebook.com</a></div>
                            <div ><MailOutlined />&nbsp;<a>{get(referred, 'company_detail.data.company.email_cc')} abc@gmail.com</a></div>
                            <div ><IeOutlined />&nbsp;<a href={get(referred, 'company_detail.data.company.career_site')} rel="noopener noreferrer" target="_blank">{get(referred, 'company_detail.data.company.career_site')}abc.com</a></div>
                            <div ><PhoneOutlined />&nbsp;<a>{get(referred, 'company_detail.data.company.phone_number')}03395764324</a></div>
                        </div>
                    </Col>
                    <Col span={5} >
                    <Button   style={{ marginBottom: 5, marginTop: 100 }} type="primary" danger block>Contact me</Button>
                    </Col>
                </Row>
            </div>

            <Row gutter={[16, 16]}>
                <Col span={24} >
                    <div style={{ background: 'white' }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>History</Title>
                            <div  > <Table columns={columns} dataSource={data} /></div>
                        </div>
                    </div>
                    {/* <div style={{ background: 'white' }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}> Post job</Title>
                        </div>
                    </div> */}
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