import React from 'react';
import { Button, Typography} from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { get, debounce } from 'lodash';
import './styles.scss';

const { Title } = Typography;
function HeaderHome(props) {
  const {value}=props;
  return (
    <div className="row border">
      <div className="col-sm-3">
        <img alt="example" style={{objectFit: "contain", width:'100%'}} src={get(value,'company.avatar',[])} />
      </div>
      <div className="col-sm-9">
        <div className="row">
        <div className="col-sm-9">
  <Title level={3}>{get(value,'job_role',[])}</Title>
            <div style={{ color: '#68ba50' }}><DollarOutlined /> You'll love it</div>
          </div>
          <div className="col-sm-3">
            <div style={{ float: 'right', background: '#ff4d4f', color: 'white', fontSize: '8', padding: 6 ,borderRadius:'2px'}}>  Hot Job  </div>
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