import base from './rollup.config.base'
const config = Object.assign({},base,{
    output:{
        file:'dist/web-monitor-sdk.common.js',
        format:'cjs'
    }
})

export default config