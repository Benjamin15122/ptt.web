import {Component} from 'react'
import {parseDiff, Diff, Hunk} from 'react-diff-view';


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

class ExampleDiff extends Component{
    render(){
        const files = parseDiff(diffText);

        const renderFile = ({oldRevision, newRevision, type, hunks}) => (
            <Diff key={oldRevision + '-' + newRevision} viewType="split" diffType={type} hunks={hunks}>
                {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
            </Diff>
        );
    
        return (
            <div>
                {files.map(renderFile)}
            </div>
        );
    }
}
export default ExampleDiff