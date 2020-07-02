import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { Button, Typography } from 'antd';
import UploadCandidate from '../../../components/UploadCandidate';
import FooterHome from '../../../components/FooterHome';
import MenuHome from '../../../components/MenuHome';
import './styles.scss';

// const { Title } = Typography;
 
function Home() {
 
  // const [status, setStatus] = useState(false);


  // const changeStatus = () => {
  //   setStatus(!status);
  // };

  return (
    <div className="upload-cv-home" >
      <div className="boude-menu">
        <MenuHome />
        <div className="searchh container" >
          {/* <Title level={4}>Upload CV của bạn</Title> */}
        </div>
      </div>

      <div className="container job " style={{marginTop:45}}>
        <div className="row">
          <div className="col-sm-12" style={{fontWeight:'bold', fontSize:"60px", lineHeight:'82px', color:'#000000'}}>
            Upload CV
          </div>
          <div className="col-sm-12" style={{fontWeight:'bold', fontSize:"14px", lineHeight:'19px', color:'#000000'}}>Kết nối ứng viên với 10 000+ job và 9000 heahunter</div>
          <div className="col-sm-12 job-list" style={{marginTop:'32px'}}>
              <UploadCandidate />
          </div>
     </div>
      </div>
      <div>
        {' '}
        <FooterHome />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { company  } = state;
  return { company  };
}

export default connect(mapStateToProps, null)(Home);
