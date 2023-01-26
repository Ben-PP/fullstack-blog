const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'This is first blog',
    author: 'Ben',
    url: 'https://huone105.com',
    likes: 8
  },
  {
    title: 'This is second blog',
    author: 'Jake',
    url: 'https://jimms.fi',
    likes: 2
  },
  {
    title: 'This is third blog',
    author: 'Rose',
    url: 'https://3djake.com',
    likes: 6
  },
  {
    title: 'Dogs are nice',
    author: 'Ben',
    url: 'https://huone105.com',
    likes: 2
  },
  {
    title: 'I like coding',
    author: 'Ben',
    url: 'https://huone105.com',
    likes: 3
  },
  {
    title: 'I wish I was as good as Ben in coding',
    author: 'Jake',
    url: 'https://huone105.com',
    likes: 4
  }
]

const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}