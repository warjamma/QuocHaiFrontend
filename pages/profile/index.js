import React from 'react';
import NewInfo from '../../components/AfterLogin/NewInfo';
import New from '../../components/AfterLogin/News';

const index = () => {
  return (
    <div className="profile container">
      <div className="row backgroundTop"  >
        <div className="col-sm-10">
          <img
            style={{ objectFit: 'cover', width: '100%' , height:"350px",background: "#ffffff"}}
            src="http://vanhienblog.info/wp-content/uploads/2019/02/anh-gai-xinh-dep-hot-girl-1-00-600x445.jpg"
            alt="#"
           />
        </div>
        <div className="col-sm-2" />
    </div>
    <div className="row">
      <div className="col-sm-4" style={{background: "#ffffff" ,marginTop:"10px"}}>
        <NewInfo/>
      </div>
      <div className="col-sm-6" style={{padding: '10px'}}>
        <div className="addNew" style={{background: "#ffffff" ,marginTop:"10px"}}>
          Edit news
        </div>
        <div className="news" style={{background: "#ffffff" ,marginTop:"10px"}}>
          <New />
        </div>
      </div>
    </div>
    </div>
  );
};

export default index;
