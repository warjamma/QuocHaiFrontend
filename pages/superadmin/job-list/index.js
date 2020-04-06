import React, { Component, Fragment } from 'react';
import { Tabs, Table, Tag, Button, Modal, Input } from 'antd';
import {
    EditOutlined, DeleteOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;



 export default class index extends Component {
    state = { visible: false };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    callback(key) {
        console.log(key);
    }
     render() {
        const columnsPending = [
            {
                title: 'Công ty',
                dataIndex: 'company_id',
                render: (text, record, index) => (
                    <div className="custom-company">
                        <div className="logo-company" />
                        <div className="info-required">
                            <b className="name-company">Rockship</b>
                            <div className="job-role">
                                <span>Vị trí tuyển dụng : </span>
                                {
                                    record.job_role.map(item => (
                                        <Tag color="blue" key={item}>{item}</Tag>
                                    ))
                                }
                            </div>
                            <div className="job-level">
                                <span>Level yêu cầu : </span>
                                {
                                    record.job_levels.map(item => (
                                        <Tag color="blue" key={item}>{item}</Tag>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                title: 'Công việc',
                dataIndex: 'job_title',
            },
            {
                title: 'Mức thưởng',
                dataIndex: 'reward',
                align: 'center',
                render: (text, record, index) => <Tag color="green">{record.reward}$</Tag>,
            },
            {
                title: 'Mức lương',
                dataIndex: '',
                align: 'center',
                render: (text, record, index) => <Tag color="blue">{record.min_salary}$ - {record.max_salary}$</Tag>,
            },
            {
                title: 'Số lượng yêu cầu',
                dataIndex: 'amount',
                align: 'center'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a style={{ marginRight: 16 }}><Button type="primary">Approve</Button></a>
                        <a><Button type="primary" onClick={this.showModal}>Deny</Button></a>
                    </span>
                ),
            },
        ];
        
        const columnsApproved = [
            {
                title: 'Công ty',
                dataIndex: 'company_id',
                render: (text, record, index) => (
                    <div className="custom-company">
                        <div className="logo-company" />
                        <div className="info-required">
                            <b className="name-company">Rockship</b>
                            <div className="job-role">
                                <span>Vị trí tuyển dụng : </span>
                                {
                                    record.job_role.map(item => (
                                        <Tag color="blue" key={item}>{item}</Tag>
                                    ))
                                }
                            </div>
                            <div className="job-level">
                                <span>Level yêu cầu : </span>
                                {
                                    record.job_levels.map(item => (
                                        <Tag color="blue" key={item}>{item}</Tag>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                title: 'Công việc',
                dataIndex: 'job_title',
            },
            {
                title: 'Mức lương',
                dataIndex: '',
                align: 'center',
                render: (text, record, index) => <Tag color="blue">{record.min_salary}$ - {record.max_salary}$</Tag>,
            },
            {
                title: 'Số lượng yêu cầu',
                dataIndex: 'amount',
                align: 'center'
            },
            {
                title: 'Tình Trạng',
                dataIndex: 'status',
                align: 'center'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a style={{ marginRight: 16 }}><EditOutlined /></a>
                        <a><DeleteOutlined /></a>
                    </span>
                ),
            },
        ]
        
        const columnsDenied = [
            {
                title: 'Công ty',
                dataIndex: 'company_id',
                render: (text, record, index) => (
                    <div className="custom-company">
                        <div className="logo-company" />
                        <div className="info-required">
                            <b className="name-company">Rockship</b>
                            <div className="job-role">
                                <span>Vị trí tuyển dụng : </span>
                                {
                                    record.job_role.map(item => (
                                        <Tag color="blue" key={item}>{item}</Tag>
                                    ))
                                }
                            </div>
                            <div className="job-level">
                                <span>Level yêu cầu : </span>
                                {
                                    record.job_levels.map(item => (
                                        <Tag color="blue" key={item}>{item}</Tag>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                title: 'Công việc',
                dataIndex: 'job_title',
            },
            {
                title: 'Mức lương',
                dataIndex: '',
                align: 'center',
                render: (text, record, index) => <Tag color="blue">{record.min_salary}$ - {record.max_salary}$</Tag>,
            },
            {
                title: 'Số lượng yêu cầu',
                dataIndex: 'amount',
                align: 'center'
            },
            {
                title: 'Lý do',
                dataIndex: 'reason',
                align: 'center'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a style={{ marginRight: 16 }}><EditOutlined /></a>
                        <a><Button type="primary">Approve</Button></a>
                    </span>
                ),
            },
        ]
        const dataPending = [
            {
                key: '1',
                company_id: '123',
                job_role: [
                    'Designer',
                    'Frontend'
                ],
                job_levels: [
                    'Midle',
                    'Senior'
                ],
                job_title: 'Front-End Developer',
                reward: '100',
                min_salary: '500',
                max_salary: '1000',
                amount: '5'
            }
        ]
        
        const dataApproved = [
            {
                key: '1',
                company_id: '123',
                job_role: [
                    'Designer',
                    'Frontend'
                ],
                job_levels: [
                    'Midle',
                    'Senior'
                ],
                job_title: 'Front-End Developer',
                status: 'Active',
                min_salary: '500',
                max_salary: '1000',
                amount: '5'
            }
        ]
        const dataDenied = [
            {
                key: '1',
                company_id: '123',
                job_role: [
                    'Designer',
                    'Frontend'
                ],
                job_levels: [
                    'Midle',
                    'Senior'
                ],
                job_title: 'Front-End Developer',
                reason: 'trash',
                min_salary: '500',
                max_salary: '1000',
                amount: '5'
            }
        ]
         return (
             <Fragment>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Pending Approval" key="1">
                <Table bordered columns={columnsPending} dataSource={dataPending} />
            </TabPane>
            <TabPane tab="Approved" key="2">
                <Table bordered columns={columnsApproved} dataSource={dataApproved} />
            </TabPane>
            <TabPane tab="Denied" key="3">
                <Table bordered columns={columnsDenied} dataSource={dataDenied} />
            </TabPane>
        </Tabs>
        <Modal
          title="Deny Reason"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea rows={4} />
        </Modal>
        </Fragment>
         )
     }
 }
 

