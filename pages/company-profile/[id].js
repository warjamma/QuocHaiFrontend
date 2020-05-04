/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Row, Col, Rate, Typography } from 'antd';
import { get } from 'lodash';
import {
    FacebookOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import { getCompanyById } from '../../containers/referred/actions';
import './styles.scss';


const { Title } = Typography;

function jobDetail(props) {
    const router = useRouter();
    const { id } = router.query;

    const { dispatch, referred } = props;
    useEffect(() => {
        dispatch(getCompanyById({ id }));
    }, []);


    return (
        <div className="company-profile" >
            <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Company profile</div>
            <div className="content">
                <Row gutter={[16, 16]}>
                    <Col span={4} ><img style={{ padding: 'auto', margin: 'auto', display: 'block',height:250,width:250,objectFit: 'scale-down' }} alt="example" src={get(referred, 'company_detail.data.company.avatar', [])} /></Col>
                    <Col span={15} >
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>{get(referred, 'company_detail.data.company.name', [])}</Title>
                            <div>{get(referred, 'company_detail.data.company.address', [])}</div>
                            <div ><FacebookOutlined />&nbsp;{get(referred, 'company_detail.data.company.facebook')}</div>
                            <div ><MailOutlined />&nbsp;{get(referred, 'company_detail.data.company.email_cc')}</div>
                            <div ><LinkedinOutlined />&nbsp;{get(referred, 'company_detail.data.company.linked_in')}</div>
                            <div ><PhoneOutlined />&nbsp;{get(referred, 'company_detail.data.company.phone_number')}</div>
                        </div>
                    </Col>
                    <Col span={5} >
                        <Button style={{ marginBottom: 5, marginTop: 50 }} type="primary" danger block>Write review</Button>
                        <Button block>Follow</Button>
                    </Col>
                </Row>
            </div>

            <Row gutter={[16, 16]}>
                <Col span={16} >
                    <div style={{ background: 'white' }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>About company</Title>
                            <ul>
                                <li>{get(referred, 'company_detail.data.company.about', [])}</li>
                                <li>{get(referred, 'company_detail.data.company.company_benefit', [])}ROCKSHIP is a Software Consultancy Agency with new and innovative technology solutions in Blockchain,</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ background: 'white' }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>Why You'll Love Working Here</Title>
                            <ul>
                                <li>Develop innovative product using the latest technologies</li>
                                <li>Flat organization and no hierarchies to get in the way of getting things done</li>
                                <li>Multinational company - get to travel and meet colleagues from other countries</li>
                                <li>Be a big part of a small team - your input will make a big difference</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ background: 'white', marginTop: 0 }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>Location</Title>
                            <div style={{ fontSize: 16 }}>Centec Tower, {get(referred, 'company_detail.data.company.address', [])}</div>
                            <div />

                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ background: 'white' }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>Top Reviews</Title>
                            <div style={{ fontSize: 16 }}>The leading provider of software outsourcing services in Vietnam</div>
                            <br />
                            <div style={{ fontSize: 16 }}>" One of the most professional team I've worked with"</div>
                            <Rate allowHalf defaultValue={2.5} />
                            <div style={{ fontSize: 14 }}> Awesome office with Nortre Dame view, cozy working space, fridge full of snacks and drinks.
                            . Company offers best equipments for work (latest Mac, PC and all of the necessary licenses, etc)
. Flat team with quick decision making and innovative...</div>
                            <Button style={{ marginBottom: 5, marginTop: 50 }} type="primary" danger block>Write review</Button>
                        </div>
                    </div>
                </Col>
            </Row>

        </div>
    );
}
function mapStateToProps(state) {
    const { referred, profile } = state;
    return { referred, profile };
}
export default connect(mapStateToProps, null)(jobDetail);