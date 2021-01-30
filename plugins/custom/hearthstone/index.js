const { default: Bot } = require('el-bot')
const { check, Message } = require('mirai-ts')
const { minions, heroes, skills } = require('@hbt-org/core')

const imageReg = {
  re: 'hs (\\S*)',
}
const jsonReg = {
  re: 'hsjson (\\S*)',
}

/**
 * @param {Bot} ctx
 */
module.exports = async function (ctx) {
  const mirai = ctx.mirai

  mirai.on('message', (msg) => {
    try {
      const match = check.match(msg.plain.toLowerCase(), imageReg)
      if (Array.isArray(match) && match[1]) {
        const minion = minions.filter(
          (v) =>
            v.name.indexOf(match[1]) > -1 ||
            (v.text && v.text.indexOf(match[1]) > -1)
        )
        if (minion) {
          return msg.reply(
            minion.map((v) =>
              Message.Image(
                '',
                `https://hs.chenyueban.com/hearthstone/images/minions/${v.id}.png`
              )
            )
          )
        }

        const hero = heroes.find((v) => v.name.indexOf(match[1]) > -1)
        const skill =
          hero.childrenIds &&
          hero.childrenIds.map((child) => skills.find((v) => v.dbfId === child))
        if (hero) {
          return msg.reply([
            Message.Image(
              '',
              `https://hs.chenyueban.com/hearthstone/images/heroes/${hero.id}.png`
            ),
            ...(skill || []).map((v) =>
              Message.Image(
                '',
                `https://hs.chenyueban.com/hearthstone/images/skills/${v.id}.png`
              )
            ),
          ])
        }
      }

      const jsonMatch = check.match(msg.plain.toLowerCase(), jsonReg)
      if (Array.isArray(jsonMatch) && jsonMatch[1]) {
        const minion = minions.find(
          (v) =>
            v.name.indexOf(jsonMatch[1]) > -1 ||
            (v.text && v.text.indexOf(jsonMatch[1]) > -1)
        )
        if (minion) {
          return msg.reply(JSON.stringify(minion, null, 2))
        }

        const hero = heroes.find((v) => v.name.indexOf(jsonMatch[1]) > -1)
        const skill =
          hero.childrenIds &&
          hero.childrenIds.map((child) => skills.find((v) => v.dbfId === child))
        if (hero) {
          return msg.reply(JSON.stringify({ hero, skill }, null, 2))
        }
      }
    } catch (e) {
      msg.reply(`我裂开了：`, e)
    }
  })
}
