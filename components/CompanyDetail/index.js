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
    PhoneOutlined
} from '@ant-design/icons';
import { getCompanyById2 } from '../../containers/referred/actions';
import './styles.scss';


const { Title } = Typography;

function jobDetail(props) {
    const router = useRouter();
    const { id } = router.query;

    const { dispatch, referred, profile } = props;
    useEffect(() => {
        dispatch(getCompanyById2({ id }));
    }, []);

    // const pushRouter = (name) => {
    //     Router.push({
    //         pathname: `/`,
    //         query: { name },
    //     });
    // };
    return (
        <div className="company-profile" >
            <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Company profile</div>
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
                    <Col span={5} >
                    <Button onClick={() => Router.push(`/`)} style={{ marginBottom: 5, marginTop: 100 }} type="primary" danger block>View jobs</Button>
                    </Col>
                </Row>
            </div>

            <Row gutter={[16, 16]}>
                <Col span={24} >
                    <div style={{ background: 'white' }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>About company</Title>
                            <div style={{whiteSpace: "pre-wrap"}} > {get(referred, 'company_detail.data.company.about', [])}</div>
                        </div>
                    </div>
                    <div style={{ background: 'white' }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>Employee benefit</Title>
                            <div style={{whiteSpace: "pre-wrap"}} > {get(referred, 'company_detail.data.company.employee_benefit', [])}</div>
                        </div>
                    </div>
                    <div style={{ background: 'white', marginTop: 0 }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>Location</Title>
                            <div  > {get(referred, 'company_detail.data.company.address', [])}</div>
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