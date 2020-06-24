import React, { useState } from 'react';
import classNames from 'classnames';
import Router from 'next/router';
import { MenuOutlined } from '@ant-design/icons';
import './styles.scss';

function HeaderHome() {
  const [isChoosen, setChoosen] = useState(false);
  const myFunction = () => {
    setChoosen(!isChoosen);
  };

  return (
    <div className="menu-top">
      <div className="container full-wight">
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
            onClick={() => Router.push(`/`)}
          >
            <img
              className="name-logo"
              src="https://d3t1myknaqth5d.cloudfront.net/files/1592564409.jpeg"
              alt="#"
            />
          </li>
          <div className="child">
            <div className="down">
              <li
                className="  tag"
                role="presentation"
                onClick={() => Router.push(`/job-list-home`)}
              >
                Công việc
              </li>
              <li
                className="  tag"
                role="presentation"
                onClick={() => Router.push(`/login`)}
              >
                Nhà tuyển dụng
              </li>
              <li
                role="presentation"
                onClick={() => Router.push(`/recuiterment`)}
                className="active tag"
              >
                  orther...
              </li>
              <li
                className="  tag upload"
                role="presentation"
                onClick={() => Router.push(`/login`)}
              >
                Giới thiệu ứng viên
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

export default HeaderHome;
