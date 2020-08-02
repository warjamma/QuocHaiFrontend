import React from 'react';
import MenuLeft from '../../../components/AfterLogin/MenuLeft';
const index = () => {
  return (
    <div className="profile">
      <div className="row">
        <div className="col-sm-2">
          <MenuLeft />
        </div>
        <div className="col-sm-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.337690782169!2d106.80146661474963!3d10.861899692263504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175275afb08cf8d%3A0xbdcb4da10227543f!2zQy50eSBYw6J5IEThu7FuZyDEkOG6oWkgTOG7mWMgUGjDoXQ!5e0!3m2!1svi!2s!4v1568280519936!5m2!1svi!2s"
            style={{
              width: '100%',
              height: '100vh',
              frameborder: 0,
              border: 0,
              allowfullscreen: '',
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default index;
