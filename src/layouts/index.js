// import styles from './index.css';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function BasicLayout(props) {
  return (
  <Layout style={{position: 'fixed', width: '100%', height:'100%'}}>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <div style={{ background: '#fff', padding: 24, marginTop: 24,height: '100%'}}>{props.children}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
  );
}

export default BasicLayout;
