require("dotenv").config();
const { resolve } = require("path");
const { utils } = require("el-bot");

module.exports = {
  qq: parseInt(process.env.BOT_QQ),
  // 你可以直接解析 mirai-api-http 的配置
  setting: utils.config.parse(
    resolve(__dirname, "../mirai/plugins/MiraiAPIHTTP/setting.yml")
  ),
  // setting: {
  //   enableWebsocket: false
  // },
  db: {
    // 默认关闭
    enable: false,
    uri: process.env.BOT_DB_URI,
    analytics: true,
  },
  config: utils.config.parse(resolve(__dirname, "./index.yml")),
  // webhook
  webhook: {
    enable: true,
    path: "/webhook",
    port: 7777,
    secret: "el-psy-congroo",
  },
};
