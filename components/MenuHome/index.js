import React, { useState } from 'react';
import classNames from 'classnames';
import { MenuOutlined } from '@ant-design/icons';
import './styles.scss';

function HeaderHome() {
  const [isChoosen,setChoosen]=useState(false);
  const myFunction = () => {
    setChoosen(!isChoosen);
  };

 
  return (
    <div className="menu-top">
      <div className="container full-wight">
      {/* <a href="#home" className="logo" >
        <img className="name-logo" src="https://www.rockship.co/images/rs-logo-text.png" alt="#"/>
      </a> */}
      <div className={classNames('topnav',{ 'responsive': isChoosen },{ 'topnav': !isChoosen })} id="myTopnav">
      <div className="child">
      <a href="#news" className="active tag">Đăng nhập</a>
      <a href="#contact" className="  tag">Ứng tuyển</a>
      <a href="#about" className="  tag">It companies  </a>
      <a href="#about" className="  tag">All Jobs  </a>
      </div>
      <a href="avascript:void(0);" className="icon" onClick={()=>myFunction()}>
        <div><MenuOutlined /></div>
      </a>
    </div>
    </div>
    </div>
  );
}

export default HeaderHome;
