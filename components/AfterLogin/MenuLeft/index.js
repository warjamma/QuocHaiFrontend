import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Router, { withRouter } from 'next/router';
import { Menu } from 'antd';
import { get } from 'lodash';
import { requireAuthentication } from '../../../lib/auth';
import './styles.scss';
import {
  companySideBar,
  adminSideBar,
  referrerSideBar,
} from '../../../ultils/sidebar';
import { PieChartOutlined } from '@ant-design/icons';
function HeaderHome(props) {
  const { profile } = props;
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
  return (
    <div className="menu-left" >
      <div
        className="sider-contai"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          zIndex: 3,
          background: 'transparent',
        }}
      >
        <Menu style={{background: 'transparent'}}>
          {sidebarMenu().map((item, key) => (
            <Menu.Item style={{color:"#1c1e21",fontWeight:'bold'}}  key={key + 1} onClick={() => Router.push(item.url)}>
              {/* <PieChartOutlined /> */}
              <span style={{textTransform:'uppercase'}}>{item.name}</span>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
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
)(withRouter(requireAuthentication(HeaderHome)));
