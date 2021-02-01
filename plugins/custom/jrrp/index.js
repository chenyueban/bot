const { default: Bot } = require('el-bot')
const { check, Message } = require('mirai-ts')
const dayjs = require('dayjs')

const Model = require('./model')

const reg = {
  re: '今日人品',
}

function random() {
  return (Math.random() * 100).toFixed(2)
}

/**
 * @param {Bot} ctx
 */
module.exports = async function (ctx) {
  const mirai = ctx.mirai

  mirai.on('message', async (msg) => {
    try {
      const match = check.match(msg.plain.toLowerCase(), reg)
      if (Array.isArray(match)) {
        const { id, nickname } = msg.sender
        const target = await Model.findOne({ id }).exec()
        if (target) {
          // 如果有存在的记录

          // 如果数据库中存的昵称与当前消息的昵称不同 (改名了)
          if (target.nickname !== nickname) {
            await Model.updateOne({ id }, { nickname })
          }

          // 判断时间戳是否为今天
          if (dayjs(target.timestamp).isSame(dayjs(), 'day')) {
            // 如果是今天直接返回数量
            return msg.reply(`今日人品 ${target.value}% 哦~`, true)
          }
          // 如果不是今天 更新并返回数量
          const value = random()
          await Model.updateOne({ id }, { value })
          return msg.reply(`今日人品 ${value}% 哦~`, true)
        }
        // 不存在记录 新建一个
        const value = random()
        const jrrp = new Model({
          id,
          nickname,
          value,
        })
        await jrrp.save()
        return msg.reply(`今日人品 ${value}% 哦~`, true)
      }
    } catch (e) {
      msg.reply(`我裂开了`)
    }
  })
}
