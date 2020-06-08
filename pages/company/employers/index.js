/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { RedoOutlined, SearchOutlined, DownloadOutlined, PlusOutlined, DeleteTwoTone, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Tag, Button, Popconfirm, Form, Row, Col, message, Input, Select, Spin, Modal } from 'antd';
import { get, debounce } from 'lodash';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import { getListReferred, deleteCandidate } from '../../../containers/referred/actions';
import { getAllCompany, getListEmployers, createEmployer } from '../../../containers/company/action';
import renderColorTag from '../../../ultils/renderColorStatus';
import './styles.scss';

const { Option } = Select;
const initQuery = {
  // company_name: '',
  // key_word: '',
  // status: null,
  offset: 0,
  limit: 10,
};
const initForm = {
  address: "26 Trash can",
  avatar: "https://www.pandasecurity.com/mediacenter/src/uploads/2016/11/img_black_mirror.jpg",
  email: "Trash@gmail.com",
  full_name: "Trash", 
  password: "Trash",
  phone_number: "Trash",
  status: "inactive"
};

const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};

function MyReferred(props) {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(!visible);
  }
  const handleOk = e => {
    console.log(e);
    setVisible(!visible);
  }
  const handleCancel = e => {
    console.log(e);
    setVisible(!visible);
  }
  const { dispatch, referred, profile, company } = props;
  const [query, setQuery] = useState(initQuery);
  // const [listCompany, setListCompany] = useState([]);
  // const [fetching, setFetching] = useState(false);
  const router = useRouter();
  // const { name } = router.query;
  // if (name) {
  //   initQuery.company_name = name;
  // }


  function cancel(e) {
    message.error('Cance');
  }

  // const handleDelete = async (candidateId) => {
  //   await dispatch(deleteCandidate(candidateId)).then(res => {
  //     if (res.status) {
  //       Router.push('/referrer/my-referred');
  //       return message.success('Delete candidate successfully');
  //     }
  //     return message.error(res.error);
  //   });
  // };
  // const disabledBtn = () => {
  //   return true;
  // };
  const pushRouter = (id, status) => {
    Router.push({
      pathname: `/referrer/edit-cv`,
      query: { status, id },
    });
  };
  const columns = [
    {
      title: 'Tên nhân viên',
      dataIndex: 'full_name',
      // render: (text, record, index) => (
      //   <div className="custom-role" role="presentation" >
      //         <b className="name-role" color="blue">{record}</b> 
      //   </div>
      // )
    },
    {
      title: 'Quyền truy cập',
      dataIndex: 'role',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone_number',
    },
    {
      title: 'Cập nhật',
      dataIndex: 'candidate_id',
      align: 'center',
      width: 150,
      render: (text, record, index) => <div className="Action"><Button style={{ marginRight: 5 }} onClick={() => pushRouter(get(record, 'candidate_id', ''), get(record, 'status', ''))} icon={<EditOutlined />} size="small" />
        <Popconfirm
          disabled={get(record, 'status', '') === 'on_board' ? disabledBtn() : false}
          title="Are you sure delete title?"
          onConfirm={() => handleDelete(get(record, 'candidate_id', ''))}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button disabled={get(record, 'status', '') === 'on_board' ? disabledBtn() : false} icon={<DeleteOutlined />} size="small" />
        </Popconfirm></div>
    },

  ];

  // const onChangeQuery = async (key, value) => {
  //   const clone = { ...query };
  //   clone[key] = value;
  //   setQuery(clone);
  // };

  // const handleFilter = async () => {
  //   const clone = { ...query };
  //   clone.offset = 0;
  //   setQuery(clone);
  //   await dispatch(getListEmployers(clone));
  // };

  const handleTableChange = async (pagination) => {
    const clone = { ...query };
    clone.offset = (pagination.current - 1) * 10;
    clone.limit = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListEmployers(clone));
  };

  // const resetSearch = async () => {
  //   setQuery(initQuery);
  //   await dispatch(getListEmployers(initQuery));
  // };

  // const fetchCompany = async value => {
  //   setListCompany([]);
  //   setFetching(true);
  //   await dispatch(getAllCompany({ offset: 0, limit: 50, key_word: value })).then(res => {
  //     if (res.status) {
  //       setListCompany(get(res, 'data.items.company_name'));
  //       setFetching(false);
  //     }
  //   });
  // };

  useEffect(() => {
    const id = get(profile, 'data.employer.company_id', []);
    dispatch(getListEmployers(id));
    // fetchCompany('');
  }, []);

  const delayedQuery = useRef(debounce((e, func) => func(e), 800)).current;
  const onFinish = async (value) => {
    const data = value;
    // data.jd_files = fileLink;
    await dispatch(createEmployer({ ...initForm, ...data }, get(profile, 'data.employer.company_id', []))).then(res => {
      if (res.status) {
        return message.success('Create employer successfully').then(() => setVisible(!visible));
      }
      return message.error(res.error);
    });
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="my-referred-container">
      <div className="header">
        <div>{`Danh sách nhân viên (${get(company, 'list_employers.extra_data.total', 0)})`}</div>
      </div>
      <Form
        name="advanced_search"
        className="ant-advanced-search-form"
        labelCol={{ span: 4 }}
        layout="horizontal"
      >
        <Row gutter={[16, 0]}>
          {/* <Col className="fiter-item" span={14}>
            <div className="title">Tên nhân viên: </div>
            <Input value={query.key_word} onChange={(e) => onChangeQuery('key_word', e.target.value)} placeholder="Tìm theo tên ứng viên..." />
          </Col>
          <Col className="fiter-item" span={10} >
            <div className="title">Quyền truy cập: </div>
            <Select
              allowClear
              showSearch
              onChange={(e) => onChangeQuery('company_name', e)}
              style={{ width: '100%' }}
              placeholder="Công ty"
              optionFilterProp="children"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={(e) => delayedQuery(e, fetchCompany)}
              value={query.company_name}
            >
              {listCompany.map((d) => (
                <Option value={d} key={d}>{d}</Option>
              ))}
            </Select>
          </Col> */}
          <Col span={24}>
            <div className="filter-button">
              <Button icon={<PlusOutlined />} type="primary" onClick={() => showModal()}>Thêm mới</Button>
              <Modal
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                title="Thêm mới nhân viên"
                visible={visible}
              // onOk={handleOk}
              // onCancel={handleCancel}
              >
                <Form
                  {...layout}
                  name="basic"
                  // initialValues={{ candidate_benefit: '' }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24} >Thêm nhân viên mới và xem thông tin chi tiết của nhân viên nào đó sau.</Col>
                    <Col span={8} >
                      <Form.Item
                        label="Tên nhân viên"
                        hasFeedback
                        name="full_name"
                        rules={[{ required: true, message: 'This field is required !' }]}
                      >
                        <Input></Input>
                      </Form.Item>
                    </Col>
                    <Col span={8} >
                      <Form.Item
                        label="Số điện thoại"
                        hasFeedback
                        name="phone_number"
                        rules={[{ required: true, message: 'This field is required !' }]}
                      >
                        <Input></Input>
                      </Form.Item>
                    </Col>
                    <Col span={8} >
                      <Form.Item
                        label="Quyền truy cập"
                        hasFeedback
                        // name="role"
                        rules={[{ required: true, message: 'This field is required !' }]}
                      >
                        <Select style={{ width: '100%' }}>
                          <Select.Option value="staff">CEO (company owner)</Select.Option>
                          <Select.Option value="admin">HR</Select.Option>
                          <Select.Option value="admin">Accountant</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24}  >
                      <Form.Item style={{ float: 'right'}}>
                        <Button onClick={() => handleCancel()}>
                          Hủy
                      </Button>
                      </Form.Item>
                      <Form.Item style={{ float: 'right', marginRight: 10  }}>
                        <Button type="primary" htmlType="submit">
                          Thêm nhân viên
                      </Button>
                      </Form.Item>

                    </Col>
                  </Row>
                </Form>
              </Modal>
              {/* <Button onClick={() => handleFilter()}  style={{marginRight: 10}}icon={<SearchOutlined />} type="primary">Tìm kiếm</Button>
              <Button icon={<RedoOutlined />} onClick={() => resetSearch()} type="primary">Làm mới</Button> */}
            </div>
          </Col>
        </Row>
      </Form>
      {/* end form */}
      <Table
        loading={get(company, 'is_loading', false)}
        bordered
        rowKey="id"
        columns={columns}
        dataSource={get(company, 'list_employers.items.employer', [])}
        pagination={{
          pageSize: query.limit,
          total: get(company, 'list_employers.extra_data.total', 0),
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50'],
          size: 'small',
          current: (query.offset / 10) + 1
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

function mapStateToProps(state) {
  const { referred, profile, company } = state;
  console.log(state);
  return { referred, profile, company };
}

export default connect(mapStateToProps, null)(MyReferred);
