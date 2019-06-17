import * as webMonitor from 'web-monitor-sdk'

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