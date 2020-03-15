import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'dva';
import { Form, Input, Button, Checkbox, Tabs, Select, message } from 'antd';
import styles from './styles.scss';

function LandingPage(props) {
  return (
    <div className={styles.landingPage}>
      <Link to="/login"><Button>Login</Button></Link>
      <Link className={styles.button} to="/register"><Button>Register</Button></Link>
    </div>
  );
}

export default connect()(LandingPage);
