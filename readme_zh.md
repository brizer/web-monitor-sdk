<h1 align="center">web-monitor-sdk 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/brizer/web-monitor-sdk#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/brizer/web-monitor-sdk/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a>
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> web monitor 的sdk，一个简易的Web性能、异常数据收集器

### 🏠 [主页](https://github.com/brizer/web-monitor-sdk#readme)

[English Documents](./readme.md)

## 安装

```sh
npm install web-monitor-sdk
```

## 使用

### 用umd的方式

这里是 [例子](./examples/browser/index.html)

直接引入 `dist/web-monitor-sdk.min.js`:
``` html
<script src="../../dist/web-monitor-sdk.min.js"></script>
```
然后调用init
``` js
window.WebMonitorSDK.init({ 
    debug: true,
    sendError: false,
    outtime:3000,
    blacklistUrls:[
      // 'localhost:8080/examples'
    ],
    data:{
      webUser:{
        id:12345
      }
    }
 },(data)=>{
     fetch('http://demo/api',{
        method:'POST',
         headers: {'Content-Type': 'application/json'},
         body:JSON.stringify(data)
     })
 });
```

### 使用CommonJs风格

There is [example](./examples/common/index.js)

``` js
// import * as webMonitor from 'web-monitor-sdk'
const webMonitor = require('web-monitor-sdk')

webMonitor.init({
    debug:true,
    sendError: false,
    outtime:2000
},data=>{
    fetch('http://demo/api',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)  
    })
})
```

## API

``` js
WebMonitor.init(Options,fn)
```

### fn
> Function

数据收集后的回调函数，我们只负责收集数据，不负责上报，所以你需要自己组装上报数据的逻辑。

### Options

#### `debug` 

是否开启调试功能如日志
 
(默认为false)

#### `blacklistUrls`
> Array<string | RegExp>

一组正则匹配的黑名单，不用上报
(默认所有均上报)

#### `outtime`
> number

延迟上报的时间，为了确保异步数据的正常加载。单位是毫秒。
（默认是1000）

#### `sendPage`
> boolean

是否上报页面性能数据。
（默认是true）

#### `sendError`
> boolean

是否上报页面错误
（默认是true）

#### `sendUnhandledRejection`
> boolean

是否上报在chrome49+才能捕获到的unhandledrejection异常。
（默认是true）

#### `sendUnloadError`
> boolean 

是否上报加载资源失败的错误
（默认是true）

#### `data`
> object

额外发送给服务器的数据
（默认是undefined）

## 作者

👤 **Brizer &lt;brizer@163.com&gt;**

* Github: [@brizer](https://github.com/brizer)
* 知乎: [@brizer](https://www.zhihu.com/people/liu-fang-88-94/activities)

## [更新日志](./CHANGELOG.md)


## 🤝 贡献

Contributions, issues 和 feature 都欢迎<br />Feel free to check [issues page](https://github.com/brizer/web-monitor-sdk/issues).

## 支持

如果这个项目帮助到了你，麻烦给个⭐️
## 📝 协议

Copyright © 2019 [Brizer &lt;brizer@163.com&gt;](https://github.com/brizer).<br />
This project is MIT licensed.

