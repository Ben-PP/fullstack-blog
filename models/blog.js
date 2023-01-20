const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)

// eslint-disable-next-line no-unused-vars
mongoose.connect(config.MONGODB_URI).then(result => {
  logger.info('Connected to MongoDB')
}).catch(error => {
  logger.error('Error while connecting to MongoDB: ', error.message)
})

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id,
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)