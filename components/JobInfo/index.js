import React from 'react';
import Router from 'next/router';
import { Button, Typography } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import './styles.scss';

const { Title } = Typography;
function HeaderHome(props) {
  const pushRouter = (id) => {
    Router.push({
      pathname: `/home-page/job-detail-home`,
      query: { id },
    });
  };

  const { value } = props;
  return (
    <div className="row border">
      <div
        className="col-sm-3"
      >
        <img
          alt="example"
          style={{ objectFit: 'contain', width: '100%' }}
          src={get(value, 'company.avatar', [])}
        />
      </div>
      <div className="col-sm-9">
        <div className="row">
          <div className="col-sm-9">
            <Title level={3}>
              <div
                role="presentation"
                style={{ cursor: 'pointer' }}
                onClick={() => pushRouter(get(value, 'id', []))}
              >
                {get(value, 'job_role', [])}
              </div>
            </Title>
            <div style={{ color: '#68ba50' }}>
              <DollarOutlined /> You'll love it
            </div>
          </div>
          <div className="col-sm-3">
            <div
              style={{
                float: 'right',
                background: '#ff4d4f',
                color: 'white',
                fontSize: '8',
                padding: 6,
                borderRadius: '2px',
              }}
            >
              {' '}
              Hot Job{' '}
            </div>
          </div>
          <div className="col-sm-9">
            <div>
              {' '}
              Role: As a COBOL Software Engineer, you will collaborate
              proactively with functional analysts to translate business and
              integration requirements into...
            </div>
          </div>
          <div className="col-sm-3">
            <div style={{ float: 'right' }}>Hồ Chí Minh</div>
            <br />
            <div style={{ float: 'right' }}>Tân Bình</div>
          </div>
          <div className="col-sm-9">
            <Button style={{ marginRight: 5 }}>J2EE</Button>
            <Button style={{ marginRight: 5 }}>Java</Button>
            <Button>Spring</Button>
          </div>
          <div className="col-sm-3">
            <div style={{ float: 'right' }}>7 minutes ago</div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeaderHome;
