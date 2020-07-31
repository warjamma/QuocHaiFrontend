/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter, useRouter } from 'next/router';
import { get } from 'lodash';
import { Layout, Menu, Dropdown, message, Badge, Input } from 'antd';
import MenuTop from '../components/AfterLogin/MenuTop';
import MenuLeft from '../components/AfterLogin/MenuLeft';

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
    if (get(profile, 'data.accessToken', '')) {
      Router.push('/home');
    }
  }
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
      <div className="container admin ">
        <div className="menu">
          <MenuTop  />
        </div>
        <div className="row content" style={{ paddingTop: '80px' }}>
          <div className="col-sm-12">{props.children}</div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container-box authenticate-page">{children}</div>
    </>
  );
}

function mapStateToProps(state) {
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
