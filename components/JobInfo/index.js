import React from 'react';
import { Button, Typography} from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import Router from 'next/router';
import Link from 'next/link';
import './styles.scss';

const { Title } = Typography;
function HeaderHome() {
  return (
    <div className="row border">
      <div className="col-sm-3">
        <img alt="example" src="https://cdn.itviec.com/employers/dxc-vietnam/logo/s65/U7GERVChzwPaBYXec1bQgPmP/DXC%20logo-icon.png" />
      </div>
      <div className="col-sm-9">
        <div className="row">
        <div className="col-sm-9">
            <Title level={3}>Why You'll Love Working Here</Title>
            <div style={{ color: '#68ba50' }}><DollarOutlined /> You'll love it</div>
          </div>
          <div className="col-sm-3">
            <div style={{ float: 'right', background: '#ff9e34', color: 'white', fontSize: '8', padding: 3 }}>  Ant Design  </div>
          </div>
          <div className="col-sm-9">
            <div > Role: As a COBOL Software Engineer, you will collaborate proactively with functional analysts to translate business and integration requirements into...</div>
          </div>
          <div className="col-sm-3" >
            <div style={{ float: 'right' }}>Hồ Chí Minh</div><br />
            <div style={{ float: 'right' }}>Tân Bình</div>
          </div>
          <div className="col-sm-9">
            <Button style={{ marginRight: 5 }}>J2EE</Button>
            <Button style={{ marginRight: 5 }}>Java</Button>
            <Button>Spring</Button>
          </div>
          <div className="col-sm-3" >
            <div style={{ float: 'right' }}>7 minutes ago</div><br />
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeaderHome;