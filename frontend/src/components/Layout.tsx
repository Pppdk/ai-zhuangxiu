import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  FileTextOutlined,
  LayoutOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = AntLayout;

const Layout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: '/needs',
      icon: <FileTextOutlined />,
      label: <Link to="/needs">装修需求</Link>,
    },
    {
      key: '/designs',
      icon: <LayoutOutlined />,
      label: <Link to="/designs">设计方案</Link>,
    },
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ float: 'left', margin: '0 24px', fontSize: '18px', lineHeight: '64px' }}>
          装修指南
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[currentPath]}
          items={menuItems}
          style={{ lineHeight: '64px' }}
        />
      </Header>

      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ padding: '24px', minHeight: 360, background: '#fff', borderRadius: '2px' }}>
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        装修指南 {new Date().getFullYear()} Created by Codeium
      </Footer>
    </AntLayout>
  );
};

export default Layout;
