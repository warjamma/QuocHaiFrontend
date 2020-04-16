import React, { Component, useState, useEffect } from 'react';
import { Table, Row, Col, Button, Input, Select, Tag, Popconfirm, InputNumber, Form, message } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { RedoOutlined, SearchOutlined, DownloadOutlined, UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { getListCandidate, updateStatusRef } from '../../../containers/company/action';
import { get } from 'lodash';
import moment from 'moment';

import './styles.scss';

const ButtonAction = styled(Button)`
  padding: 0px 10px;
  &:hover {
    background: #1890FF;
    border-color: #1890FF;
    color: #fff;
  }
`

const { Search } = Input

const { Option } = Select

const initQuery = {
  key_word: '',
  status: '',
  offset: 0,
  limit: 10,
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Select
    allowClear
    showSearch
    style={{ width: '100%' }}
  >
    <Option value="accepted">Accept</Option>
    <Option value="reject">Reject</Option>
    <Option value="on_board">On board</Option>
    <Option value="probation">Probation</Option>
    <Option value="done">Done</Option>
  </Select>;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function CandidateList (props) {
  const [form] = Form.useForm();
  const { profile, company, dispatch } = props;
  const [query, setQuery] = useState(initQuery);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => {
    return record.id === editingKey;
  }

  const edit = record => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async data => {
    try {
      const row = await form.validateFields();
      dispatch(updateStatusRef(data.id, row.status)).then(res => {
        if(res.status) {
          message.success('Update status successfully')
        } else {
          message.warning(res.error)
        }
        dispatch(getListCandidate(query, get(profile, 'data.employer.company_id', '')));
      });
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const renderColorTag = (status) => {
    switch(status) {
      case 'accepted':
        return 'blue';
        break;
      case 'reject':
        return 'red';
        break;
      case 'on_board':
        return 'green';
        break;
      case 'probation':
        return 'green';
        break;
      default:
        return 'orange';
        break;
    }
  }

  const columns = [
    {
      title: 'Công việc',
      dataIndex: 'job',
      render: (text, record, index) => (
        <div>
          <Link href={`/job-detail/${record.job.id}`}><a>{get(record, 'job', {}).job_title}</a></Link>
        </div>
      )
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      render: (text, record, index) => (
        <div>
          <div>{get(record, 'candidate', {}).name}</div>
          <div>
            {
              get(record, 'candidate', {}).job_role.map(item => (
                <Tag key={item} color="blue">{item}</Tag>
              ))
            }
          </div>
        </div>
      )
    },
    {
      title: 'Level',
      dataIndex: 'created',
      align: 'center',
      render: (text, record, index) => (
        get(record, 'candidate', {}).job_level.map(item => (
          <Tag key={item} color="blue">{item}</Tag>
        ))
      )
    },
    {
      title: 'Mức lương ($)',
      dataIndex: 'salary',
      align: 'center',
      render: (text, record, index) => <Tag color="blue">{get(record, 'candidate', {}).min_salary}$ - {get(record, 'candidate', {}).max_salary}$</Tag>,
    },
    {
      title: 'Onboarding date',
      dataIndex: 'status',
      align: 'center',
      render: (text, record, index) => <div>{moment(get(record, 'created_at', '')).format('DD-MM-YYYY')}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      editable: true,
      width: 150,
      render: (text, record, index) => <Tag color={renderColorTag(record.status)}>{record.status.replace('_', ' ')}</Tag>,
    },
    {
      title: 'Hồ sơ',
      dataIndex: 'cv',
      align: 'center',
      width: 80,
      render: (text, record, index) => <Button onClick={() => window.open(get(record, 'candidate', {}).cv, "_blank")} type="primary" icon={<DownloadOutlined />} size="small" />,
    },
    {
      title: 'Cập nhật',
      dataIndex: 'operation',
      align: 'center',
      render: (text, record, index) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a onClick={() => save(record)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleTableChange = async (pagination) => {
    let clone = { ...query };
    clone['offset'] = (pagination.current - 1) * 10;
    clone['limit'] = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListCandidate(clone, get(profile, 'data.employer.company_id', '')));
  };

  const onChangeQuery = async (key, value) => {
    let clone = { ...query }
    clone[key] = value
    setQuery(clone)
  }

  const handleFilter = async () => {
    let clone = { ...query };
    clone['offset'] = 0;
    setQuery(clone);
    await dispatch(getListCandidate(clone, get(profile, 'data.employer.company_id', '')));
  }

  useEffect(() => {
    dispatch(getListCandidate(query, get(profile, 'data.employer.company_id', '')));
  }, []);

  return (
    <div className="jobListContainer">
      <div className="header">
        <div>{`Danh sách ứng viên (${get(company, 'list_candidate.extra_data.total', 0)})`}</div>
      </div>
      <Row className="filter-box">
        <Col span={24} className="title">Tìm kiếm</Col>
        <Col span={24} className="filter-option">
          <Row gutter={[16, 16]} className="body">
            <Col span={18}>
              <b>Từ khóa</b>
              <Search value={query.key_word} onChange={(e) => onChangeQuery('key_word', e.target.value)} placeholder="Từ khóa" />
            </Col>
            <Col span={6}>
              <b>Trạng thái</b>
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="Trạng thái"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(e) => onChangeQuery('status', e)}
                value={query.status}
              >
                <Option value="">All</Option>
                <Option value="pending">Pending</Option>
                <Option value="accepted">Accepted</Option>
                <Option value="reject">Rejected</Option>
                <Option value="on_board">On board</Option>
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button icon={<SearchOutlined />} onClick={handleFilter} type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />} onClick={() => setQuery(initQuery)} type="primary">Làm mới</Button>
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Form form={form} component={false}>
          <Table
            loading={get(company, 'is_loading', false)}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            rowKey="id"
            columns={mergedColumns}
            dataSource={get(company, 'list_candidate.items.refers', [])}
            pagination={{
              pageSize: query.limit,
              total: get(company, 'list_candidate.extra_data.total', 0),
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30', '50'],
              size: 'small',
              current: (query.offset / 10) + 1
            }}
            onChange={handleTableChange}
          />
        </Form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { company, profile } = state
  return { company, profile }
}

export default connect(mapStateToProps, null)(CandidateList)
