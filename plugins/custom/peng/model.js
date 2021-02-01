const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(`${process.env.BOT_DB_URI}/${process.env.MONGO_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let counter = 1
const ModelSchema = new Schema({
  id: Number,
  nickname: String,
  count: {
    type: Number,
    default: () => counter++,
  },
  timestamp: {
    type: Number,
    default: () => new Date().getTime(),
  },
})

module.exports = mongoose.model('Peng', ModelSchema)
