/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { Button, Row, Col, Typography, Select } from 'antd';
import { get } from 'lodash';
import {
    FacebookOutlined,
    IeOutlined,
    MailOutlined,
    PhoneOutlined,
    LikeOutlined,
    AreaChartOutlined
} from '@ant-design/icons';
import { getCompanyById } from '../../../containers/referred/actions';
import './styles.scss';

const { Option } = Select;
const { Title } = Typography;

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
    const handleChange = (value) => {
        console.log(value);
    }
    return (
        <div className="company-profile" >
            <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Quản lý post jobs</div>
            <div className="content">
                <Row gutter={[16, 16]}>
                    <Col span={4} ><img style={{ padding: 'auto', margin: 'auto', display: 'block', height: 250, width: 250, objectFit: 'scale-down' }} alt="example" src={get(referred, 'company_detail.data.company.avatar', [])} /></Col>
                    <Col span={15} >
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>{get(referred, 'company_detail.data.company.name', [])}</Title>
                            <div>{get(referred, 'company_detail.data.company.address', [])}</div>
                            <div ><FacebookOutlined />&nbsp;<a href={get(referred, 'company_detail.data.company.facebook')} rel="noopener noreferrer" target="_blank">{get(referred, 'company_detail.data.company.facebook')}</a></div>
                            <div ><MailOutlined />&nbsp;<a>{get(referred, 'company_detail.data.company.email_cc')}</a></div>
                            <div ><IeOutlined />&nbsp;<a href={get(referred, 'company_detail.data.company.career_site')} rel="noopener noreferrer" target="_blank">{get(referred, 'company_detail.data.company.career_site')}</a></div>
                            <div ><PhoneOutlined />&nbsp;<a>{get(referred, 'company_detail.data.company.phone_number')}</a></div>
                        </div>
                    </Col>
                    <Col span={5} />
                </Row>
            </div>

            <Row gutter={[16, 16]}>
                <Col span={24}   >
                    <div style={{ background: 'white'}}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3} style={{ textAlign: 'center' }}><LikeOutlined /> Post Job</Title>
                            <Title level={4}> Số lượng Post đã mua:  5  - còn lại:  5 </Title>
                            <Title level={4}> Số lượng Jobs:  10</Title>
                            <Title level={4}> Số lượng Job đang post:  10</Title>
                            <Title level={4}> Chọn số lượng post jobs</Title>
                            <Select defaultValue="lucy" style={{ width: 300 }} onChange={handleChange}>
                                <Option value="jack">5 JOBS</Option>
                                <Option value="jack">5 JOBS HOT</Option>
                                <Option value="lucy">10 JOBS</Option>
                                <Option value="lucy">10 JOBS HOT</Option>
                                <Option value="Yiminghe">20 JOBS</Option>
                                <Option value="Yiminghe">20 JOBS HOT</Option>
                            </Select>
                            <Button type="danger" style={{ width: 100, marginLeft: 20 }}>Cập nhật</Button>
                            <Button type="default" onClick={()=>Router.push('/superadmin/company-list')} style={{ width: 100, marginLeft: 20 }}>Hủy</Button>
                        </div>
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