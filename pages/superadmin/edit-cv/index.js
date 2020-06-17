/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Col, Row, Popconfirm, Form, Input, Button, Upload, message, Select } from 'antd';
import Router, { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { get, cloneDeep } from 'lodash';
import { getCandidateById, updateCandidate, deleteCandidate, uploadRequest ,referCandidateForCompany} from '../../../containers/referred/actions';
import './styles.scss';

const { Option } = Select;
const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

function EditCV(props) {
  const [form] = Form.useForm();
  const { dispatch, referred } = props;
  const router = useRouter();
  const { id, status, job_id } = router.query;
  const initForm = get(referred, `candidate_detail.data.candidate`, []);
  const [fileLink, setFileLink] = useState('');
  const [fileData, setFileData] = useState([]);
  const disabledBtn = () => {
    if (status === 'on_board') {
      return true;
    }
    return false;
  };
  const changeName =()=>{
    if(job_id && id ){
      return "Giới thiệu";
    }
    if ( id) {
      return "Cập nhật";
    }
  };
  const onFinish = async (value) => {
    const data = cloneDeep(value);
    if (fileLink) {
      data.cv = fileLink;
      data.availability = "none";
    }
    await dispatch(updateCandidate({ ...initForm, ...data }, id)).then(res => {
      if (res.status) {
        return message.success('Update candidate successfully').then(() =>
         {
          if(!job_id){
            Router.push('/superadmin/candidates_list');
           }
         }
         );
      }
      return message.error(res.error);
    });
    if(job_id){
      await dispatch(referCandidateForCompany( {job_id,id})).then(res => {
        if (res.status) {
          return message.success('Refer candidate for company succsessfully').then(() => Router.push('/superadmin/candidates_list'));
        }
        return message.error(res.error);
      });
    }
  };
  const onRequest = async (value) => {
    await dispatch(uploadRequest({ value })).then(res => {
      setFileLink(res.data);
      if (res.status) {
        return message.success('Upload request');
      }
      return message.error(res.error);
    });

  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onChange = e => {
    const fileList = [...e.fileList];
    const last = fileList.slice(-1);
    setFileData(last);
    if (e.file.status === 'done') {
      onRequest(e.file, e.file.name);
    }
  };

  useEffect(() => {
    dispatch(getCandidateById({ id })).then(res => {
      const { data, status } = res;
      if (status) {
        form.setFieldsValue(data.data.candidate);
      }
    });
  }, []);

  const handleDelete = async (candidateId) => {
    await dispatch(deleteCandidate(candidateId)).then(res => {
      if (res.status) {
        Router.push('/referrer/my-referred');
        return message.success('Delete candidate successfully');
      }
      return message.error(res.error);
    });
  };

  function cancel() {
    message.error('Cancel');
  }

  const setting = {
    onChange,
    onRemove: () => setFileLink(''),
    multiple: true,
    listType: "picture",
    accept: ".pdf",
    customRequest: dummyRequest
  };
  const bankName = ['TMCP NGOAI THUONG VIET NAM(VIETCOMBANK)', 'BUSAN', 'BANK OF INDIA', 'E.SUN', 'KY THUONG VN(TECHCOMBANK)', 'VIET NAM THUONG TIN(VIETBANK)', 'SHINHAN VN', 'HONGKONG AND SHANGHAI BANK (HSBC)', 'SAI GON THUONG TIN(SACOMBANK)', 'DBS BANK LTD CN HCM', 'UOB VIETNAM(UOB VN)', 'NNO&PT NONG THON VN(AGRIBANK', 'SAI GON(SCB)', 'DONG A(DONG A BANK', 'BAN VIET(CIET CAPITAL BANK', 'BUU DIEN LIEN VIET(LIEN VIET POST BANK)', 'SIAM COMMERCIAL BANK PUBLIC COMBANK', 'MAY BANK(HN)', 'BANK OF CHINA', 'JD MORGAN CHASE BANK', 'SUMITIMO MITSUI BANKING CORPORA..', 'BNP PARIBAS CHI NHANH HN', 'CONG THUONG VN(VIETTINBANK)', 'XUATNHAPKHAU(EXIMBANK)', 'SAI GON CONG THUONG(SAIGONBANK)', 'VIET NAM THINH VUONG(VP BANK)', 'QUAN DOI(MB)', 'DAI DUONG(OCEANBANK)', 'DAU KHI TOAN CAU(GPBANK)', 'DONG NAM A(SEABANK)', 'XANG DAU PETROLIMEX(PGBANK)', 'SAI GON- HA NOI(SHB)', 'TIEN PHONG(TIEN PHONG BANK)', 'CITI BANK HN', 'HANG HAI HN(MARITIME BANK)', 'QUOC DAN(NCB)', 'OVERSEA-CHINESE BANKING CORP LTD', 'CHINA CONSTRUCTION BANK CORPOR..', 'CIMB BANK', 'CHINH SACH XA HOI(VBSP)', 'XAY DUNG VN(CB BANK)', 'AN BINH(ABBANK)', 'A CHAY(ACB)', 'PHUONG DONG(OCB)', 'BAO VIET(BAO VIET BANK)', 'NAM A(NAM A BANK)', 'WOORI RANK VIET NAM', 'BANGKOK BANK HANOI', 'BANGKOK BANK HCM', 'CTI BANK', 'PUBLIC BANK VN', 'BPCE IOM', 'FIRST COMMERCIAL BANK HANOI', 'MIZUHO CORPORATE BANK LTD.,HN', 'BANK OF COMMUNICATIONS', 'DEUTSCHE BANK', 'CTBC (NHTM CHINATRUST)', 'NH SINOPAC', 'TAIPEI FUBONC.B', 'KIENLONG (KIEN LING BANK)', 'PHAT TRIEN TP HCM(HD BANK)', 'DAI CHUNG(PVCOMBANK)', 'BAC A(BAC A BANK)', 'VIET A (VIET A BANK)', 'PHAT TRIEN VIET NAM(VDB)', 'STANDARD CHARTERED BANK', 'HONG LEONG VN', 'BNP-PARIBAS CN HCM', 'HONG LEONG VN', 'BNP-PARIBAS CN HCM', 'MIZUHO CORPORATE BANK,LTD', 'INDUSTRIAL 7 COMMERCIAL BANK OF..', 'QUOC TE(VIB)', 'DAU TU VA PHAT TRIEN VN(BIDV)'];
  const language = 'Java, JavaScript, Reactjs, Vuejs, Angular, .Net, Nodejs, ObjectC, Swift, Kotlin, Python, PHP, MySQL, HTML/ CSS, SQL, C#, C++, Spring, AWS, Linux, Cocos2dx, Unity, ASP.NET, Docker, Ruby';
  const role = [['Account Management'], ['Administration'], ['Backend'], ['Branding'], ['Business Analyst'], ['Business Development'], ['CEO'], ['CFO'], ['CMO'], ['Consultant'], ['Content Creator'], ['COO'], ['CTO'], ['Customer Service'], ['Data Analyst'], ['Designer'], ['Developer'], ['DevOps'], ['Digital Marketing'], ['Engineering'], ['Finace/Accounting'], ['Frontend'], ['Fullstack'], ['Game'], ['General management'], ['HR'], ['HSE'], ['Import - Export'], ['Logistic'], ['maintenance'], ['Management'], ['Market Research'], ['marketing'], ['Merchandising'], ['Mobile'], ['Office Management'], ['Operation Management'], ['Operations'], ['Planning'], ['Product Management'], ['Production'], ['Project Management'], ['Public Relation'], ['QA/QC'], ['Quality Control'], ['Recruitment'], ['Research & Development'], ['Researcher'], ['Sales'], ['Scrum Master'], ['Software Architect'], ['Software Development'], ['Supply Chain'], ['Teacher'], ['Techical Sales'], ['Tester'], ['Traditional Marketing'], ['Trainer']];

  return (
    <div className="Edit-CV" style={{ backgroundColor: 'white' }}>
      <div className="header">
        <div>Hồ sơ ứng viên</div>
      </div>
      <div className="form-body">
        <Row gutter={[16, 16]}>
          {/* {get(referred, 'candidate_detail', [])} */}
          <Col span={18}>
            <iframe className="view-pdf" id="input" value={fileLink} src={fileLink === '' ? (get(referred, 'candidate_detail.data.candidate.cv', []) === '' ? (fileLink) : (get(referred, 'candidate_detail.data.candidate.cv', []))) : (fileLink)} /></Col>
          <Col span={6}>
            <Upload
              {...setting}
              fileList={fileData}
            >
              <Button disabled={disabledBtn()}>
                <UploadOutlined /> Click to upload
            </Button>
            </Upload>
            <Form
              form={form}
              {...layout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
                label="Tên ứng viên"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="ex: username" />
              </Form.Item>

              {/* <Form.Item
                label="Tên hồ sơ hiển thị"
                name="profile_title"
                rules={[{ required: true, message: 'Please input your Job Title!' }]}
              >
                <Input placeholder="ex: Job Title" />
              </Form.Item> */}

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input placeholder="ex: Email" />
              </Form.Item>
              <Form.Item
                    label="Vị trí"
                    hasFeedback
                    name="job_role"
                    rules={[{ required: true, message: 'This field is required !' }]}
                  >
                    <Select style={{ width: '100%' }} >
                      {
                        role.map(item => (
                          <Select.Option key={item} value={item}>{item}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                  {/* <Form.Item
                    label="Ngôn ngữ"
                    hasFeedback
                    // name="language"
                    rules={[{ required: true, message: 'This field is required !' }]}
                  >
                    <Select mode="tags" style={{ width: '100%' }} >
                      {
                        language.split(', ')
                          .map(item => (
                            <Select.Option key={item} value={item}>{item}</Select.Option>
                          ))
                      }
                    </Select>
                  </Form.Item> */}
                  <Form.Item
                    label="Cấp độ"
                    hasFeedback
                    name="job_level"
                    rules={[{ required: true, message: 'This field is required !' }]}
                  >
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                    >
                      {
                        'C-level, Department head, Director, Junior, Manager, Middle, Senior, Specialist, Team Leader'.split(', ')
                          .map(item => (
                            <Select.Option key={item} value={item}>{item}</Select.Option>
                          ))
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%', marginRight: 16 }}
                    label="Địa điểm"
                    hasFeedback
                    name="locations"
                    rules={[{ required: true, message: 'This field is required !' }]}
                  >
                    <Select mode="tags" style={{ width: '100%' }} >
                      {
                        ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng']
                          .map(item => (
                            <Select.Option key={item} value={item}>{item}</Select.Option>
                          ))
                      }
                    </Select>
                  </Form.Item>

              <Form.Item
                label="Điện thoại ứng viên"
                name="phone_number"
              >
                <Input placeholder="ex: Phone Number" />
              </Form.Item>
              <Form.Item
                name='bank_name'
                label="Tên ngân hàng"
                rules={[{ required: true, message: 'Please input your bank name!' }]}
              >
                <Select
                  allowClear
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Bank name"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {bankName.map((d) => (
                    <Option value={d} key={d}>{d}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Số tài khoản"
                name="bank_number"
                rules={[{ required: true, message: 'Please input your bank number!' }]}
              >
                <Input placeholder="ex: Bank Number" />
              </Form.Item>
              <Form.Item
                label="Chủ tài khoản"
                name="bank_user"
                rules={[{ required: true, message: 'Please input your bank user!' }]}
              >
                <Input placeholder="ex: Bank User" />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary"  htmlType="submit" disabled={disabledBtn()}>
                  {changeName()}
              </Button>

                <Popconfirm
                  title="Are you sure delete title?"
                  onConfirm={() => handleDelete(id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  {/* <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
                  Xóa
                </Button> */}
                </Popconfirm>
                <Button className="btn-cance" onClick={() => Router.push('/superadmin/candidates_list')} htmlType="button"  >
                  Hủy
              </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(EditCV);