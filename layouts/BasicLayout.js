import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router';
import { get } from 'lodash';
import { Layout, Menu, Dropdown, Popover, Badge } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TeamOutlined,
  PieChartOutlined,
  FileOutlined,
  LogoutOutlined,
  BellFilled,
  InboxOutlined
} from '@ant-design/icons';

import { logOutRequest } from '../containers/profile/actions'

import './BasicLayout.scss';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

function BasicLayout(props) {
  const { dispatch, history, location, profile } = props;
  const [collapsed, setcollapsed] = useState(true);
  // useEffect(() => {
  //   const { profile } = props;
  //   if (!get(profile, 'data.token', '')) {
  //     Router.push('/login');
  //   }
  // });

  const toggle = () => {
    setcollapsed(!collapsed)
  };

  const renderKey = () => {
    const path = 'job-list'
    switch(path) {
      case 'job-list':
        return ['2'];
      case 'refer-list':
        return ['3'];
      default:
        return ['1'];
    }
  }

  const content = (
    <Menu className="notificationList">
      <div className="notificationTitle">
        <span>Thông báo</span>
        <span>Đánh dấu đã đọc</span>
      </div>
      <div className="notificationBody">
        <InboxOutlined />
        <div>Không có thông báo</div>
      </div>
    </Menu>
  )

  const menu = (
    <Menu className="dropdownProfile">
      <Menu.Item key="1">
        <UserOutlined />
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item key="2" onClick={() => {
          dispatch(logOutRequest())
          Router.push('/login');
        }}
      >
        <LogoutOutlined />
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="dashboardPage">
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={renderKey()}>
          <Menu.Item key="1">
            <Link href={`${get(profile, 'data.employer', '') ? '/company' : '/referrer'}`}>
              <PieChartOutlined />
            </Link>
            <span>
              <Link href={`${get(profile, 'data.employer', '') ? '/company' : '/referrer'}`}>
                <a>Bảng điều khiển</a>
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href={`${get(profile, 'data.employer', '') ? '/company/job-list' : '/referrer/job-list'}`}>
              <VideoCameraOutlined />
            </Link>
            <span>
              <Link href={`${get(profile, 'data.employer', '') ? '/company/job-list' : '/referrer/job-list'}`}>
                <a>Công việc</a>
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href={`${get(profile, 'data.employer', '') ? '/company/candidate-list' : '/referrer/candidate-list'}`}>
              <UploadOutlined />
            </Link>
            <span>
              <Link href={`${get(profile, 'data.employer', '') ? '/company/candidate-list' : '/referrer/candidate-list'}`}>
                <a>Đã giới thiệu</a>
              </Link>
            </span>
          </Menu.Item>
          {
            get(profile, 'data.employer', '') ? (
              <SubMenu
                key="4"
                title={
                  <span>
                    <UserOutlined />
                    <span>Quản trị</span>
                  </span>
                }
              >
                <Menu.Item className="subItem" key="sub1">
                  <FileOutlined />
                  <span>Hồ sơ công ty</span>
                </Menu.Item>
                <Menu.Item className="subItem" key="sub2">
                  <TeamOutlined />
                  <span>Nhân viên</span>
                </Menu.Item>
              </SubMenu>
            ) : (
              <Menu.Item key="4">
                <UserOutlined />
                <span>Thông tin cá nhân</span>
              </Menu.Item>
            )
          }
         
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: !collapsed ? 200 : 80 }}>
        <Header className="siteLayoutBackground">
          <div className="headerLayout">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              onClick: toggle,
            })}
            <div className="rightHeader">
              <Dropdown overlay={content}>
                <Badge dot>
                  <BellFilled className="notiIcon" />
                </Badge>
              </Dropdown>
              <Dropdown overlay={menu}>
                <div className="avatarUser" />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          className="sideLayoutBody"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  const { profile } = state;
  return {
    profile
  };
}

export default connect(mapStateToProps, null)(BasicLayout)
