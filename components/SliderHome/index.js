import React, { useState } from 'react';
import classNames from 'classnames';
import './styles.scss';

function SliderHome() {
  const [status,setStatus] = useState(false);

  const choise =()=>{
    setStatus(!status);
    console.log('trang active');
  };
  setTimeout(choise, 36000); 
  const hiddenImgSlider =()=>{
    if(status){
      return {display: 'none'};
    }
  };
  const showImgSlider =()=>{
    if(!status){
      return {display: 'none'};
    }
  };
  return (
    <div className="slider">
      <div className="slideshow-container">
        <div className="mySlides fade" style={hiddenImgSlider()}>
        <img src="https://d3t1myknaqth5d.cloudfront.net/files/1592989184.jpeg" alt="logo" style={{width:'100%'}}/>
        </div>
        <div className="mySlides fade" style={showImgSlider()}>
        <img src="https://ichef.bbci.co.uk/news/2048/cpsprodpb/E5C9/production/_112252885_coronavirus_jobs_by_risk_index_976.jpg" alt="logo" style={{width:'100%', objectFit: 'cover'}}/>
        </div>
        {/* <div className="dot-list">
          <span className="dot" onClick={()=>choise()} role="presentation" > </span>
          <span className="dot" onClick={()=>choise()} role="presentation" > </span>
          <span className="dot" onClick={()=>choise()} role="presentation" > </span>
         
        </div> */}
    </div>
    </div>
  );
}
export default SliderHome;
