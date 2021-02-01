const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(`${process.env.BOT_DB_URI}/${process.env.MONGO_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const ModelSchema = new Schema({
  id: Number,
  nickname: String,
  value: {
    type: Number,
  },
  timestamp: {
    type: Number,
    default: () => new Date().getTime(),
  },
})

module.exports = mongoose.model('JRRP', ModelSchema)
