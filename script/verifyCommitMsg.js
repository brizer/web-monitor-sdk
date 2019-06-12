const color = require('chalk');
const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?$)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50})/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${color.bgRed(' ERROR ')} ${color.red(`invalid commit message format.`)}\n\n` +
    color.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
    `    ${color.green(`feat(compiler): add 'comments' option`)}\n` +
    `    ${color.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
    color.red(`  See .github/COMMIT_CONVENTION.md for more details.\n`) +
    color.red(`  You can also use ${color.cyan(`npm run commit`)} to interactively generate a commit message.\n`)
  )
  process.exit(1)
}