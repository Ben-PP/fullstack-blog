const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach((blog) => {
    total = total + blog.likes
  })
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    throw 'List can not be empty'
  }
  let favorite = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    throw 'List can not be empty'
  }
  let authors = {}
  blogs.forEach((blog) => {
    if (!(blog.author in authors)) {
      authors[blog.author] = 1
      return
    }
    authors[blog.author] = authors[blog.author] + 1
  })
  let topDawg = Object.keys(authors)[0]
  Object.keys(authors).forEach((key) => {
    if (authors[key] >= authors[topDawg]) {
      topDawg = key
    }
  })
  return {
    author: topDawg,
    blogs: authors[topDawg]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    throw 'List can not be empty'
  }
  let authors = {}
  blogs.forEach((blog) => {
    if (!(blog.author in authors)) {
      authors[blog.author] = blog.likes
      return
    }
    authors[blog.author] = authors[blog.author] + blog.likes
  })
  let topDawg = Object.keys(authors)[0]
  Object.keys(authors).forEach((key) => {
    if (authors[key] >= authors[topDawg]) {
      topDawg = key
    }
  })
  return {
    author: topDawg,
    blogs: authors[topDawg]
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}