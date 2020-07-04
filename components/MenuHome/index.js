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
              src="/eface.png"
              alt="#"
            />
          </li>
          <div className="child">
            <div className="down">
              {/* <li
                className="  tag"
                role="presentation"
                onClick={() => Router.push(`/home-page/job-list-home`)}
              >
                Tìm việc IT
              </li>
              <li
                role="presentation"
                onClick={() => Router.push(`/home-page/upload-cv-home`)}
                className="tag upload"
              >
                  Upload cv
              </li> */}
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
