import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'dva';
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
import styles from './index.scss';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

function DashboardLayout(props) {
  const { dispatch, history, location } = props;
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(!collapsed)
  };

  const renderKey = () => {
    const path = location.pathname.split('/')[2]
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
    <Menu className={styles.notificationList}>
      <div className={styles.notificationTitle}>
        <span>Thông báo</span>
        <span>Đánh dấu đã đọc</span>
      </div>
      <div className={styles.notificationBody}>
        <InboxOutlined />
        <div>Không có thông báo</div>
      </div>
    </Menu>
  )

  const menu = (
    <Menu className={styles.dropdownProfile}>
      <Menu.Item key="1">
        <UserOutlined />
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item key="2">
        <LogoutOutlined />
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  if (localStorage.getItem('token')) {
    return (
      <Layout className={styles.dashboardPage}>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
          trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={renderKey()}>
            <Menu.Item key="1">
              <PieChartOutlined />
              <Link to="/dashboard">Bảng điều khiển</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <Link to="/dashboard/job-list">Công Việc</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <Link to="/dashboard/refer-list">Đã giới thiệu</Link>
            </Menu.Item>
            <SubMenu
              key="4"
              title={
                <span>
                  <UserOutlined />
                  <span>Quản trị</span>
                </span>
              }
            >
              <Menu.Item className={styles.subItem} key="sub1">
                <FileOutlined />
                <span>Hồ sơ công ty</span>
              </Menu.Item>
              <Menu.Item className={styles.subItem} key="sub2">
                <TeamOutlined />
                <span>Nhân viên</span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5" onClick={() => {
                dispatch({type: 'auth/logout'})
                history.push('/login')
              }}
            >
              <LogoutOutlined />
              <span>Đăng xuất</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: !collapsed ? 200 : 80 }}>
          <Header className={styles.siteLayoutBackground}>
            <div className={styles.headerLayout}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                onClick: toggle,
              })}
              <div className={styles.rightHeader}>
                <Dropdown overlay={content}>
                  <Badge count={10}>
                    <BellFilled className={styles.notiIcon} />
                  </Badge>
                </Dropdown>
                <Dropdown overlay={menu}>
                  <div className={styles.avatarUser} />
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content
            className={styles.sideLayoutBody}
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
  } else {
    history.push('/login');
    return null;
  }
}

export default connect()(DashboardLayout);
