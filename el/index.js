require('dotenv').config()
const { resolve } = require('path')
const { utils } = require('el-bot')

module.exports = {
  qq: parseInt(process.env.BOT_QQ),
  setting: utils.config.parse(
    resolve(__dirname, '../mcl/config/net.mamoe.mirai-api-http/setting.yml')
  ),
  db: {
    // 默认关闭
    enable: true,
    uri: process.env.BOT_DB_URI,
    analytics: true,
  },
  config: utils.config.parse(resolve(__dirname, './index.yml')),
  // webhook
  webhook: {
    enable: false,
    path: '/webhook',
    port: 7777,
    secret: 'INITKEYaOvRG7hg',
  },
}
