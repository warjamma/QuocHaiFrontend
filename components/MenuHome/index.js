import React, { useState } from 'react';
import classNames from 'classnames';
import './styles.scss';

function HeaderHome() {
  const [isChoosen,setChoosen]=useState(false);
  const myFunction = () => {
    setChoosen(!isChoosen);
  };

 
  return (
    <div className="container">
      <div className={classNames('topnav',{ 'responsive': isChoosen },{ 'topnav': !isChoosen })} id="myTopnav">
      <a href="#home" className="active">
        Home
      </a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
      <a href="avascript:void(0);" className="icon" onClick={()=>myFunction()}>
        <div>baaaa</div>
      </a>
    </div>
    </div>
  );
}

export default HeaderHome;
