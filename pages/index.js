import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Select, Input } from 'antd';
import { get } from 'lodash';
import Router from 'next/router';
import FooterHome from '../components/FooterHome';
import MenuHome from '../components/MenuHome';
import Login from '../components/Login';
import Register from '../components/Register';

import { getListJob } from '../containers/job/actions';
import './styles.scss';

function Home() {
  const [status, setStatus] = useState(true);
  const changeForm = () => {
    setStatus(!status);
  };
  const hiddenFrom = () => {
    if (status) {
      return { display: "none",marginTop: 30 }
    }
  };
  const showFrom = () => {
    if (!status) {
      return { display: 'none',marginTop: 30 }
    }
  }
  return (
    <div className="home-page">
      <div className="boude-menu">
        <MenuHome />
      </div>
      <div className="container " style={{height:'80vh', marginTop:'20px'}} >
        <div className="row">
          <div className="col-sm-7" >
            <div style={{ fontWeight: 'bold', fontSize: '36px', color: "black" }}>
              Tận hưởng trãi nghiệm  
            </div>
            <div className="txtDown" style={{ fontWeight: "bold", fontSize: "20" }}>Cùng eface</div>
            <div >  <img src="/Up_CV.png" alt="logo"  style={{width:'100%'}}/></div>
          </div>
          <div className="col-sm-5" style={hiddenFrom()}>
            <div style={{ fontWeight: 'bold', fontSize: '36px', color: 'black' }}>
              Tạo tài khoản mới
            </div>
            <div className="txtDown" style={{ fontWeight: "bold", fontSize: "20" }}>Một cách dễ dàng</div>
            <div className="regiser-page" >
              <Register />
            </div>
            <div className="btnlogin" style={{textAlign:"center", cursor:'pointer'}} onClick={()=>changeForm()}>Or Login now</div>

          </div>
          <div className="col-sm-5" style={showFrom()}>
            <div style={{fontWeight:'bold', fontSize:'36px', color: "black"}}>
              Đăng nhập
            </div>
            <div className="txtDown" style={{fontWeight:"bold", fontSize: "20"}}>Nhanh chóng</div>
            <div className="login-page"  >
              <Login/>
            </div>
            <div className="btnlogin" style={{textAlign:"center",cursor:'pointer'}} onClick={()=>changeForm()}>Or Register now</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '60px' }}>
        <FooterHome />
      </div>
    </div>

  );
}
function mapStateToProps(state) {
  const { referred, profile } = state;
  return { referred, profile };
}

export default connect(mapStateToProps, null)(Home);
