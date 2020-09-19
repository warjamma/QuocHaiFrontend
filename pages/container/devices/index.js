/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {
  RedoOutlined,
  SearchOutlined,
  DownloadOutlined,
  DeleteTwoTone,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  Table,
  Tag,
  Button,
  Popconfirm,
  Form,
  Row,
  Col,
  message,
  Input,
  Select,
  Spin,
  Popover,
} from 'antd';
import { get, debounce } from 'lodash';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import {
  getListDevice,
  deleteCandidate,
} from '../../../containers/referred/actions';
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
  const { name2 } = router.query;
  if (name2) {
    initQuery.company_name = name2;
  }

  function cancel(e) {
    message.error('Cance');
  }

  const handleDelete = async (candidateId) => {
    await dispatch(deleteCandidate(candidateId)).then((res) => {
      if (res.status) {
        Router.push('/referrer/my-referred');
        return message.success('Delete candidate successfully');
      }
      return message.error(res.error);
    });
  };
  const disabledBtn = () => {
    return true;
  };
  const pushRouter = (id, status) => {
    Router.push({
      pathname: `/referrer/edit-cv`,
      query: { status, id },
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'deviceID',
      render: (text, record, index) => (
        <div role="presentation" className="custom-company">
          {/* <div className="logo-company">
            <img
              style={{ borderRadius: "50%"}}
              src="https://www.rockship.co/images/rs-logo-img.png"
              alt="avatar"
            />
          </div> */}
          <div className="info-required">
            <b
              role="presentation"
              className="name-company"
              onClick={() => Router.push(`/device-detail`)}
            >
              {get(record, 'deviceID')}
            </b>
          </div>
        </div>
      ),
    },
    {
      title: 'Name device',
      dataIndex: 'deviceName',
      render: (text, record, index) => (
        <div>
          <div>{get(record, 'deviceName')}</div>
        </div>
      ),
    },
    {
      title: 'Node Id',
      dataIndex: 'nodes',
      render: (text, record, index) => (
        <div>
          <div>{get(record, 'nodes')}</div>
        </div>
      ),
    },
    // {
    //   // : get(record, 'status', '').replace('_', ' ')}
    //   title: 'Cập nhật',
    //   dataIndex: 'candidate_id',
    //   align: 'center',
    //   width: 150,
    //   render: (text, record, index) => (
    //     <div className="Action">
    //       <Button
    //         style={{ marginRight: 5 }}
    //         onClick={() =>
    //           pushRouter(
    //             get(record, 'candidate_id', ''),
    //             get(record, 'status', '')
    //           )
    //         }
    //         icon={<EditOutlined />}
    //         size="small"
    //       />
    //       <Popconfirm
    //         disabled={
    //           get(record, 'status', '') === 'on_board' ? disabledBtn() : false
    //         }
    //         title="Are you sure delete title?"
    //         onConfirm={() => handleDelete(get(record, 'candidate_id', ''))}
    //         onCancel={cancel}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button
    //           disabled={
    //             get(record, 'status', '') === 'on_board' ? disabledBtn() : false
    //           }
    //           icon={<DeleteOutlined />}
    //           size="small"
    //         />
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
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
    await dispatch(getListDevice(clone));
  };

  const handleTableChange = async (pagination) => {
    const clone = { ...query };
    clone.offset = (pagination.current - 1) * 10;
    clone.limit = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListDevice(clone));
  };

  const resetSearch = async () => {
    setQuery(initQuery);
    await dispatch(getListDevice(initQuery));
  };

  const fetchCompany = async (value) => {
    setListCompany([]);
    setFetching(true);
    await dispatch(
      getAllCompany({ offset: 0, limit: 50, key_word: value })
    ).then((res) => {
      if (res.status) {
        setListCompany(get(res, 'data.items.company_name'));
        setFetching(false);
      }
    });
  };

  useEffect(() => {
    dispatch(getListDevice(query));
    fetchCompany('');
  }, []);

  const delayedQuery = useRef(debounce((e, func) => func(e), 800)).current;

  return (
    <div className="my-referred-container">
      <div className="header">
        <div>Device of table</div>
      </div>
      <Form
        name="advanced_search"
        className="ant-advanced-search-form"
        labelCol={{ span: 4 }}
        layout="horizontal"
      >
        <Row gutter={[16, 0]}>
          <Col className="fiter-item" span={14}>
            <div className="title">Tên ứng viên: </div>
            <Input
              value={query.key_word}
              onChange={(e) => onChangeQuery('key_word', e.target.value)}
              placeholder="Tìm theo tên ứng viên..."
            />
          </Col>
          <Col className="fiter-item" span={6}>
            <div className="title">Công ty: </div>
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
                <Option value={d} key={d}>
                  {d}
                </Option>
              ))}
            </Select>
          </Col>
          <Col className="fiter-item" span={4}>
            <div className="title">Trạng thái: </div>
            <Select
              style={{ width: '100%' }}
              placeholder="Trạng thái"
              onChange={(e) => onChangeQuery('status', e)}
              value={query.status}
            >
              <Option value="">All</Option>
              <Option value="pending">Pending</Option>
              <Option value="confirmed">Confirmed</Option>
            </Select>
          </Col>
          <Col span={24}>
            <div className="filter-button">
              <Button
                onClick={() => handleFilter()}
                icon={<SearchOutlined />}
                type="primary"
              >
                Tìm kiếm
              </Button>
              <Button
                icon={<RedoOutlined />}
                onClick={() => resetSearch()}
                type="primary"
              >
                Làm mới
              </Button>
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
        dataSource={get(referred, 'list_device.data', [])}
        // pagination={{
        //   pageSize: query.limit,
        //   total: get(referred, 'list_referred.extra_data.total', 0),
        //   showSizeChanger: true,
        //   pageSizeOptions: ['10', '20', '30', '50'],
        //   size: 'small',
        //   current: query.offset / 10 + 1,
        // }}
        onChange={handleTableChange}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(MyReferred);
