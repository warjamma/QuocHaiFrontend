/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { Button, Modal, Row, Col, Typography, Card, Table, Input, Form, Select } from 'antd';
import { DollarOutlined, RightOutlined, RedoOutlined, SearchOutlined, CalendarOutlined, CaretRightOutlined, FacebookOutlined, IeOutlined, MailOutlined, PhoneOutlined, BoldOutlined } from '@ant-design/icons';
import { get, debounce } from 'lodash';
import moment from 'moment';
import { getListCandidates, getJobById } from '../../containers/referred/actions';

import './styles.scss';

const initQuery = {
    company_name: '',
    key_word: '',
    // status: null,
    offset: 0,
    limit: 10,
};
const { Title } = Typography;

function jobDetail(props) {
    const { referred, dispatch, profile } = props;
    const router = useRouter();
    console.log(router);
    const { id } = router.query;
    const job_id = id;
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const pushRouter = (id) => {
        Router.push({
            pathname: `/superadmin/edit-cv`,
            query: { id, job_id },
        });
    };
    const pushUploadCandidate = () => {
        Router.push({
            pathname: `/superadmin/upload-candidate`,
            query: { job_id },
        });
    };
    const [query, setQuery] = useState(initQuery);
    const columns = [
        {
            title: 'Tên ứng viên',
            dataIndex: 'admin_id',
            render: (text, record, index) => (
                <div className="custom-role" onClick={() => pushRouter(record.id)}>
                    <div className="job-role" style={{ fontWeight: 'Bold', color: 'blue', cursor: 'pointer' }}>
                        {record.name}
                    </div>
                </div>
            ),
        },
        {
            title: 'Tên hồ sơ hiển thị',
            dataIndex: 'profile_title'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone_number'
        },

    ];
    const onChangeQuery = async (key, value) => {
        const clone = { ...query };
        clone[key] = value;
        setQuery(clone);
    };

    const handleFilter = async () => {
        const clone = { ...query };
        clone.offset = 0;
        setQuery(clone);
        await dispatch(getListCandidates(clone));
    };
    const handleTableChange = async (pagination) => {
        const clone = { ...query };
        clone.offset = (pagination.current - 1) * 10;
        clone.limit = pagination.pageSize;
        setQuery(clone);
        await dispatch(getListCandidates(clone));
    };

    const resetSearch = async () => {
        setQuery(initQuery);
        await dispatch(getListCandidates(initQuery));
    };

    useEffect(() => {
        dispatch(getJobById({ id }));
        dispatch(getListCandidates(query));
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
                                <a href='/' onClick={() => Router.push(`/company-profile/${get(referred, 'job_detail.data.job.company.id', [])}`)} >View our company page<CaretRightOutlined /></a>
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
                        <Button style={(get(profile, 'data.employer.role') === 'admin' || get(profile, 'data.employer.role') === 'employer' || get(profile, 'data.employer.role') === 'Trash' || (get(profile, 'data.recruiter.role') === 'superadmin')) ? ({ visibility: "hidden" }) : ({ float: 'left', marginRight: 5, width: '40%', display: 'block' })} type="primary" onClick={() => Router.push(`/referrer/upload-cv/${id}`)} block>Giới thiệu ứng viên</Button>
                        <Button style={(get(profile, 'data.recruiter.role') !== 'superadmin') ? ({ visibility: "hidden", height: 0, width: 0 }) : ({ float: 'left', marginRight: 5, width: '40%', display: 'block' })} type="primary" onClick={() => pushUploadCandidate()} block>Giới thiệu ứng viên</Button>
                        <Button onClick={download} style={{ float: 'left', width: '40%' }} disabled={!!(get(referred, 'job_detail.data.job.jd_files') === '' || get(referred, 'job_detail.data.job.jd_files') == null)} type="primary" block>Dowload JD</Button>
                        <div className="model-button" style={((get(profile, 'data.recruiter.role') !== 'superadmin')) ? ({ visibility: "hidden" }) : ({ float: 'left', marginRight: 5, width: '40%', display: 'block', marginTop: 10 })}>
                            <Button onClick={showModal} type="primary" block>Giới thiệu ứng viên từ danh sách có sẵn</Button>
                            <Modal
                                style={{ left: 20 }}
                                title="Basic Modal"
                                visible={visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <div className="my-referred-container">
                                    <div className="header">
                                        <div>{`Hồ sơ của bạn (${get(referred, 'list_candidates.extra_data.total', 0)})`}</div>
                                    </div>
                                    <Form
                                        name="advanced_search"
                                        className="ant-advanced-search-form"
                                        labelCol={{ span: 4 }}
                                        layout="horizontal"
                                    >
                                        <Row gutter={[16, 0]}>
                                            <Col className="fiter-item" span={24}>
                                                <div className="title">Tên ứng viên: </div>
                                                <Input value={query.key_word} onChange={(e) => onChangeQuery('key_word', e.target.value)} placeholder="Tìm theo tên ứng viên..." />
                                            </Col>
                                            <Col span={24}>
                                                <div className="filter-button">
                                                    <Button onClick={() => handleFilter()} icon={<SearchOutlined />} type="primary">Tìm kiếm</Button>
                                                    <Button icon={<RedoOutlined />} onClick={() => resetSearch()} type="primary">Làm mới</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                    {/* end form */}
                                    <Table
                                        loading={get(referred, 'is_loading', false)}
                                        bordered
                                        rowKey="id"
                                        columns={columns}
                                        // dataSource={datafake}
                                        dataSource={get(referred, 'list_candidates.items.candidate', [])}
                                        pagination={{
                                            pageSize: query.limit,
                                            total: get(referred, 'list_candidates.extra_data.total', 0),
                                            showSizeChanger: true,
                                            pageSizeOptions: ['10', '20', '30', '50'],
                                            size: 'small',
                                            current: (query.offset / 10) + 1
                                        }}
                                        onChange={handleTableChange}
                                    />
                                </div>
                            </Modal>
                        </div>
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
    console.log(state);
    const { referred, profile } = state;
    return { referred, profile };
}
export default connect(mapStateToProps, null)(jobDetail);