/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Input, Select, Tag, Popconfirm, DatePicker, Form, message ,Popover} from 'antd';
import Router from 'next/router';
import { connect } from 'react-redux';
import { RedoOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import moment from 'moment';
import { getListCandidate, updateStatusRef } from '../../../containers/company/action';
import renderColorStatus from '../../../ultils/renderColorStatus';

import './styles.scss';

const { Search } = Input;

const { Option } = Select;

const initQuery = {
  key_word: '',
  status: '',
  offset: 0,
  limit: 10,
};

function CandidateList (props) {
  const [form] = Form.useForm();
  const { profile, company, dispatch } = props;
  const [query, setQuery] = useState(initQuery);
  const [editingKey, setEditingKey] = useState('');
  const [statusIndex, setStatusIndex] = useState('');
  const dateFormat = 'YYYY/MM/DD';

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
      onChange={(e) => {
        setStatusIndex(e);
      }}
    >
      <Option value="on_board">Onboarding</Option>
      <Option value="interview_failed">Interview failed</Option>
      <Option value="probation">Probation passed</Option>
      <Option value="probation_failed">Probation failed</Option>
    </Select>;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
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

  const isEditing = record => {
    return record.id === editingKey;
  };

  const edit = record => {
    form.resetFields();
    const clone = { ...record };
    clone.on_boarding_at = clone.on_boarding_at ? moment(clone.on_boarding_at, dateFormat) : '';
    clone.pass_probation_at = clone.pass_probation_at ? moment(clone.pass_probation_at, dateFormat) : '';
    form.setFieldsValue({ ...clone });
    setStatusIndex(record.status);
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (data) => {
    try {
      const row = await form.validateFields();
      const body = {};
      if(row.status === 'interview_failed' || row.status === 'probation_failed') {
        body.failing_reason = row.failing_reason;
      } else {
        row.status === 'on_board' ? body.on_boarding_at = `${moment(row.on_boarding_at).format('YYYY-MM-DDTHH:mm:ss')}Z`
        : body.pass_probation_at = `${moment(row.pass_probation_at).format('YYYY-MM-DDTHH:mm:ss')}Z`; 
      }
      dispatch(updateStatusRef(data.id, row.status, body)).then(res => {
        if(res.status) {
          message.success('Update status successfully');
        } else {
          message.warning(res.error);
        }
        dispatch(getListCandidate(query, get(profile, 'data.employer.company_id', '')));
      });
      return setEditingKey('');
    } catch (errInfo) {
      return errInfo;
    }
  };

  const columns = [
    {
      title: 'Vị trí',
      dataIndex: 'job',
      render: (text, record, index) => (
        <div role="presentation" className="custom-role" onClick={() => Router.push(`/job-detail/${record.job.id}`)}> 
        <div className="job-role">
          {/* <Link href="/job-detail/[id]" as={`/job-detail/${record.job.id}`}><a>{get(record, 'job', {}).job_role}</a></Link> */}
          {
              get(record, 'job', {}).job_role.map(item => (
                <b className="name-role" key={item}>{item}</b>
              ))
            } 
        </div>
        </div>
      )
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      render: (text, record, index) => (
        <div>
          <div>{get(record, 'candidate', {}).name}</div>
          {/* <div>
            {
              get(record, 'candidate', {}).job_role.map(item => (
                <Tag key={item} color="blue">{item}</Tag>
              ))
            }
          </div> */}
        </div>
      )
    },
    {
      title: 'Cấp độ',
      dataIndex: 'job',
      align: 'center',
      render: (text, record, index) => (
        get(record, 'job', {}).job_levels.map(item => (
          <Tag style={{margin:3, cursor: 'pointer'}} key={item} color="blue">{item}</Tag>
        ))
      )
    },
    {
      title: 'Thưởng ($)',
      dataIndex: 'job',
      align: 'center',
      render: (text, record, index) => <Tag color="blue">{get(record, 'job', {}).reward}$</Tag>,
    },
    {
      title: 'Mức lương ($)',
      dataIndex: 'job',
      align: 'center',
      render: (text, record, index) => <Tag color="blue">{get(record, 'job', {}).min_salary}$ - {get(record, 'job', {}).max_salary}$</Tag>,
    },
    {
      title: 'Onboarding date',
      dataIndex: 'status',
      align: 'center',
      render: (text, record, index) => <div>{get(record, 'on_boarding_at')?moment(get(record, 'on_boarding_at')).format('DD-MM-YYYY'):("N/A")}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      editable: true,
      width: 120,
      render: (text, record, index) => <div>
      {get(record, 'status', '') === 'interview_failed' || get(record, 'status', '') === 'probation_failed'
          ? <Popover content={<div>
            <p>{get(record,'status')}</p>
          </div>} title="Lý do">
            <Tag color={renderColorStatus(record.status)}>
              {get(record, 'status', '') === 'interview_failed'
                ? 'Interview failed'
                : 'Probation failed'}
              
            </Tag>
          </Popover>
          : <Tag color={renderColorStatus(record.status)}>
          {get(record, 'status', '') === 'on_board'
            ? 'Onboarding'
            : 'Pending'}
          
        </Tag>}
      
    </div>,
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
            <Popconfirm placement="topRight" title={
              <div>
                {
                  (statusIndex === 'interview_failed' || statusIndex === 'probation_failed')  ? (
                    <Form.Item
                      name="failing_reason"
                      style={{
                        margin: 0,
                      }}
                    >
                      <Input.TextArea placeholder="Reason to reject..." />
                    </Form.Item>
                  ) : (
                    <Form.Item
                      name={statusIndex === 'on_board' ? 'on_boarding_at' : 'pass_probation_at'}
                      style={{
                        margin: 0,
                      }}
                    >
                      <DatePicker
                        format={dateFormat} 
                      />
                    </Form.Item>
                  )
                }
              </div>
            } onConfirm={() => save(record)}>
              <span disabled={statusIndex === 'confirmed'} style={{ marginRight: 8 }}>
                Save
              </span>
            </Popconfirm>
            <Popconfirm placement="topRight" title="Sure to cancel?" onConfirm={cancel}>
              <span>Cancel</span>
            </Popconfirm>
          </span>
        ) : (
          <span role="presentation" disabled={get(record, 'status', '') === 'pending'} onClick={() => edit(record)}>
            Edit
          </span>
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
    const clone = { ...query };
    clone.offset = (pagination.current - 1) * 10;
    clone.limit = pagination.pageSize;
    setQuery(clone);
    await dispatch(getListCandidate(clone, get(profile, 'data.employer.company_id', '')));
  };

  const onChangeQuery = async (key, value) => {
    const clone = { ...query };
    clone[key] = value;
    setQuery(clone);
  };

  const handleFilter = async () => {
    const clone = { ...query };
    clone.offset = 0;
    setQuery(clone);
    await dispatch(getListCandidate(clone, get(profile, 'data.employer.company_id', '')));
  };

  const resetSearch = async () => {
    setQuery(initQuery);
    await dispatch(getListCandidate(initQuery, get(profile, 'data.employer.company_id', '')));
  };
  
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
              <b>Tìm theo tên ứng viên</b>
              <Search value={query.key_word} onChange={(e) => onChangeQuery('key_word', e.target.value)} placeholder="Tên ứng viên" />
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
                <Option value="confirmed">Confirmed</Option>
                <Option value="on_board">Onboarding</Option>
                <Option value="interview_failed">Interview failed</Option>
                <Option value="probation_passed">Probation passed</Option>
                <Option value="probation_failed">Probation failed</Option>
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button icon={<SearchOutlined />} onClick={handleFilter} type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />} onClick={() => resetSearch()} type="primary">Làm mới</Button>
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
  const { company, profile } = state;
  return { company, profile };
}

export default connect(mapStateToProps, null)(CandidateList);
