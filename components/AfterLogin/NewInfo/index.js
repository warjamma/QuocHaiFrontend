import React, { useState } from 'react';
import { Rate } from 'antd';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Router, { withRouter } from 'next/router';
import { requireAuthentication } from '../../../lib/auth';
import {
  LogoutOutlined,
  EyeInvisibleOutlined,
  ShareAltOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
function NewInfo(props) {
  const { profile } = props;
  return (
    <div className="info-news" style={{paddingBottom:'30px'}}>
      <div className="row">
        <div className="col-sm-12 img-info">
          <img
            style={{ objectFit: 'cover', width: '100%' , padding: "10px"}}
            src="http://vanhienblog.info/wp-content/uploads/2019/02/anh-gai-xinh-dep-hot-girl-1-00-600x445.jpg"
            alt="#"
          ></img>
        </div>
        <div
              className="col-sm-12 user-info"
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              <div style={{padding:'10px'}}>Lưu thường</div>
            </div>
            <div
              className="col-sm-12 user-info"
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              <Rate allowHalf defaultValue={2.5}  style={{padding:'10px'}}/>
            </div>
        <div
          className="col-sm-12 ">
          <div className="row" style={{
            border: '1px solid #d29b9b61',
            paddingTop: '30px',
            margin: '0px',
            borderRadius: '10px',
          }}>
          <div className="col-sm-4" style={{ textAlign: 'center' }}>
            {' '}
            <LogoutOutlined style={{ cursor: 'pointer', fontSize: '35px' }} />
            <div>Chỉ dường</div>
          </div>
          <div className="col-sm-4" style={{ textAlign: 'center' }}>
            {' '}
            <EyeInvisibleOutlined
              style={{ cursor: 'pointer', fontSize: '35px' }}
            />
            <div>Xem chi tiết</div>
          </div>
          <div className="col-sm-4" style={{ textAlign: 'center' }}>
            {' '}
            <ShareAltOutlined style={{ cursor: 'pointer', fontSize: '35px' }} />
            <div>Chia sẻ</div>
          </div>
        </div>
        </div>
        <div className="col-sm-12">
        <div className="row address" style={{ paddingTop:"30px", margin: '0px',}}>
          <div className="col-sm-2"><EnvironmentOutlined style={{fontSize: "30px"}}/></div><div className="col-sm-8">Hoà An, Phụng Hiệp, Hậu Giang, Việt Nam</div>
        </div>
        <div className="row address" style={{ paddingTop:"30px", margin: '0px',}}>
          <div className="col-sm-2"><PhoneOutlined style={{fontSize: "30px"}}/></div><div className="col-sm-8">+84 0396492022</div>
        </div>
        </div>

        <div className="col-sm-12">
          <div className="row " style={{paddingTop:"30px", borderTop:" 1px solid #d29b9b61", margin:"0px"}}>
            <div className="col-sm-12" style={{paddingTop:"5px"}}>
            <img
            style={{ objectFit: 'cover', width: '100%', height:"200px"  }}
            src="https://kenh14cdn.com/2019/3/21/photo-1-1553155372658221231913.jpg"
            alt="#"
          ></img>
            </div>
            <div className="col-sm-12" style={{paddingTop:"30px", cursor:"pointer"}} >
          <div style={{magin:"0px", textAlign:"center", border:"1px solid #d29b9b61",borderRadius:'20px', padding: "10px", }}>Xem chi tiết</div>
        </div>
          </div>
        </div>

        
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
export default connect(mapStateToProps, null)(NewInfo);
