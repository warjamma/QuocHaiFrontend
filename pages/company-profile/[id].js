/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Row, Col, Rate, Typography } from 'antd';
import { get } from 'lodash';
import {
    CalendarOutlined,
    FieldTimeOutlined,
    UsergroupAddOutlined,
    FlagOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { getCompanyById } from '../../containers/referred/actions';
import './styles.scss';


const { Title } = Typography;

function jobDetail(props) {
    const router = useRouter();
    const { id } = router.query;

    const { dispatch,referred } = props;
    useEffect(() => {
        dispatch(getCompanyById({ id }));
    }, []);


    return (
        <div className="company-profile" style={{ padding: 30 }}>
            <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Company profile</div>
            <div className="content">
                <Row gutter={[16, 16]}>
                    <Col span={4} ><img style={{ padding: 'auto', margin: 'auto', display: 'block' }} alt="example" src="https://cdn.itviec.com/employers/fpt-software/logo/w170/mir3HT3xtedbECJY5jVeRRgV/fpt-software-logo.png" /></Col>
                    <Col span={15} >
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>{get(referred, 'company_detail.data.company.name',[])}</Title>
                            <div>The leading provider of software outsourcing services in Vietnam</div>
                            <div ><SettingOutlined />&nbsp;Outsourcing</div>
                            <div ><UsergroupAddOutlined />&nbsp;1000+</div>
                            <div ><FlagOutlined />&nbsp;Vietnam</div>
                            <div ><CalendarOutlined />&nbsp;Monday - Friday</div>
                            <div ><FieldTimeOutlined />&nbsp;Extra salary for OT</div>
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
                            <Title level={3}>Why You'll Love Working Here</Title>
                            <ul>
                                <li>Develop innovative product using the latest technologies</li>
                                <li>Flat organization and no hierarchies to get in the way of getting things done</li>
                                <li>Multinational company - get to travel and meet colleagues from other countries</li>
                                <li>Be a big part of a small team - your input will make a big difference</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ background: 'white', marginTop: 20 }}>
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>Location</Title>
                            <div style={{ fontSize: 16 }}>Centec Tower, 72 Nguyen Thi Minh Khai Street, HCMC District 3 Ho Chi Minh</div>
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