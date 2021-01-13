# Trustoracle-Web
开发文档


## 1、开发环境搭建

1.1 依赖环境

| 环境     | 版本              |
| ------   | ---------------  |
| nodejs   | 1.8及以上         |

nodejs下载地址：https://nodejs.org/en/download/

### 1.2 安装依赖包

1.2.1 拉取代码

> 执行命令：

    git clone https://github.com/WeBankBlockchain/Trustoracle-Web.git

将代码放在你的工作目录，例如：D：\project

> 切换到项目目录：

    cd D:\project\Trustoracle-Web

> 使用命令：

    npm install

下载依赖包

1.3 启动项目

> 在项目根目录使用命令：

    npm run dev

> 控制台出现：

```
Listening at http ://localhost:3006
```

> 在浏览器输入"http ://localhost:3006"。

> 默认端口是3006，可在config文件夹index.js中修改。

> 修改跨域配置，在config文件夹index.js中，在dev中的proxyTable修改，修改地址即可,请求的url路径必须加上前缀。

```js
dev: {
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 3006, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
        '/oracle':{
            target:'http://127.0.0.1:5021/',  //在此修改跨域地址，这里是服务ip和端口，且可以访问
            changeOrigin:true,
            pathRewrite:{
                '^/oracle':''
                }
            },
        },
    },
```

1.4 模拟数据

模拟数据在mock.js中，在开发联调前使用，使用中注意mock.js的url和axios请求的url要保持一致。`包括get拼接在url上面的参数`

注意：开发时将mian.js中加上mock.js引用，打包时需要注释mock.js的引用。

> axios请求地址：

    overview请求url： /Oracle-Service/xx/xx/

> mock.js地址：

```js
Mock.mock('/Oracle-Service/xx/xx/',function (req,res) {     //url和上面axios相同
    return {
        "code":0,
        "message":"success",
        "data":{

        }
    }
});
```

> main.js引用mock.js：

```js.github
Vue.use(ElementUI);
// require('./mock')    //直接require引入，开发时放开注释，打包时注释
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```


## 2、项目打包部署

2.1 项目打包

> 切换到项目根目录，执行命令：

    npm run build

> 进行打包，生成打包文件dist，在项目根目录下。

2.2 部署

nginx配置

```Nginx
    upstream oracle_server{
        server 10.0.0.1:5021; # 服务ip和端口
    }
    server {
        listen       5020 default_server; # 前端端口（端口需要开通策略且不能被占用）
        server_name  0.0.0.0;           # 服务器ip，也可配置为域名
        location / {
                root   /data/Oracle-Web/dist;   # 前端文件路径(文件需要有权限访问)
                index  index.html index.htm;
                try_files $uri $uri/ /index.html =404;
        }

        include /etc/nginx/default.d/*.conf;

        location /oracle {
                    proxy_pass    http://oracle_server/;
                    proxy_set_header                Host                         $host;
                    proxy_set_header                X-Real-IP                 $remote_addr;
                    proxy_set_header                X-Forwarded-For         $proxy_add_x_forwarded_for;
        }
    }
```
