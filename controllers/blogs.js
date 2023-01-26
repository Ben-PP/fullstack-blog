const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('author', { username: 1, name: 1 })
  logger.info('json response sent: ',blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
    author: user._id
  })
  const result = await blog.save()
  logger.info('blog saved: ', result)
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  await Blog.updateOne({ _id: request.params.id }, request.body, {
    runValidators: true
  })
  // TODO Return json?
  response.status(204).end()
})

module.exports = blogsRouter