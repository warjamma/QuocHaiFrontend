import { Table, Row, Col, Button, Input, Select } from 'antd';
import Router from 'next/router';
import { RedoOutlined, SearchOutlined, HighlightOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components'

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

const columns = [
  {
    title: 'Công việc',
    dataIndex: 'job',
    align: 'center',
    width: 300
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created',
    align: 'center'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    align: 'center'
  },
  {
    title: 'Mức lương ($)',
    dataIndex: 'salary',
    align: 'center'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    align: 'center'
  },
  {
    title: 'Hồ sơ ứng viên',
    dataIndex: 'candidate',
    align: 'center'
  },
  {
    title: '',
    dataIndex: 'candidate',
    align: 'center',
    width: 60,
    render: () => <ButtonAction><EditOutlined /></ButtonAction>,
  },
];

function JobList (props) {
  return (
    <div className="jobListContainer">
      <div className="header">
        <div>Danh sách công việc (40)</div>
        <Button onClick={() => Router.push('/company/create-job')} icon={<HighlightOutlined />} type="primary">Tạo công việc</Button>
      </div>
      <Row className="filter-box">
        <Col span={24} className="title">Tìm kiếm</Col>
        <Col span={24} className="filter-option">
          <Row gutter={[16, 16]} className="body">
            <Col span={12}>
              <b>Từ khóa</b>
              <Search placeholder="Từ khóa"/>
            </Col>
            <Col span={6}>
              <b>Loại công việc</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Chọn loại công việc"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="All">Tất cả</Option>
                <Option value="Developer">Developer</Option>
                <Option value="Kế toán">Kế toán</Option>
                <Option value="HR">HR</Option>
                <Option value="HR1">HR1</Option>
                <Option value="HR2">HR2</Option>
                <Option value="HR3">HR3</Option>
              </Select>
            </Col>
            <Col span={6}>
              <b>Trạng thái</b>
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Trạng thái"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="All">Tất cả</Option>
                <Option value="All">Đang chờ</Option>
                <Option value="Developer">Đã hoàn thành</Option>
              </Select>
            </Col>
          </Row>
          <div className="filter-button">
            <Button icon={<SearchOutlined />} type="primary">Tìm kiếm</Button>
            <Button icon={<RedoOutlined />} type="primary">Làm mới</Button>
          </div>
        </Col>
      </Row>
      <div className="jobListTable">
        <Table bordered columns={columns} dataSource={[]} />
      </div>
    </div>
  );
}

export default JobList
