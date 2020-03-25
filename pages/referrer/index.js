import React, { Component } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link'

function OverView () {
  return (
  <div>
    OverView!!
  </div>
  )
};

OverView.getInitialProps = async function({ reduxStore }) {
  return {}
}

export default connect(null, null)(OverView)
