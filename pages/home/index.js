import React from 'react';
import MenuLeft from '../../components/AfterLogin/MenuLeft';
import NewInfo from '../../components/AfterLogin/NewInfo';
import News from '../../components/AfterLogin/News';

const index = () => {
  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-2"> <MenuLeft /></div>
      <div className="homepagelogin col-sm-6">
        <div className="row">
          <div className="col-sm-12 create-news" style={{background: "#ffffff", height: "150px"}}>Khối 1 đăng tin</div>
          <div className="col-sm-12 active-user" style={{background: "#ffffff", height: "70px", marginTop:"10px", borderRadius:"5px"}} >Check acitve</div>
          <div className="col-sm-12 news" style={{background: "#ffffff" ,marginTop:"10px", borderRadius:"5px"}}>
            <News/>
          </div>
          <div className="col-sm-12 news" style={{background: "#ffffff" ,marginTop:"10px"}}>
            <News/>
          </div>
          <div className="col-sm-12 news" style={{background: "#ffffff" ,marginTop:"10px"}}>
            <News/>
          </div>
          <div className="col-sm-12 news" style={{background: "#ffffff" ,marginTop:"10px"}}>
            <News/>
          </div>
        </div>
      </div>
      <div className="col-sm-4 infonews">
        <div className="padding" style={{background: "#ffffff", borderRadius:"5px"}}>
        <NewInfo/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default index;
