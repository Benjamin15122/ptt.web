
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  base: '/ptt.web/',
  publicPath: "/ptt.web/",
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'Pet Board',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/repos':{
      target:"https://api.github.com/",
      changeOrigin: true
    },
    '/server':{
      target: "http://localhost:9090/",
      changeOrigin: true
    }
  },
  routes: [{
    path: '/',
    component: '../layouts',
    routes: [{
      path: '/',
      component: './index'
    },{
      path: '/chart',
      component: './chart'
    },{
      path: '/diff',
      component: './diff'
    }]
  }]
}
