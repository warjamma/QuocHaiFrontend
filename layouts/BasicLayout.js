/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter, useRouter } from 'next/router';
import { get } from 'lodash';
import { Layout, Menu, Dropdown, message, Badge, Input, } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PieChartOutlined,
  FileOutlined,
  LogoutOutlined,
  BellFilled,
  InboxOutlined,
} from '@ant-design/icons';
import { getProfileById } from '../containers/company/action';
import { getProfileByIdRef } from '../containers/referred/actions';

import { requireAuthentication } from '../lib/auth';
import {
  companySideBar,
  adminSideBar,
  referrerSideBar,
} from '../ultils/sidebar';

import { logOutRequest, clearError } from '../containers/profile/actions';

import './BasicLayout.scss';
import './styles.scss';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const error = (mess) => {
  message.error(mess);
};

function BasicLayout(props) {
  const { dispatch, profile, children, company, referred } = props;
  const [collapsed, setcollapsed] = useState(false);
  // const [time, setTime] = useState(3600 * 1000);
  const router = useRouter();
  if (router.pathname === '/') {
    if (get(profile, 'data.employer', '')) {
      Router.push('/company/job-list');
    }
    if (get(profile, 'data.recruiter.role', '') === 'superadmin') {
      Router.push('/superadmin/job-list');
    }
    if (get(profile, 'data.recruiter', '')) {
      Router.push('/customer/profile');
    }
  }
  // const logOut = async () => {
  //   await dispatch(logOutRequest());
  //   Router.push('/');
  // };
  // window.onunload   = async() => {
  //   await dispatch(logOutRequest());
  //   Router.push('/login');
  // };
  // useEffect(() => {
  //   const timer = setTimeout(() => logOut(), time);
  //   document.onclick = () => {
  //     setTime(1000 * 3600);
  //   };
  //   document.onkeypress = () => {
  //     setTime(1000 * 3600);
  //   };
  //   document.onload = () => {
  //     setTime(1000 * 3600);
  //   };
  //   return () => clearTimeout(timer);
  // }, [time]);
  useEffect(() => {
    if (get(profile, 'error', false) && get(profile, 'message', '')) {
      error(get(profile, 'message', ''));
      dispatch(clearError());
    }
    // setToken(localStorage.getItem('accessToken'))
  });
  const id = get(profile, 'data.employer.company.id', []);
  useEffect(() => {
    if (get(profile, 'data.employer', '')) {
      dispatch(getProfileById({ id }));
    }
    if (get(profile, 'data.recruiter', '')) {
      dispatch(getProfileByIdRef({ id }));
    }
  }, []);
  const toggle = () => {
    setcollapsed(!collapsed);
  };

  const sidebarMenu = () => {
    if (get(profile, 'data.employer', '')) {
      return companySideBar;
    }
    if (
      get(profile, 'data.recruiter', '') &&
      get(profile, 'data.recruiter.role', '') === 'superadmin'
    ) {
      return adminSideBar;
    }
    return referrerSideBar;
  };
  // const imgLogo = () => {
  //   if (get(profile, 'data.employer', '')) {
  //     return get(company, 'company_detail.data.company.avatar');
  //     // return get(profile, 'data.employer.company.avatar');
  //   }
  //   if (get(profile, 'data.recruiter.role', '') === 'superadmin') {
  //     const img = 'https://www.rockship.co/images/rs-logo-img.png';
  //     return img;
  //   }
  //   if (get(profile, 'data.recruiter', '')) {
  //     // return get(profile, 'data.recruiter.avatar');
  //     return get(referred, 'recruiter_detail.data.recruiter.avatar');
  //   }
  //   return 'https://www.rockship.co/images/rs-logo-img.png';
  // };

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
  );
  const menu = (
    <Menu className="dropdownProfile">
      <Menu.Item key="1">
        <UserOutlined />
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={async () => {
          await dispatch(logOutRequest());
          Router.push('/');
          // Router.push('/login');
        }}
      >
        <LogoutOutlined />
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  if (get(profile, 'data.accessToken', '')) {
    return (
      <Layout className="dashboardPage" >
        <Header className="siteLayoutBackground" >
          <div className="headerLayout " style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 3,
            background: '#333233',
            height: 60,
          }}>
            {/* {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                onClick: toggle,
              }
            )}
            <div className="rightHeader" >
              <Dropdown overlay={content}>
                <Badge dot>
                  <BellFilled className="notiIcon" />
                </Badge>
              </Dropdown>
              <Dropdown overlay={menu}>
                <div className="avatarUser" />
              </Dropdown>
            </div> */}
            <div className="row " style={{width: '100%'}}>
            <div className="menu col-sm-2" >
              <img src="/eface.png" alt="logo" style={{ width: '80%', padding:20 }} />
            </div>
            <div className="col-sm-5" style={{ marginTop:10}}><Input placeholder="Basic usage" /></div>
            <div className="col-sm-4">   </div>
            <div className="col-sm-1 row rightHeader" >
              
              {/* <Dropdown overlay={content} className="col-sm-6">
                <Badge dot>
                  <BellFilled className="notiIcon" />
                </Badge>
              </Dropdown> */}
              <Dropdown overlay={menu} className="col-sm-6" >
                <div className="avatarUser" />
              </Dropdown>
            </div> 
            </div>
          </div>
        </Header>

        <Layout
          className="site-layout"
          style={{ marginLeft: !collapsed ? 200 : 80 }}
        >
          <Sider
            className="sider-contai"
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              zIndex: 3,
              background: 'transparent'
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            {/* <div className="logo">
              <img className="logo" src={imgLogo()} alt="avatar" />
            </div> */}
            <Menu theme="dark" mode="inline">
              {sidebarMenu().map((item, key) =>
                !item.subMenu ? (
                  <Menu.Item key={key + 1} onClick={() => Router.push(item.url)}>
                    <PieChartOutlined />
                    <span>{item.name}</span>
                  </Menu.Item>
                ) : (
                    <SubMenu
                      key="4"
                      title={
                        <span>
                          <UserOutlined />
                          <span>{item.name}</span>
                        </span>
                      }
                    >
                      {item.subMenu.map((pk, key) => (
                        <Menu.Item
                          className="subItem"
                          key={key + 1}
                          onClick={() => Router.push(`${pk.url}`)}
                        >
                          <FileOutlined />
                          <span>{pk.name}</span>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  )
              )}
            </Menu>
          </Sider>
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
    );
  }
  return (
    <>
      <div className="container-box authenticate-page">
        {children}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  // console.log('sssssssssssssduaskudhakjshd', state);
  const { profile, company, referred } = state;
  return {
    profile,
    company,
    referred,
  };
}

export default connect(
  mapStateToProps,
  null
)(withRouter(requireAuthentication(BasicLayout)));
