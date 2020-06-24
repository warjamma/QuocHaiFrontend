import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import Router from 'next/router'
import './styles.scss';

const { Title } = Typography;
function HeaderHome() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Title level={3}>TÌM VIỆC KHÓ - CÓ ROCKSEARCH</Title>
            <div
              className="content-news"
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <Button type="danger" onClick={()=>Router.push('/upload-cv-home')}  >
                Upload CV của bạn tại đây
              </Button>
            </div>
            <Title level={4}>SỞ HỮU NGAY CV XỊN CÙNG VIỆC LÀM MƠ ƯỚC</Title>
            <p>
              30.000+ cơ hội việc làm được kết nối thành công qua Rocksearch mỗi
              ngày
            </p>
          </div>
        

          <div className="col-sm-12">
            <p>Tìm việc phù hợp, nhận thêm tiền thưởng. KHÁM PHÁ NGAY!!!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeaderHome;
