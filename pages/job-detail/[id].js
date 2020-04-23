/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { Button, Row, Col, Typography, Card } from 'antd';
import {
  DollarOutlined,
  RightOutlined,
  CalendarOutlined,
  CaretRightOutlined,
  UsergroupAddOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { get } from 'lodash';
import moment from 'moment';
import './styles.scss';

import { getJobById } from '../../containers/referred/actions';

const { Title } = Typography;

function jobDetail(props) {
    const router = useRouter();
    const { id } = router.query;

    const { referred, dispatch, profile } = props;
    useEffect(() => {
        dispatch(getJobById({ id }));
    }, []);
    
    const toDataURL = (url) => {
        return fetch(url).then((response) => {
            return response.blob();
        }).then(blob => {
            return URL.createObjectURL(blob);
        });
    };

    const download = async () => {
        const a = document.createElement("a");
        a.href = await toDataURL(get(referred, 'job_detail.data.job.jd_files'));
        a.download = "JD.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return (
        <div className="job-detail" style={{ padding: 30 }}>
            {/* <Title level={2}>Job detail</Title> */}
            <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Job detail</div>
            <Row gutter={[16, 16]}>
                <Col span={8} >
                    <div style={{ background: 'white' }}>
                        {
                          get(referred, 'job_detail.data.job.company.avatar') ?
                            (<img style={{ padding: 'auto', margin: 'auto', display: 'block', width: 170, height: 170, objectFit: 'cover' }} alt="example" src={get(referred, 'job_detail.data.job.company.avatar')} />) : ("")
                        }
                        {/* <img style={{ padding: 'auto', margin: 'auto', display: 'block' }} alt="example" src="https://cdn.itviec.com/employers/fpt-software/logo/w170/mir3HT3xtedbECJY5jVeRRgV/fpt-software-logo.png" /> */}
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>{get(referred, 'job_detail.data.job.company.name')}</Title>
                            <div>{get(referred, 'job_detail.data.job.company.about')}</div>
                            {/* <div ><SettingOutlined />&nbsp;Outsourcing</div> */}
                            <div ><UsergroupAddOutlined />&nbsp;{get(referred, 'job_detail.data.job.company.company_size')}+</div>
                            {/* <div ><FlagOutlined />&nbsp;Vietnam</div>
                            <div ><CalendarOutlined />&nbsp;Monday - Friday</div>
                            <div ><FieldTimeOutlined />&nbsp;Extra salary for OT</div> */}
                            <div ><FacebookOutlined />&nbsp;{get(referred, 'job_detail.data.job.company.facebook')}</div>
                            <div ><MailOutlined />&nbsp;{get(referred, 'job_detail.data.job.company.email_cc')}</div>
                            <div ><LinkedinOutlined />&nbsp;{get(referred, 'job_detail.data.job.company.linked_in')}</div>
                            <div ><PhoneOutlined />&nbsp;{get(referred, 'job_detail.data.job.company.phone_number')}</div>
                            <br />
                            <span style={{ color: '#68ba50', fontSize: '13px', float: 'left' }}>See map<CaretRightOutlined /></span>
                            <br />
                            <span style={{ color: '#68ba50', fontSize: '16px', textAlign: 'center', display: 'block' }}>View our company page<CaretRightOutlined /></span>
                        </div>
                    </div>
                </Col>
                <Col span={16} >
                    <Card className="titileJob">
                        <Title level={3}><div style={{ float: 'left' }} >[Tuyển]</div>{get(referred, 'job_detail.data.job.job_role', []).map((value, key) => {
                            return <div key={key} style={{ float: 'left' }} level={4}>  &nbsp;{value}&nbsp;</div>;
                        })}</Title>
                        <br />

                        <div style={{ marginTop: 5 }}>
                            {get(referred, 'job_detail.data.job.job_levels', []).map((value, key) => {
                                return <Button key={key} style={{ marginRight: 5 }}>{value}</Button>;
                            })}
                        </div>
                        <br />
                        {/* <div style={{ marginTop: -14, marginBottom: 10 }}>
                            {get(referred, 'job_detail.data.job.language', []).map((value, key) => {
                                return <Button key={key} style={{ marginRight: 5 }}>{value}</Button>
                            })}
                        </div> */}
                        {get(referred, 'job_detail.data.job.locations', []).map((value, key) => {
                            return <div style={{ marginBottom: 6 }} key={key}><RightOutlined /> {value} <a style={{ color: '#68ba50', fontSize: '13px' }} /></div>;
                        })}
                        <div style={{ marginBottom: 10 }}><CalendarOutlined /> 4 days ago</div>
                        <Button style={get(profile, 'data.employer.id') ? ({ visibility: "hidden" }) : ({ float: 'left', marginRight: 5, width: '40%', display: 'block' })} type="primary" onClick={() => Router.push(`/referrer/upload-cv/${id}`)} block>Giới thiệu ứng viên</Button>
                        <Button onClick={download} style={{ float: 'left', width: '40%' }} type="primary" block>Dowload JD</Button>
                    </Card>
                    <Card className="contentJob" >
                        <Title level={3}>Job role To Join Us</Title>
                        <ul>
                            {get(referred, 'job_detail.data.job.job_role', []).map((value, key) => {
                                return <li key={key} style={{ fontWeight: 'bold' }} level={4}>{value}</li>;
                            })}
                        </ul>
                        <Title level={3}>Job detail</Title>
                        <ul>
                            <li style={{ fontWeight: 'bold' }} level={4}> Ngày tạo: {moment(get(referred, 'job_detail.data.job.created_at', [])).format('l')}</li>
                            <li style={{ fontWeight: 'bold' }} level={4}> Tiền tệ: {get(referred, 'job_detail.data.job.currency', [])}</li>
                            <li style={{ fontWeight: 'bold' }} level={4}> Max Lương : ${get(referred, 'job_detail.data.job.max_salary', [])}</li>
                            <li style={{ fontWeight: 'bold' }} level={4}> Min Lương : ${get(referred, 'job_detail.data.job.min_salary', [])}</li>
                            <li style={{ fontWeight: 'bold' }} level={4}> Trạng thái: {get(referred, 'job_detail.data.job.status', [])}</li>
                            <li style={{ fontWeight: 'bold' }} level={4}> Kích cỡ team: {get(referred, 'job_detail.data.job.team_size', [])}</li>
                            <li style={{ fontWeight: 'bold' }} level={4}> Số lượng yêu cầu: {get(referred, 'job_detail.data.job.vacancy_number', [])}</li>
                            <li style={{ fontWeight: 'bold' }} level={4}> Phúc lợi: {get(referred, 'job_detail.data.job.vacancy_number', [])}</li>
                        </ul>
                        <Title level={3}>Job Levels</Title>
                        <ul>
                            {get(referred, 'job_detail.data.job.job_levels', []).map((value, key) => {
                                return <li key={key} style={{ fontWeight: 'bold', marginLeft: 10 }} level={4}>{value}</li>;
                            })}

                        </ul>

                        <Title level={3}>Your Skills and Experience</Title>
                        <ul>
                            {get(referred, 'job_detail.data.job.job.skill_requirement', []).map((value, key) => {
                                return <li key={key} style={{ marginLeft: 10 }} level={4}> {value.years}</li>;
                            })}
                        </ul>
                        <Button style={((get(profile, 'data.recruiter.role') === 'superadmin') || get(profile, 'data.employer.role') === 'admin') ? ({ visibility: "hidden" }) : ({ float: 'left', marginRight: 5, width: '40%', display: 'block' })} type="primary" onClick={() => Router.push(`/referrer/upload-cv/${id}`)} block>Giới thiệu ứng viên</Button>
                        <Button style={{ float: 'left', width: '40%' }} disabled={!!(get(referred, 'job_detail.data.job.jd_files') === '' || get(referred, 'job_detail.data.job.jd_files') == null)} type="primary" block><a href={get(referred, 'job_detail.data.job.jd_files')} download>Dowload JD</a></Button>
                    </Card>
                </Col>
            </Row>

            <Card className="involveJob" >
                <Title level={3}>More Jobs for You</Title>
                <Card className="moreJobs">
                    <Row gutter={[16, 16]} className="oneRow">
                        <Col span={6} >
                            <img alt="example" src="https://cdn.itviec.com/employers/dxc-vietnam/logo/s65/U7GERVChzwPaBYXec1bQgPmP/DXC%20logo-icon.png" />
                        </Col>
                        <Col span={18} >
                            <Row>
                                <Col span={18} >
                                    <Title level={3}>Why You'll Love Working Here</Title>
                                    <div style={{ color: '#68ba50' }}><DollarOutlined /> You'll love it</div>
                                </Col>
                                <Col span={6} >
                                    <div style={{ float: 'right', background: '#ff9e34', color: 'white', fontSize: '8', padding: 3 }}>Ant Design</div><br />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={18} >
                                    <div>Role: As a COBOL Software Engineer, you will collaborate proactively with functional analysts to transla
                                            te business and integration requirements into...</div>
                                </Col>
                                <Col span={6} >
                                    <div style={{ float: 'right' }}>Hồ Chí Minh</div><br />
                                    <div style={{ float: 'right' }}>Tân Bình</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={18} >
                                    <Button style={{ marginRight: 5 }}>J2EE</Button>
                                    <Button style={{ marginRight: 5 }}>Java</Button>
                                    <Button>Spring</Button>
                                </Col>
                                <Col span={6} >
                                    <div style={{ float: 'right' }}>7 minutes ago</div><br />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

            </Card>
        </div >
    );
}
function mapStateToProps(state) {
    const { referred, profile } = state;
    return { referred, profile };
}
export default connect(mapStateToProps, null)(jobDetail);