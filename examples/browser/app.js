window.onerror = ()=>{
    console.warn('old error')
}

window.WebMonitorSDK.init({ debug: true });

/**
 * test hub
 */
// window.WebMonitorSDK.hub.on('error',(msg)=>{console.log(msg)})
// window.WebMonitorSDK.hub.on('error',(handle)=>{
//     if(typeof handle === 'function'){
//         handle()
//     }
// })

// window.WebMonitorSDK.hub.emit('error','message')
// window.WebMonitorSDK.hub.emit('error',()=>{console.log('xixi')})

/**
 * test close sdk
 */
// window.WebMonitorSDK.close()
/**
 * test window.onerror catch
 */
window.WebMonitorSDK.hub.on('CATEH_ERROR',(data)=>{
    console.warn(data)
})
try{
catcherror
}catch(err){
}

setTimeout(()=>{
    notcatcherrorsetimoeout
},2000)


notcatcherror


