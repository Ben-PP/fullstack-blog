const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('get /api/blogs', () => {
  // Blogs are json
  test('returns a json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  // Correct amount of blogs
  test('returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })
  // identifying field must be 'id'
  test('identifying field must be \'id\'', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('post /api/blogs', () => {
  // Add a blog
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'a new blog',
      author: 'Ben',
      url: '3djake.com',
      likes: 6
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'a new blog'
    )
  })
  // If likes is not given, it must be 0
  test('if likes is not given, it must be 0', async () => {
    const newBlog = {
      title: 'a new blog',
      author: 'Ben',
      url: '3djake.com'
    }
    const response = await api.post('/api/blogs')
      .send(newBlog)
    const id = response.body.id
    const blog = await Blog.findOne({ _id: id })
    expect(blog.likes).toBe(0)
  })
  // must return 400 if title or url are empty
  test('must return 400 Bad Request if no title or url', async () => {
    let newBlog = {
      title: '',
      author: 'Ben',
      url: '3djake.com'
    }
    let response = await api.post('/api/blogs')
      .send(newBlog)
    expect(response.statusCode).toBe(400)
    newBlog = {
      title: 'This is good title',
      author: 'Ben',
      url: ''
    }
    response = await api.post('/api/blogs')
      .send(newBlog)
    expect(response.statusCode).toBe(400)
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})