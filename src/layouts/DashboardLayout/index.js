import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styles from './index.scss';

const { Header, Sider, Content } = Layout;

function DashboardLayout(props) {
  const { dispatch, history } = props;
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(!collapsed)
  };

  if (localStorage.getItem('token')) {
    return (
      <Layout className={styles.dashboardPage}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <UserOutlined />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={() => {
                dispatch({type: 'auth/logout'})
                history.push('/login')
              }}
            >
              <UploadOutlined />
              <span>Log out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className={styles.siteLayoutBackground} style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: `${styles.trigger}`,
              onClick: toggle,
            })}
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
