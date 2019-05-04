import { Component} from 'react'
import { Layout, Menu, Button } from 'antd'
import Link from 'umi/link'
import {connect} from 'dva'

import styles from './index.css'
import logo from '../assets/Thumbs.png'
import AceEditor from 'react-ace'
import c from '../assets/c.png'
import i from '../assets/i.png'
import m from '../assets/m.png'
import o from '../assets/o.png'
import p from '../assets/p.png'
import t from '../assets/t.png'
import u from '../assets/u.png'
import l from '../assets/l.png'
import g from '../assets/g.png'

import 'brace/mode/typescript'
import 'brace/theme/monokai'

const { Header, Content, Footer, Sider } = Layout


@connect(({git})=>({log: git.log}))
class BasicLayout extends Component {
  state = { collapsed: true };

  fetchLog = () => {
    const {dispatch} = this.props
    dispatch({type: 'git/fetchLog'})
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const {log} = this.props
    return (
      <Layout style={{position: 'fixed', width: '100%', height:'100%'}}>
        <Sider
          title="Commit Log for __out"
          width='420px'
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <img alt="logo" src={logo} className={styles.logo} />
          {this.state.collapsed?null:<AceEditor
            placeholder="Placeholder Text"
            mode="typescript"
            theme="monokai"
            name="blah2"
            onLoad={this.onLoad}
            onChange={this.onChange}
            fontSize={14}
            width='400px'
            height='80%'
            style={{marginTop: '24px',marginLeft:'10px'}}
            readOnly={true}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={log}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />}
          {this.state.collapsed?<div style={{marginTop: 64, marginLeft:10, color: '#fff'}}>
              <img alt="1" src={o} className={styles.character}/>
              <img alt="2" src={u} className={styles.character}/>
              <img alt="3" src={t} className={styles.character}/>
              <img alt="4" src={p} className={styles.character}/>
              <img alt="5" src={u} className={styles.character}/>
              <img alt="6" src={t} className={styles.character}/>
              <div className={styles.character}/>
              <img alt="7" src={c} className={styles.character}/>
              <img alt="8" src={o} className={styles.character}/>
              <img alt="9" src={m} className={styles.character}/>
              <img alt="10" src={m} className={styles.character}/>
              <img alt="11" src={i} className={styles.character}/>
              <img alt="12" src={t} className={styles.character}/>
              <div className={styles.character}/>
              <img alt="13" src={l} className={styles.character}/>
              <img alt="14" src={o} className={styles.character}/>
              <img alt="15" src={g} className={styles.character}/>
            </div>:<Button style={{marginRight:10, marginTop: 24, float: "right"}} type="primary" onClick={this.fetchLog}>Update</Button>}
        </Sider>
        <Layout style={{ marginBottom: '24px'}}>
          <Header style={{ zIndex: 1, width: '100%', height: '64px'}}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/">review</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/chart">chart</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/diff">diff</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 24px' }}>
            <div style={{ padding: 24, marginTop: 24,height: '100%'}}>{this.props.children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Performance Review Tool ©2019 Created by Benjamin15122
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
