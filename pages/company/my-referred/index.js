import React, { Component } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'

function MyReferred () {
  return (
  <div>
    MyReferred!!
  </div>
  )
};

MyReferred.getInitialProps = async function({ reduxStore }) {
  return {}
}

export default connect(null, null)(MyReferred)
