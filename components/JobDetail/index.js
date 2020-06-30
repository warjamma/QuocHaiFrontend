/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { Button, Typography, Tabs } from 'antd';
import {
  DollarOutlined,
  RightOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  FacebookOutlined,
  IeOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { get } from 'lodash';
import moment from 'moment';
import { getJobById } from '../../containers/job/actions';

import './styles.scss';

const { Title } = Typography;
const { TabPane } = Tabs;
function jobDetail(props) {
  const { referred, dispatch, profile } = props;
  const router = useRouter();
  // console.log(router);
  const { id } = router.query;
  // const job_id = id;
  // const pushRouter = (id) => {
  //     Router.push({
  //         pathname: `/superadmin/edit-cv`,
  //         query: { id, job_id },
  //     });
  // };
  const pushRouterCompanyDetail = (id) => {
    Router.push({
      pathname: `/home-page/company-detail-home`,
      query: { id },
    });
  };

  useEffect(() => {
    dispatch(getJobById({ id }));
  }, []);

  const toDataURL = (url) => {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };

  const download = async () => {
    const a = document.createElement('a');
    a.href = await toDataURL(get(referred, 'job_detail.data.job.jd_files'));
    a.download = 'JD.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const [status, setStatus] =useState(false);

  const callback = () => {
    setStatus(!status);
  };
  const hiddenTab=()=>{
    if(status){
      return { display: 'none'};
    }
  };
  const showTab=()=>{
    if(!status){
      return {display: 'none'};
    }
  }

  return (
    <div className="job-detail" style={{ padding: 32 }}>
      <div className="row">
        <div className="col-sm-4" style={{ padding: 0 , border: '1px solid #80808021', height:'300px', width:'300px'}}>
          {get(referred, 'job_detail.data.job.company.avatar') ? (
            <img
              style={{
                margin: 'auto',
                display: 'block',
                width: '100%',
                // height: 170,
                background: 'white',
                objectFit: 'contain',
                height:'100%'
              }}
              alt="example"
              src={get(referred, 'job_detail.data.job.company.avatar')}
            />
          ) : (
            ''
          )}
        </div>
        <div className="col-sm-8" style={{paddingLeft:'24px'}}>
          <div className="row">
            <Title level={3} className="col-sm-12">
              <div style={{ float: 'left' }}>[Tuyển]</div>
              {get(referred, 'job_detail.data.job.job_role', []).map(
                (value, key) => {
                  return (
                    <div key={key} style={{ float: 'left' }}>
                      {' '}
                      &nbsp;{value}&nbsp;
                    </div>
                  );
                }
              )}
            </Title>
            <div style={{ marginTop: 14, color: '#000000', lineHeight:'16px' }} className="col-sm-12">
              {get(referred, 'job_detail.data.job.job_levels', []).map(
                (value, key) => {
                  return (
                    <Button key={key} style={{ marginRight: 5,color: '#000000', fontSize:'12px' }}>
                      {value}
                    </Button>
                  );
                }
              )}
              {get(referred, 'job_detail.data.job.language', []).map(
                (value, key) => {
                  return (
                    <Button key={key} style={{ marginRight: 5,color: '#000000', fontSize:'12px'  }}>
                      {value}{' '}
                    </Button>
                  );
                }
              )}
            </div>
            <div className="col-sm-12 row" style={{ paddingTop: 18 , color: '#000000', lineHeight:'16px'}}>
              {get(referred, 'job_detail.data.job.locations', []).map(
                (value, key) => {
                  return (
                    <div
                      style={{ marginBottom: 6, fontSize:'12px' }}
                      key={key}
                      className="col-sm-3"
                    >
                      <img src="/Vector.png" alt="logo" /> {value}{' '}
                      <a style={{ color: '#68ba50', fontSize: '13px' }} />
                    </div>
                  );
                }
              )}
              <div style={{ marginBottom: 10, fontSize:'12px' }} className="col-sm-3">
              <span><img src="/calendar.png" alt="logo" /> </span>
                {moment(
                  get(referred, 'job_detail.data.job.updated_at', [])
                ).fromNow()}
              </div>
              <div style={{ marginBottom: 10, fontSize:'12px' }} className="col-sm-3">
              <img src="/money.png" alt="logo" />   Sign in to view
              </div>
            </div>
            <div className="col-sm-12" style={{ paddingTop: 24 }}>
              <Button
                style={{
                  float: 'left',
                  marginRight: 5,
                  width: '100%',
                  display: 'block',
                  height: 48,
                  background: '#00CDFB',
                  borderRadius: 8,
                  borderColor: '#00CDFB',
                }}
                type="primary"
                onClick={() => Router.push(`/home-page/upload-cv-home`)}
                block
              >
                Apply now
              </Button>
            </div>
           
          </div>
        </div>
        <div className="col-sm-4"> </div>
        <div className="col-sm-8" style={{ marginBottom: 0 , marginTop: '-43px'}}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Job details" key="1" />
                <TabPane tab="Company info" key="2" />
              </Tabs>
            </div>
        <div className="col-sm-12" style={hiddenTab()}>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
              lineHeight: '22px',
              color: '#000000',
            }}
          >
            About company
          </div>
          <div
            className="txtdescription"
            style={{ paddingTop: 16, paddingBottom: 16 }}
          >
            {get(referred, 'job_detail.data.job.company.about')}
          </div>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
              lineHeight: '22px',
              color: '#000000',
            }}
          >
            Job detail
          </div>
          <ul style={{ paddingTop: 16, paddingBottom: 16 }}>
            <li className="txtdescription">
              Ngày tạo:{' '}
              {moment(
                get(referred, 'job_detail.data.job.created_at', [])
              ).format('l')}
            </li>
            <li className="txtdescription">
              {' '}
              Tiền tệ: {get(referred, 'job_detail.data.job.currency', [])}
            </li>
            <li className="txtdescription">
              {' '}
              Max Lương : ${get(referred, 'job_detail.data.job.max_salary', [])}
            </li>
            <li className="txtdescription">
              {' '}
              Min Lương : ${get(referred, 'job_detail.data.job.min_salary', [])}
            </li>
            <li className="txtdescription">
              {' '}
              Trạng thái: {get(referred, 'job_detail.data.job.status', [])}
            </li>
            <li className="txtdescription">
              {' '}
              Kích cỡ team: {get(referred, 'job_detail.data.job.team_size', [])}
            </li>
            <li className="txtdescription">
              {' '}
              Số lượng yêu cầu:{' '}
              {get(referred, 'job_detail.data.job.vacancy_number', [])}
            </li>
            <li className="txtdescription">
              {' '}
              Phúc lợi:{' '}
              {get(referred, 'job_detail.data.job.vacancy_number', [])}
            </li>
          </ul>
    
        </div>
        <div className="col-sm-12" style={showTab()}>
        <div
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
              lineHeight: '22px',
              color: '#000000',
            }}
          >
            About company
          </div>
          <div
            className="txtdescription"
            style={{ paddingTop: 16, paddingBottom: 16 }}
          >
            {get(referred, 'job_detail.data.job.company.about')}
          </div>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
              lineHeight: '22px',
              color: '#000000',
            }}
          >
            Company benefit
          </div>
          <div
            className="txtdescription"
            style={{ paddingTop: 16, paddingBottom: 16 }}
          >
            {get(referred, 'job_detail.data.job.company.employee_benefit')}
          </div>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { referred, profile } = state;
  return { referred, profile };
}
export default connect(mapStateToProps, null)(jobDetail);
