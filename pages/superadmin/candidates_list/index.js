/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { RedoOutlined, SearchOutlined, DownloadOutlined, DeleteTwoTone, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Tag, Button, Popconfirm, Form, Row, Col, message, Input, Select, Spin } from 'antd';
import { get, debounce } from 'lodash';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import { getListCandidates, deleteCandidate } from '../../../containers/referred/actions';
import { getAllCompany } from '../../../containers/company/action';
import renderColorTag from '../../../ultils/renderColorStatus';
import './styles.scss';

const { Option } = Select;
const initQuery = {
  company_name: '',
  key_word: '',
  // status: null,
  offset: 0,
  limit: 10,
};



function MyReferred(props) {
  const { dispatch, referred } = props;
  const [query, setQuery] = useState(initQuery);
  const [listCompany, setListCompany] = useState([]);
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  function cancel(e) {
    message.error('Cance');
  }

  const handleDelete = async (candidateId) => {
    await dispatch(deleteCandidate(candidateId)).then(res => {
      if (res.status) {
        return message.success('Delete candidate successfully').then(()=> Router.push('/superadmin/candidates_list'));
      }
      return message.error(res.error);
    });
  };
  const pushRouter = (id) => {
    Router.push({
      pathname: `/superadmin/edit-cv`,
      query: { id },
    });
  };
  const columns = [
    {
      title: 'Tên ứng viên',
      dataIndex: 'admin_id',
      render: (text, record, index) => (
        <div className="custom-role">
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
      title: 'Vị trí',
      dataIndex: 'id',
      render: (text, record, index)=>(
        record.job_role.map(item => (
          <Tag className="tag-level" color="blue" key={item}>{item}</Tag>
        ))
      )
    },
    {
      title: 'Cấp độ',
      dataIndex: 'id',
      render: (text, record, index)=>(
        record.job_level.map(item => (
          <Tag className="tag-level" color="blue" key={item}>{item}</Tag>
        ))
      )
    },
    // {
    //   title: 'Ngôn ngữ',
    //   dataIndex: 'id',
    //   render: (text, record, index)=>(
    //     record.language.map(item => (
    //       <Tag className="tag-level" color="blue" key={item}>{item}</Tag>
    //     ))
    //   )
    // },
    {
      title: 'Địa điểm',
      dataIndex: 'id',
      render: (text, record, index)=>(
        record.locations.map(item => (
          <Tag className="tag-level" color="blue" key={item}>{item}</Tag>
        ))
      )
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone_number'
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'bank_name'
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'bank_number'
    },
    {
      title: 'Chủ tài khoản',
      dataIndex: 'bank_user'
    },
    {
      title: 'Cập nhật',
      dataIndex: 'id',
      align: 'center',
      width: 150,
      render: (text, record, index) => <div className="Action"><Button style={{ marginRight: 5 }} onClick={() => pushRouter(get(record, 'id', ''))} icon={<EditOutlined />} size="small" />
        <Popconfirm
          title="Are you sure delete title?"
          onConfirm={() => handleDelete(get(record, 'id', ''))}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} size="small" />
        </Popconfirm></div>
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
    dispatch(getListCandidates(query));
  }, []);

  const delayedQuery = useRef(debounce((e, func) => func(e), 800)).current;

  return (
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
              <Button icon={<RedoOutlined />} style={{marginRight:10}} onClick={() => resetSearch()} type="primary">Làm mới</Button>
              <Button icon={<RedoOutlined />} onClick={() => Router.push('/job-list')} type="primary">Giới thiệu ứng viên</Button>
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
  );
};

function mapStateToProps(state) {
  // console.log(state);
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(MyReferred);
