import React ,{ useState }from 'react';
import { Row, Col, Menu} from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Router from 'next/router';
import Link from 'next/link';
import './styles.scss';

function HeaderHome() {
  const [current, setCurrent] = useState('');
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Row className="menu">
      <Col span={3} />
      {/* <Col span={3} >
            <img src="https://www.rockship.co/images/rs-logo-img.png" alt="#" />
          </Col> */}
      <Col span={9} >
        <a href="/"><img className="name-logo" src="https://www.rockship.co/images/rs-logo-text.png" alt="#" /></a>
      </Col>
      <Col span={9} className="task-bar">
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="home" icon={<MailOutlined />}>
            <Link href="/">
              <a href="/" style={{ color: 'white' }}>All jobs</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="it-companies" icon={<MailOutlined />}>
            IT Companies
        </Menu.Item>
          {/* <Menu.Item key="blog" icon={<MailOutlined />}>
            <a href="/blog" style={{ color: 'white' }}>Blog</a>
          </Menu.Item> */}
          <Menu.Item key="upload-cv" icon={<MailOutlined />}>
            <a href="/upload-home" style={{ color: 'white' }}>Upload cv</a>
          </Menu.Item>
          <Menu.Item key="login" icon={<MailOutlined />}>
            <a href="/login" style={{ color: 'white' }}>Đăng nhập</a>
          </Menu.Item>
        </Menu>
      </Col>
      {/* <Col span={3} /> */}
      <Col span={3} />
    </Row>
  );
}

export default HeaderHome;