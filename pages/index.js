import React,{useEffect} from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';

function Home () {

  const reload=()=>{
      Router.push('/login');
  };
  useEffect(() => {
      reload();
  }, []);

  return (
  <div>
    Home!!
  </div>
  );
};

export default connect(null, null)(Home);
