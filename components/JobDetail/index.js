/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { Button, Row, Col, Typography, Card } from 'antd';
import { DollarOutlined, RightOutlined,CalendarOutlined, CaretRightOutlined, FacebookOutlined, IeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { get} from 'lodash';
import moment from 'moment';
import {getJobById} from '../../containers/job/actions';

import './styles.scss';

const { Title } = Typography;

function jobDetail(props) {
    const { referred, dispatch, profile } = props;
    const router = useRouter();
    console.log(router);
    const { id } = router.query;
    // const job_id = id;
    // const pushRouter = (id) => {
    //     Router.push({
    //         pathname: `/superadmin/edit-cv`,
    //         query: { id, job_id },
    //     });
    // };
    const pushRouterCompanyDetail = (id) => {
        Router.push({
            pathname: `/company-detail-home`,
            query: { id },
        });
    };

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
        a.href = await
            toDataURL(get(referred, 'job_detail.data.job.jd_files'));
        a.download = "JD.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return (
        <div className="job-detail" style={{ padding: 30 }}>
            <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>Chi tiết công việc</div>
            <Row gutter={[16, 16]} className="job-content">
                <Col span={8} className="company-info">
                    <div style={{ background: 'white' }}>
                        {
                            get(referred, 'job_detail.data.job.company.avatar') ?
                                (<img style={{ padding: 'auto', margin: 'auto', display: 'block', width: 170, height: 170, objectFit: 'scale-down' }} alt="example" src={get(referred, 'job_detail.data.job.company.avatar')} />) : ("")
                        }
                        <div style={{ background: 'white', padding: 20 }} >
                            <Title level={3}>{get(referred, 'job_detail.data.job.company.name')}</Title>
                            <div>{get(referred, 'job_detail.data.job.company.address')}</div>
                            <div ><FacebookOutlined />&nbsp;<a href={get(referred, 'job_detail.data.job.company.facebook')} rel="noopener noreferrer" target="_blank" >{get(referred, 'job_detail.data.job.company.facebook')}</a></div>
                            <div ><MailOutlined />&nbsp;<a>{get(referred, 'job_detail.data.job.company.email_cc')}</a></div>
                            <div ><IeOutlined />&nbsp;<a href={get(referred, 'job_detail.data.job.company.career_site')} rel="noopener noreferrer" target="_blank">{get(referred, 'job_detail.data.job.company.career_site')}</a></div>
                            <div ><PhoneOutlined />&nbsp;<a>{get(referred, 'job_detail.data.job.company.phone_number')}</a></div>
                            <br />
                            <span style={{ color: '#68ba50', fontSize: '16px', textAlign: 'center', display: 'block' }}>
                                <a role="presentation" onClick={() => pushRouterCompanyDetail(get(referred, 'job_detail.data.job.company.id', []))} >View our company page<CaretRightOutlined /></a>
                                {/* <a href='/' onClick={() => Router.push(`/company-profile/${get(referred, 'job_detail.data.job.company.id', [])}`)} >View our company page<CaretRightOutlined /></a> */}
                            </span>
                        </div>
                    </div>
                </Col>
                <Col span={16} className="job-description">
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
                        <div style={{ marginTop: -14, marginBottom: 10 }}>
                            {get(referred, 'job_detail.data.job.language', []).map((value, key) => {
                                return <Button key={key} style={{ marginRight: 5 }}>{value} </Button >;
                            })}
                        </div>
                        {get(referred, 'job_detail.data.job.locations', []).map((value, key) => {
                            return <div style={{ marginBottom: 6 }} key={key}><RightOutlined /> {value} <a style={{ color: '#68ba50', fontSize: '13px' }} /></div>;
                        })}

                        <div style={{ marginBottom: 10 }}><CalendarOutlined /> {moment(get(referred, 'job_detail.data.job.updated_at', [])).fromNow()}</div>
                        <Button style={{ float: 'left', marginRight: 5, width: '40%', display: 'block' }} type="primary" onClick={() => Router.push(`/upload-cv-home`)} block>Giới thiệu ứng viên</Button>
                        {/* <Button style={(get(profile, 'data.employer.role') === 'admin' || get(profile, 'data.employer.role') === 'employer' || get(profile, 'data.employer.role') === 'Trash' || (get(profile, 'data.recruiter.role') === 'superadmin')) ? ({ visibility: "hidden" }) : ({ float: 'left', marginRight: 5, width: '40%', display: 'block' })} type="primary" onClick={() => Router.push(`/referrer/upload-cv/${id}`)} block>Giới thiệu ứng viên</Button> */}
                        <Button onClick={download} style={{ float: 'left', width: '40%' }} disabled={!!(get(referred, 'job_detail.data.job.jd_files') === '' || get(referred, 'job_detail.data.job.jd_files') == null)} type="primary" block>Dowload JD</Button>
                    </Card>
                    <Card className="contentJob" >

                        <Title level={3}>About company</Title>
                        <div>{get(referred, 'job_detail.data.job.company.about')}</div>
                        <Title level={3}>Job detail</Title>
                        <ul>
                            <li level={4}> Ngày tạo: {moment(get(referred, 'job_detail.data.job.created_at', [])).format('l')}</li>
                            <li level={4}> Tiền tệ: {get(referred, 'job_detail.data.job.currency', [])}</li>
                            <li level={4}> Max Lương : ${get(referred, 'job_detail.data.job.max_salary', [])}</li>
                            <li level={4}> Min Lương : ${get(referred, 'job_detail.data.job.min_salary', [])}</li>
                            <li level={4}> Trạng thái: {get(referred, 'job_detail.data.job.status', [])}</li>
                            <li level={4}> Kích cỡ team: {get(referred, 'job_detail.data.job.team_size', [])}</li>
                            <li level={4}> Số lượng yêu cầu: {get(referred, 'job_detail.data.job.vacancy_number', [])}</li>
                            <li level={4}> Phúc lợi: {get(referred, 'job_detail.data.job.vacancy_number', [])}</li>
                        </ul>
                        <Title level={3}>Company benefit</Title>
                        <div>{get(referred, 'job_detail.data.job.company.employee_benefit')}</div>
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