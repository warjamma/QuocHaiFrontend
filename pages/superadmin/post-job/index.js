/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import {
  Button,
  Row,
  Col,
  Typography,
  Select,
  Form,
  message,
  Input,
} from 'antd';
import { get, cloneDeep } from 'lodash';
import {
  FacebookOutlined,
  IeOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { getCompanyById } from '../../../containers/referred/actions';
import { purchasePostJob } from '../../../containers/company/action';
import './styles.scss';

const { Title } = Typography;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 7 },
};
function jobDetail(props) {
  const router = useRouter();
  const { id } = router.query;

  const { dispatch, referred, profile } = props;
  useEffect(() => {
    dispatch(getCompanyById({ id }));
  }, []);

  //   const pushRouter = (name) => {
  //     Router.push({
  //       pathname: `/job-list`,
  //       query: { name },
  //     });
  //   };
  const onFinish = async (value) => {
    const values= {
      prioritize_slot: value.data.split(", ")[0],
      slot: value.data.split(", ")[1]
    };

    const data2 = cloneDeep(values);
    dispatch(purchasePostJob(data2, id)).then((res) => {
      if (res.status) {
        return message
          .success('Set post job successfully')
          .then(() => Router.push(`/superadmin/company-list`));
      }
      return message.error(res.error);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="company-profile">
      <div className="header" style={{ backgroud: '#fff', fontWeight: 'bold' }}>
        Quản lý đăng tuyển
      </div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <div className="content" style={{ padding: 18, height: 300 }}>
            <Row className="row-detail" style={{ paddingTop: 24 }}>
              <Col span={12}>
                <span className="bold-span" style={{ fontWeight: 'bold' }}>
                  Số lượt đã đăng tuyển :{' '}
                </span>
              </Col>
              <Col span={12}>
                {get(
                  referred,
                  'company_detail.data.company.purchas_job_proritize_available_to_post'
                ) -
                get(
                  referred,
                  'company_detail.data.company.purchas_job_available_to_post'
                )
                  ? get(
                      referred,
                      'company_detail.data.company.purchas_job_proritize_available_to_post'
                    ) -
                    get(
                      referred,
                      'company_detail.data.company.purchas_job_available_to_post'
                    )
                  : 0}{' '}
                LƯỢT ƯU TIÊN -{' '}
                {get(
                  referred,
                  'company_detail.data.company.job_proritize_available_to_post'
                ) -
                get(
                  referred,
                  'company_detail.data.company.job_available_to_post'
                )
                  ? get(
                      referred,
                      'company_detail.data.company.job_proritize_available_to_post'
                    ) -
                    get(
                      referred,
                      'company_detail.data.company.job_available_to_post'
                    )
                  : 0}{' '}
                LƯỢT THƯỜNG
              </Col>
            </Row>
            <Row className="row-detail" style={{ paddingTop: 24 }}>
              <Col span={12}>
                <span className="bold-span" style={{ fontWeight: 'bold' }}>
                  Lượt đăng tuyển ưu tiên đã mua:
                </span>
              </Col>
              <Col span={12}>
                {get(
                  referred,
                  'company_detail.data.company.purchas_job_proritize_available_to_post'
                )
                  ? get(
                      referred,
                      'company_detail.data.company.purchas_job_proritize_available_to_post'
                    )
                  : 0}{' '}
                LƯỢT
              </Col>
            </Row>
            <Row className="row-detail" style={{ paddingTop: 24 }}>
              <Col span={12}>
                <span className="bold-span" style={{ fontWeight: 'bold' }}>
                  Lượt đăng tuyển ưu tiên còn lại:{' '}
                </span>
              </Col>
              <Col span={12}>
                {get(
                  referred,
                  'company_detail.data.company.purchas_job_available_to_post'
                )
                  ? get(
                      referred,
                      'company_detail.data.company.purchas_job_available_to_post'
                    )
                  : 0}{' '}
                LƯỢT
              </Col>
            </Row>
            <Row className="row-detail" style={{ paddingTop: 24 }}>
              <Col span={12}>
                <span className="bold-span" style={{ fontWeight: 'bold' }}>
                  Lượt đăng tuyển thường đã mua:
                </span>
              </Col>
              <Col span={12}>
                {get(
                  referred,
                  'company_detail.data.company.job_proritize_available_to_post'
                )
                  ? get(
                      referred,
                      'company_detail.data.company.job_proritize_available_to_post'
                    )
                  : 0}{' '}
                LƯỢT
              </Col>
            </Row>
            <Row className="row-detail" style={{ paddingTop: 24 }}>
              <Col span={12}>
                <span className="bold-span" style={{ fontWeight: 'bold' }}>
                  Lượt đăng tuyển thường còn lại:{' '}
                </span>
              </Col>
              <Col span={12}>
                {get(
                  referred,
                  'company_detail.data.company.job_available_to_post'
                )
                  ? get(
                      referred,
                      'company_detail.data.company.job_available_to_post'
                    )
                  : 0}{' '}
                LƯỢT
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={16}>
          <div className="content" style={{ height: 300 }}>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <img
                  style={{
                    padding: 'auto',
                    margin: 'auto',
                    display: 'block',
                    height: 250,
                    width: 250,
                    objectFit: 'scale-down',
                  }}
                  alt="example"
                  src={get(referred, 'company_detail.data.company.avatar', [])}
                />
              </Col>
              <Col span={13}>
                <div style={{ background: 'white', padding: 20 }}>
                  <Title level={3}>
                    {get(referred, 'company_detail.data.company.name', [])}
                  </Title>
                  <div>
                    {get(referred, 'company_detail.data.company.address', [])}
                  </div>
                  <div>
                    <FacebookOutlined />
                    &nbsp;
                    <a
                      href={get(
                        referred,
                        'company_detail.data.company.facebook'
                      )}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {get(referred, 'company_detail.data.company.facebook')}
                    </a>
                  </div>
                  <div>
                    <MailOutlined />
                    &nbsp;
                    <a>
                      {get(referred, 'company_detail.data.company.email_cc')}
                    </a>
                  </div>
                  <div>
                    <IeOutlined />
                    &nbsp;
                    <a
                      href={get(
                        referred,
                        'company_detail.data.company.career_site'
                      )}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {get(referred, 'company_detail.data.company.career_site')}
                    </a>
                  </div>
                  <div>
                    <PhoneOutlined />
                    &nbsp;
                    <a>
                      {get(
                        referred,
                        'company_detail.data.company.phone_number'
                      )}
                    </a>
                  </div>
                </div>
              </Col>
              <Col span={5} />
            </Row>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div style={{ background: 'white' }}>
            <div style={{ background: 'white', padding: 20 }}>
              <Title level={3}>
              <SettingOutlined /> Cấp lượt đăng tuyển
              </Title>
              <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Form.Item
                  hasFeedback
                  name="data"
                  rules={[
                    { required: true, message: 'This field is required !' },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder="ex: Chọn kiểu đăng tuyển"
                  >
                    <Select.Option value="true, 3">Gói 1:  3 lượt đăng tuyển ưu tiên</Select.Option>
                    <Select.Option value="true, 6">Gói 2:  6 lượt đăng tuyển ưu tiên</Select.Option>
                    <Select.Option value="false, 3">Gói 3:  3 lượt đăng tuyển thường</Select.Option>
                    <Select.Option value="false, 5">Gói 4:  5 lượt đăng tuyển thường</Select.Option>
                  </Select>
                </Form.Item>
                {/* <Form.Item
                  label="Số lượng lượt đăng tuyển"
                  name="slot"
                  rules={[
                    { required: true, message: 'This field is required !' },
                  ]}
                >
                  <Input placeholder="ex: Số lượng" />
                </Form.Item> */}
                <Form.Item>
                  <Button
                    type="danger"
                    style={{ width: 100, marginLeft: 20 }}
                    htmlType="submit"
                  >
                    Cập nhật
                  </Button>
                  <Button
                    type="default"
                    onClick={() => Router.push('/superadmin/company-list')}
                    style={{ width: 100, marginLeft: 20 }}
                  >
                    Hủy
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
function mapStateToProps(state) {
  // console.log(state);
  const { referred, profile } = state;
  return { referred, profile };
}
export default connect(mapStateToProps, null)(jobDetail);
