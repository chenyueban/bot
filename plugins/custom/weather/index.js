const { default: Bot } = require('el-bot')
const { check } = require('mirai-ts')
const axios = require('axios')
const dayjs = require('dayjs')

const reg = {
  re: '天气 (\\S*)',
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
        const { data } = await axios.get(`https://way.jd.com/jisuapi/weather`, {
          params: {
            city: match[1],
            appkey: 'c67858e0238d93dcd12b6a73b8e0eaf0',
          },
        })
        if (data.code === '10000' && data.result.result) {
          const {
            date,
            week,
            city,
            weather,
            winddirect,
            windpower,
            index,
          } = data.result.result
          const template = `今天是 ${dayjs(date).format(
            'YYYY年M月D日'
          )} ${week} ${city}天气 ${weather} ${winddirect} ${windpower}
${index.map((v) => `${v.iname}：${v.ivalue} - ${v.detail}`).join('\n')}`
          msg.reply(template)
        }
      }
    } catch (e) {
      msg.reply(`我裂开了`)
    }
  })
}
