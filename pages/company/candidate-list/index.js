import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import './styles.scss';

function CandidateList () {
  return (
    <div>
      CandidateList!!
    </div>
  )
};

export default connect(null, null)(CandidateList)
