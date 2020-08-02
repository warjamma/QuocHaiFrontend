import React, { useState } from 'react';
import { Avatar } from 'antd';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Router, { withRouter } from 'next/router';
import {
  LikeOutlined,
  WechatOutlined,
  ShareAltOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { requireAuthentication } from '../../../lib/auth';

function News(props) {
  const { profile } = props;
  return (
    <div className="info-news">
      <div className="row">
        <div
          className="col-sm-12"
          style={{ fontWeight: 'bold', fontSize: 15, paddingTop:"20px" }}
        >
          <span className="avatar" style={{cursor:"pointer"}}><Avatar src="http://vanhienblog.info/wp-content/uploads/2019/02/anh-gai-xinh-dep-hot-girl-1-00-600x445.jpg" /></span> Lưu Thường
        </div>
        <div className="col-sm-12" style={{paddingTop:"10px", paddingBottom:"10px", whiteSpace: "pre-wrap"}}>Cả thế giới đang chờ :o Tuyệt vời!</div>
        <div className="col-sm-12">
          <img
            style={{ objectFit: 'cover', width: '100%' }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbySopxhYHbpzaomZQdtSfnC_u0Fo3fXECNQ&usqp=CAU"
            alt="#"
           />
        </div>
        <div className="col-sm-12 row" style={{paddingTop:"10px"}}>
          <div className="col-sm-3" style={{ fontSize: '30px', paddingLeft:'20px' }}>
            <div className="row">
              <div className="col-sm-4">
                <LikeOutlined style={{ cursor:"pointer"}} />
              </div>
              <div className="col-sm-4" style={{ cursor:"pointer"}}>
                <WechatOutlined />
              </div>
              <div className="col-sm-4" style={{ cursor:"pointer"}}>
                <ShareAltOutlined />
              </div>
            </div>
          </div>
          <div className="col-sm-9" style={{paddingRight:'10px'}} >
            <EnvironmentOutlined  style={{ float: 'right', fontSize: '30px', cursor:"pointer"}}/>
          </div>
          <div className="col-sm-12" style={{fontWeight:'bold', cursor:"pointer"}}>123,69 likes</div>
          <div className="col-sm-12" style={{ cursor:"pointer"}}>View all 67 comments</div>
          <div className="col-sm-12 row">
            <div className="one-cmt"><span style={{fontWeight:'bold', cursor:"pointer"}} className="user">s_av_age03</span><span className="tag" style={{ cursor:"pointer",color: "blue"}}>@tanishk_baniya_ actually </span>he is right but this was the easy one</div>
            <div className="one-cmt"><span style={{fontWeight:'bold',  cursor:"pointer"}} className="user">s_av_age03</span><span className="tag"> </span>Good</div>
            <div className="one-cmt"><span style={{fontWeight:'bold',  cursor:"pointer"}} className="user">mtao.y</span><span className="tag"> </span>OK</div>
          </div>
        </div>
        <div className="col-sm-12" style={{paddingTop:'20px', paddingBottom: '10px'}}>
          <div className="row border" style={{borderTop: "1px solid #d29b9b61"}}>
          <div className="col-sm-11">
          <input placeholder="comments" name="comments" style={{width:"100%", border: "none", padding: '10px'}} />
          </div>
          <div className="col-sm-1">
          <span className="post" style={{ paddingTop: '10px', fontWeight: "bold", cursor:"pointer", float:"left"}}>Post</span>
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
export default connect(mapStateToProps, null)(News);
