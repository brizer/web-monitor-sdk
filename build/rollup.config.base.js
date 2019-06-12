import typescript from 'rollup-plugin-typescript2'
import license from 'rollup-plugin-license'
import pkg from '../package.json'

const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD', { encoding: 'utf-8' })
  .trim();

export default {
    input: 'src/index.ts',
    plugins:[
        typescript({
            typescript:require('typescript')
        }),
        license({
            banner:`Copyright web-monitor-sdk <%= pkg.version %> (${commitHash}) | https://github.com/brizer/web-monitor-sdk`
        })
    ],
    watch: {
        include:'src/**'
    }
}