import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

function Home () {
  return (
  <div>
    Home!!
  </div>
  );
};

Home.getInitialProps = async function({ reduxStore }) {
  return {};
};

export default connect(null, null)(Home);
