const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  logger.info('json response sent: ',blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const result = await blog.save()
  logger.info('saved: ', result)
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