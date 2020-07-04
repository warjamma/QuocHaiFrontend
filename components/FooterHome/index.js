import React, { useState } from 'react';
import { Row, Col, Menu } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined, MediumOutlined, MailOutlined, PhoneOutlined, ToTopOutlined } from '@ant-design/icons';
import './styles.scss';
function HeaderHome() {
  return (
    <div className="footer">
      <div className="container pt5">
        <div className="row">
          <div className="col-sm-6">
            <div className="titleft"> Get in touch</div>
            <div className="row lineft">
              <div className="col-sm-1 iconftleft"><MailOutlined /></div>
              <div className="col-sm-11">eface@gmail.com</div>
              <div className="col-sm-1 iconftleft"><ToTopOutlined /></div>
              <div className="col-sm-11">Ho Chi Minh, Viet Nam</div>
              <div className="col-sm-1 iconftleft"><PhoneOutlined /></div>
              <div className="col-sm-11">(+84) - 0396490264 </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="titleft"> Company</div>
            <div className="contentft lineft">
              <div className="txt"> About Us</div>
              <div className="txt"> Portfolio</div>
              <div className="txt"> News</div>
              <div className="txt"> Careers</div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="titleft"> Social links</div>
            <div className="row">
              <div className="col-sm-3 iconft"><FacebookOutlined /></div>
              <div className="col-sm-9 iconft"><TwitterOutlined /></div>
              <div className="col-sm-3 iconft"><LinkedinOutlined /></div>
              <div className="col-sm-9 iconft"><MediumOutlined /></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default HeaderHome;