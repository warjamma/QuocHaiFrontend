import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Router, { useRouter } from 'next/router';
import { Table, Tag, Button, Form, Row, Col, Input, Select, Typography, Card, Alert, Text } from 'antd';
import { getJobById } from '../../containers/referred/actions';
import { get } from 'lodash';
import './styles.scss'
import {
    DollarOutlined,
    RightOutlined,
    CalendarOutlined,
    CaretRightOutlined,
    FieldTimeOutlined,
    UsergroupAddOutlined,
    FlagOutlined,
    SettingOutlined
} from '@ant-design/icons';
const { Title } = Typography;
const { Meta } = Card;

function jobDetail(props) {
    const router = useRouter();
    const { id } = router.query;

    const { referred, dispatch, profile } = props;
    const [status, setSatus] = useState(false);
    console.log('refer', referred);
    //console.log(get('referred jobddddddddddd',referred,'job_detail.data.job.jd_files'));
    useEffect(() => {
        dispatch(getJobById({ id }))
    }, []);
    const Hidden = () => {
        if (get(profile, 'job_detail.data.employer.id') !== null) {
            //console.log('voday')
            return { visibility: "hidden" };
            console.log({ visibility: "hidden" });
        }
    }


    return (
        <div className="company-profile" style={{ padding: 30 }}>
             <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Company profile</div>
            <Row gutter={[16, 16]}>
                <Col span={24} >
                    <div style={{ background: 'white' }}>
                        <img style={{ padding: 'auto', margin: 'auto', display: 'block' }} alt="example" src="https://cdn.itviec.com/employers/fpt-software/logo/w170/mir3HT3xtedbECJY5jVeRRgV/fpt-software-logo.png" />
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>ROCKSHIP</Title>
                            <div>The leading provider of software outsourcing services in Vietnam</div>
                            <div ><SettingOutlined />&nbsp;Outsourcing</div>
                            <div ><UsergroupAddOutlined />&nbsp;1000+</div>
                            <div ><FlagOutlined />&nbsp;Vietnam</div>
                            <div ><CalendarOutlined />&nbsp;Monday - Friday</div>
                            <div ><FieldTimeOutlined />&nbsp;Extra salary for OT</div>
                            <br />
                            <a style={{ color: '#68ba50', fontSize: '13px', float: 'left' }}>See map<CaretRightOutlined /></a>
                            <br />
                            <a style={{ color: '#68ba50', fontSize: '16px', textAlign: 'center', display: 'block' }}>View our company page<CaretRightOutlined /></a>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
function mapStateToProps(state) {
    //console.log(state);
    const { referred, profile } = state
    return { referred, profile }
}
export default connect(mapStateToProps, null)(jobDetail)