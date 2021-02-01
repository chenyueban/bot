const { default: Bot } = require('el-bot')
const { check, Message } = require('mirai-ts')
const axios = require('axios')

const reg = {
  re: '上菜 (\\S*)',
}

/**
 * @param {Bot} ctx
 */
module.exports = async function (ctx) {
  const mirai = ctx.mirai

  mirai.on('message', async (msg) => {
    try {
      const match = check.match(msg.plain.toLowerCase(), reg)
      if (Array.isArray(match) && match[1]) {
        const { data } = await axios.get(`https://way.jd.com/jisuapi/search`, {
          params: {
            keyword: match[1],
            num: 1,
            appkey: 'c67858e0238d93dcd12b6a73b8e0eaf0',
          },
        })
        if (data.code === '10000' && data.result.result) {
          const list = data.result.result.list[0]
          if (list) {
            const { name, content, pic, material, process } = list
            const picture = Message.Image(null, pic)
            msg.reply([picture])
            const template = `${name}
${content}
配料：
${material.map((v) => `${v.mname} ${v.amount}`).join('\n')}
做法：
${process.map((v, i) => `${i + 1}、${v.pcontent}`).join('\n')}`
            msg.reply(template)
          }
        }
      }
    } catch (e) {
      msg.reply(`我裂开了`)
    }
  })
}
