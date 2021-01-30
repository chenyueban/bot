const Bot = require('el-bot')
const el = require('../el')

const bot = new Bot(el)

bot.start((msg) => {
  console.log(msg)
})
