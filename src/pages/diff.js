import { Component } from 'react'
import style from 'react-gh-like-diff/lib/diff2html.min.css'
import {connect} from 'dva'
import {
    Form, Icon, Input, Button,Row
  } from 'antd';

import { ReactGhLikeDiff } from 'react-gh-like-diff';
const diffText = `diff --git a/package.json b/package.json
index 1914363..a35952e 100644
--- a/package.json
+++ b/package.json
@@ -15,2 +15,3 @@
     "react": "^16.7.0",
+    "react-diff-view": "^2.1.2",
     "react-dom": "^16.7.0"
diff --git a/src/layouts/index.js b/src/layouts/index.js
index 2220fb6..3471800 100644
--- a/src/layouts/index.js
+++ b/src/layouts/index.js
@@ -2,2 +2,3 @@
 import { Layout, Menu } from 'antd';
+import Link from 'umi/link'

@@ -16,5 +17,5 @@ function BasicLayout(props) {
       >
-        <Menu.Item key="1">nav 1</Menu.Item>
-        <Menu.Item key="2">nav 2</Menu.Item>
-        <Menu.Item key="3">nav 3</Menu.Item>
+        <Menu.Item key="1"><Link to="/">view</Link></Menu.Item>
+        <Menu.Item key="2"><Link to="/chart">chart</Link></Menu.Item>
+        <Menu.Item key="3"><Link to="/diff">diff</Link></Menu.Item>`
@connect(({git})=>({git: git}))
class Diff extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch} = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                dispatch({type:"git/fetchDiff",payload:values})
            }
        });
    }

    render() {
        const {diffText} = this.props.git
        const {
            getFieldDecorator
        } = this.props.form;
        return (
            <div >
                <Row>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('commit1', {
                                rules: [{ required: true, message: 'input commit1' }],
                            })(
                                <Input prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Commit" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('commit2', {
                                rules: [{ required: true, message: 'input commit2' }],
                            })(
                                <Input prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Commit" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Diff
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
                <Row style={{overflow:'scroll', height:'550px'}}>
                    {
                        diffText===undefined?(<div className={style}>
                            <ReactGhLikeDiff past="" current=""/>
                        </div>):(<div className={style}>
                            <ReactGhLikeDiff diffString={diffText}/>
                        </div>)
                    }
                </Row>
            </div>
        );
    }
}
const  GhDiff  = Form.create()(Diff)
export default GhDiff