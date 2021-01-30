// 使用 JSDoc 可以获取 el-bot 及 mirai-ts 的代码提示
const { default: Bot } = require('el-bot')

/**
 * @param {Bot} ctx
 */
module.exports = async function (ctx) {
  const mirai = ctx.mirai

  mirai.on('message', (msg) => {
    console.log('on message', msg)
  })
}
