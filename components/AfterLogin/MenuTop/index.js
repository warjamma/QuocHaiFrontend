import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Router from 'next/router';
import { MenuOutlined } from '@ant-design/icons';
import { logOutRequest } from '../../../containers/profile/actions';
import { Input } from 'antd';
import './styles.scss';

function HeaderHome(props) {
  const { dispatch } = props;
  const [isChoosen, setChoosen] = useState(false);
  const myFunction = () => {
    setChoosen(!isChoosen);
  };

  return (
    <div className="menu-top-login">
      <div className="container-full-wight">
        <div
          className={classNames(
            'topnav',
            { responsive: isChoosen },
            { topnav: !isChoosen }
          )}
          id="myTopnav"
        >
          <li
            className="logo"
            role="presentation"
            onClick={() => Router.push(`/home`)}
          >
            <img className="name-logo" src="/eface.png" alt="#" />
          </li>
          <li
          style={{paddingTop:"17px", paddingLeft:"20px"}}
            className="logo">
            <Input placeholder="Tìm kiếm"  style={{width:"500px"}}/>
          </li>
          <div className="child">
            <div className="down">
              {/* <li
                className="  tag"
                role="presentation"
                onClick={() => Router.push(`/profile`)}
              >
                Trang cá nhân
              </li>
              <li
                role="presentation"
                onClick={() => Router.push(`/home`)}
                className="tag upload"
              >
                Trang chủ
              </li> */}
              <li
                role="presentation"
                onClick={async () => {
                  await dispatch(logOutRequest());
                  Router.push('/');
                }}
                className="tag upload"
              >
                Logout
              </li>
            </div>
          </div>
          <li className="icon">
            {' '}
            <div role="presentation" onClick={() => myFunction()}>
              <MenuOutlined />
            </div>
          </li>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(HeaderHome);
