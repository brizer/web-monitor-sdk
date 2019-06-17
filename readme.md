<h1 align="center">Welcome to web-monitor-sdk 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/brizer/web-monitor-sdk#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/brizer/web-monitor-sdk/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/brizer/web-monitor-sdk/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> SDK for web monitor, a simple web data collection tool for performance, exceptions, etc.

### 🏠 [Homepage](https://github.com/brizer/web-monitor-sdk#readme)

## Install

```sh
npm install web-monitor-sdk
```

## Usage

### Use it in UMD style

There is [example](./examples/browser/index.html)

import `dist/web-monitor-sdk.min.js`:
``` html
<script src="../../dist/web-monitor-sdk.min.js"></script>
```
and call init:
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

### Use it in CommonJS style

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

## Options

### `debug` 

Enable debug funtionality such as Logger, in the SDK.
 
(Defaults to false, not required)

### `blacklistUrls`
> Array<string | RegExp>

A pattern for URLs which should not be report. 
(By default, all urls will be sent)

### `outtime`
> number

Delay time to report, ensure the loading of asynchronous data.
The unit is milliseconds.
(Defaults to 1000)

### `sendPage`
> boolean

Whether to report page performance data.
(Defaults to true)

### `sendError`
> boolean

Whether to report error.
(Defaults to true)

### `sendUnhandledRejection`
> boolean

Whether to report unhandledrejection error in promise in Chrome 49+.
(Defaults to true)

### `sendUnloadError`
> boolean 

Whether to report unload error.
(Defaults to true)

### `data`
> object

Additional data, to send to server together.
(Default is undefined)

## Author

👤 **Brizer &lt;brizer@163.com&gt;**

* Github: [@brizer](https://github.com/brizer)
* Zhihu: [@brizer](https://www.zhihu.com/people/liu-fang-88-94/activities)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/brizer/web-monitor-sdk/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Brizer &lt;brizer@163.com&gt;](https://github.com/brizer).<br />
This project is MIT licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_