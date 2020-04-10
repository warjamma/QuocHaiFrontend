import React, { Component,useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Router,{ useRouter } from 'next/router';
import { Table, Tag, Button,Form,Row, Col, Input,Select,Typography, Card,Alert,Text} from 'antd';
import { getJobById } from '../../containers/referred/actions';
import Link from 'next/link'
import axios from 'axios';
import { get } from 'lodash';
import {
    DollarOutlined,
    RightOutlined,
    CalendarOutlined ,
    CaretRightOutlined ,
    FieldTimeOutlined,
    UsergroupAddOutlined,
    FlagOutlined,
    SettingOutlined
  } from '@ant-design/icons';
const { Title } = Typography;
const { Meta } = Card;
 
function jobDetail(props){
    const router = useRouter();
    const { id } = router.query;

    const { referred, dispatch } = props;
    //console.log(referred);
    //console.log(get(referred,'job_detail.data.job.job_role'));
    useEffect(() => {
        dispatch(getJobById({id}));
      }, []);
    return (
        <div style={{padding: 30}}>
            <Title level={2}>Job detail</Title>
            <Row gutter={[16, 16]}>
            <Col span={8} >
                <div style={{background:'white'}}>
                    <img style={{padding: 'auto', margin: 'auto', display: 'block'}} alt="example" src="https://cdn.itviec.com/employers/fpt-software/logo/w170/mir3HT3xtedbECJY5jVeRRgV/fpt-software-logo.png" />
                    <div style={{background:'white',padding:20}} >
                        <Title level={3}>ROCKSHIP</Title>
                        <div>The leading provider of software outsourcing services in Vietnam</div>
                        <div ><SettingOutlined />&nbsp;Outsourcing</div>
                        <div ><UsergroupAddOutlined />&nbsp;1000+</div>
                        <div ><FlagOutlined/>&nbsp;Vietnam</div>
                        <div ><CalendarOutlined />&nbsp;Monday - Friday</div>
                        <div ><FieldTimeOutlined />&nbsp;Extra salary for OT</div>
                        <br/>
                        <a style={{color:'#68ba50' , fontSize:'13px',float:'left'}}>See map<CaretRightOutlined /></a>
                        <br/>
                        <a style={{color:'#68ba50' , fontSize:'16px', textAlign: 'center', display: 'block'}}>View our company page<CaretRightOutlined /></a>
                    </div>                   
                </div>
            </Col>
            <Col span={16} >
                <Card className="titileJob">
                    <Title level={3}>{get(referred,'job_detail.data.job.job_title')}</Title>
                    <Button style={{marginRight: 5}}>{get(referred,'job_detail.data.job.job_role')}</Button>
                    <Button>Spring</Button>
                    <div style={{color:'#68ba50'}}><DollarOutlined /> You'll love it</div>
                    <div ><RightOutlined /> FPT Software Đường D1 Phường Tân Phú , District 9, Ho Chi Minh</div>
                    <a style={{color:'#68ba50' , fontSize:'13px',paddingLeft:10}}>See map<CaretRightOutlined /></a>
                    <div ><RightOutlined /> Indonesia <a style={{color:'#68ba50' , fontSize:'13px'}}>See map<CaretRightOutlined /></a></div>
                    <div ><CalendarOutlined /> 4 days ago</div>
                    <Row gutter={[16, 16]}>
                            <Col span={8} >
                                <Button type="primary"   onClick={() => Router.push('/referrer/upload-cv/'+id+'')}  block>Giới thiệu ứng viên</Button>
                            </Col>
                            <Col span={8} >
                                <Button type="primary" block>Dowload JD</Button>
                            </Col>
                    </Row>
                </Card>
                <Card className="contentJob" >
                    <Title level={3}>Top 3 Reasons To Join Us</Title>
                    <ul>
                        <li style={{fontWeight:'bold'}} level={4}>Global Exposure </li>
                        <li style={{fontWeight:'bold'}} level={4}>Global Exposure</li>
                        <li style={{fontWeight:'bold'}} level={4}>Global Exposure</li>
                    </ul>
                    <Title level={3}>The Job</Title>
                    <ul>
                        <li style={{marginLeft: 10}} level={4}>Study customer’s requirement and framework, create design documents, implementation and coding of solutions.</li>
                        <li style={{marginLeft: 10}} level={4}>Generate unit tests to ensure the products are being tested thoroughly to produce quality products</li>
                        <li style={{marginLeft: 10}} level={4}>Supporting quality assurance in testing software products.
                        Interacting with customers and partners about product explanation, implementation and support</li>
                    </ul>

                    <Title level={3}>Your Skills and Experience</Title>
                    <ul>
                        <li style={{marginLeft: 10}} level={4}>Study customer’s requirement and framework, create design documents, implementation and coding of solutions.</li>
                        <li style={{marginLeft: 10}} level={4}>Generate unit tests to ensure the products are being tested thoroughly to produce quality products</li>
                        <li style={{marginLeft: 10}} level={4}>Supporting quality assurance in testing software products.
                        Interacting with customers and partners about product explanation, implementation and support</li>
                    </ul>

                    <Title level={3}>Why You'll Love Working Here</Title>
                    <ul>
                        <li style={{marginLeft: 10}} level={4}>Salary negotiation.</li>
                        <li style={{marginLeft: 10}} level={4}>All benefits based on Labor Law & FPT Software’s policy.</li>
                        <li style={{marginLeft: 10}} level={4}>English-friendly, international working environment</li>
                        <li style={{marginLeft: 10}} level={4}>Onsite opportunities</li>
                    </ul>
                    <Row gutter={[16, 16]}>
                        <Col span={8} >
                            <Button type="primary"  onClick={() => Router.push('/referrer/upload-cv'+id+'')}   block>Giới thiệu ứng viên</Button>
                        </Col>
                        <Col span={8} >
                            <Button type="primary" block>Dowload JD</Button>
                        </Col>
                    </Row>
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
                                        <div style={{color:'#68ba50'}}><DollarOutlined /> You'll love it</div>
                                    </Col>
                                    <Col span={6} >
                                        <div style={{float:'right',background:'#ff9e34',color:'white',fontSize:'8',padding:3}}>Ant Design</div><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18} >
                                        <div>Role: As a COBOL Software Engineer, you will collaborate proactively with functional analysts to transla
                                            te business and integration requirements into...</div>
                                    </Col>
                                    <Col span={6} >
                                        <div style={{float:'right'}}>Hồ Chí Minh</div><br/>
                                        <div style={{float:'right'}}>Tân Bình</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18} >
                                        <Button style={{marginRight: 5}}>J2EE</Button>
                                        <Button style={{marginRight: 5}}>Java</Button>
                                        <Button>Spring</Button>
                                    </Col>
                                    <Col span={6} >
                                        <div style={{float:'right'}}>7 minutes ago</div><br/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                </Card>

            </Card>          
        </div>
    );
}
function mapStateToProps(state) {
    //console.log(state);
    const { referred } = state
    return { referred }
  }
export default connect(mapStateToProps, null)(jobDetail)