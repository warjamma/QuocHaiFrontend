import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'
import Router, { withRouter } from 'next/router';
import { get } from 'lodash';
import { Layout, Menu, Dropdown, message, Badge } from 'antd';
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
  InboxOutlined,
  SyncOutlined
} from '@ant-design/icons';

import { requireAuthentication } from "../lib/auth";

import { logOutRequest, clearError } from '../containers/profile/actions'

import './BasicLayout.scss';
import './styles.scss'

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const error = (mess) => {
  message.error(mess);
};

function BasicLayout(props) {
  const { dispatch, profile, router } = props;
  const [collapsed, setcollapsed] = useState(true);
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (get(profile, 'error', false) && (get(profile, 'message', ''))) {
      error(get(profile, 'message', ''));
      dispatch(clearError())
    }
    // setToken(localStorage.getItem('token'))
  });

  const toggle = () => {
    setcollapsed(!collapsed)
  };

  const renderKey = () => {
    const path = router.pathname
    switch(path.split('/')[2]) {
      case '':
        return ['1']
      case 'job-list':
        return ['2'];
      case 'my-referred':
        return ['3'];
      case 'profile':
        return ['4'];
      case 'job-detail':
        return ['5'];
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
      <Menu.Item key="2" onClick={async () => {
          await dispatch(logOutRequest())
          Router.push('/login');
        }}
      >
        <LogoutOutlined />
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  if (get(profile, 'data.token', '')) {
    return (
      <Layout className="dashboardPage">
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            zIndex: 3
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
              <Link href={`${get(profile, 'data.employer', '') ? '/company/my-referred' : '/referrer/my-referred'}`}>
                <UploadOutlined />
              </Link>
              <span>
                <Link href={`${get(profile, 'data.employer', '') ? '/company/my-referred' : '/referrer/my-referred'}`}>
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
                  <Link href={`${get(profile, 'data.employer', '') ? '/company/profile' : '/referrer/profile'}`}>
                    <UserOutlined />
                  </Link>
                  <Link href={`${get(profile, 'data.employer', '') ? '/company/profile' : '/referrer/profile'}`}>
                    <span>Thông tin cá nhân</span>
                  </Link>
                </Menu.Item>
              )
            }
            <Menu.Item key="5">
              <Link href={`${get(profile, 'data.employer', '') ? '/company/job-detail' : '/referrer/job-detail'}`}>
              <SyncOutlined spin />
              </Link>
              <Link href={`${get(profile, 'data.employer', '') ? '/company/job-detail' : '/referrer/job-detail'}`}>
                <span>Chi tiết công việc</span>
              </Link>
            </Menu.Item>
           
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
              padding: '10px 10px',
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    )
  } else {
    return (
      <>
        <div className="container-box authenticate-page">
          {props.children}
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  const { profile } = state;
  return {
    profile
  };
}

export default connect(mapStateToProps, null)(withRouter(requireAuthentication(BasicLayout)))
