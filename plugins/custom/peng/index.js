const { default: Bot } = require('el-bot')
const { check, Message } = require('mirai-ts')
const dayjs = require('dayjs')

const Model = require('./model')

const reg = {
  re: '砰砰砰|嘭嘭嘭|pengpengpeng',
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
            return msg.reply(`@${target.nickname} ${target.count}`)
          }
          // 如果不是今天 更新并返回数量
          const result = await Model.updateOne(
            { id },
            { count: target.count + 1 }
          )
          console.log(result)
          return msg.reply(`@${target.nickname} ${target.count + 1}`)
        }
        // 不存在记录 新建一个
        const peng = new Model({
          id,
          nickname,
        })
        await peng.save()
        return msg.reply(`@${target.nickname} ${peng.count}`)
      }
    } catch (e) {
      msg.reply(`我裂开了`)
    }
  })
}
