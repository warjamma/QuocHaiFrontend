import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import UploadCandidate from '../UploadCandidate';
import './styles.scss';

const { Title } = Typography;
function HeaderHome() {
  const [status, setStatus] = useState(false);
  const changeStatus = () => {
    setStatus(!status);
  };
  const hiddenForm = () => {
    if (!status) {
      return { visibility: 'hidden', height: 0 };
    }
  };
  const notHiddenForm = () => {
    if (status) {
      return { visibility: 'hidden', height: 0 };
    }
  };
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
              <Button type="danger" onClick={() => changeStatus()}>
                Upload CV của bạn tại đây
              </Button>
            </div>
            <Title level={4}>SỞ HỮU NGAY CV XỊN CÙNG VIỆC LÀM MƠ ƯỚC</Title>
            <p>
              30.000+ cơ hội việc làm được kết nối thành công qua Rocksearch mỗi
              ngày
            </p>
          </div>
          <div className="col-sm-12" style={hiddenForm()}>
            <UploadCandidate />
          </div>

          <div className="col-sm-12" style={notHiddenForm()}>
            <p>Tìm việc phù hợp, nhận thêm tiền thưởng. KHÁM PHÁ NGAY!!!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeaderHome;
