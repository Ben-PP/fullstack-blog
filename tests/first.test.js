const listHelper = require('../utils/list_helper')

const emptyList = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Jaska',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithMultipleBlogs = [
  {
    _id: '5r422aa71b54a676234d17f8',
    title: 'Go To Statement is fun',
    author: 'Jaska',
    url: 'https://www.jimms.fi/fi/Product/Show/184190/egg-mpa-wht/endgame-gear-micarm-puomivarsi-mikrofonille-valkoinen',
    likes: 0,
    __v: 0
  },
  {
    _id: '5r422tt71b54a676234d17f8',
    title: 'testtsetsetsetset',
    author: 'Ben',
    url: 'https://www.printables.com/model/375156-octopuscase-or-any-other-electronics',
    likes: 10,
    __v: 0
  },
  {
    _id: '5r422aa71b54a676234d17f8',
    title: 'Go To Statement is fun',
    author: 'Jaska',
    url: 'https://www.printables.com/social/471368-ben_p/about',
    likes: 3,
    __v: 0
  },
  {
    _id: '5r422aa71b54a676234d17f8',
    title: 'Go To Statement is fun',
    author: 'Ben',
    url: 'https://www.printables.com/social/471368-ben_p/about',
    likes: 8,
    __v: 0
  },
  {
    _id: '5r422aa71b54a676234d17f8',
    title: 'Go To Statement is fun',
    author: 'Ben',
    url: 'https://www.printables.com/social/471368-ben_p/about',
    likes: 10,
    __v: 0
  }
]

// Tests listHelper.totalLikes
describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the like of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(31)
  })
})

// Tests listHelper.favoriteBlog()
describe('favorite blog', () => {
  test('of empty list is error', () => {
    expect(() => {
      listHelper.favoriteBlog(emptyList)
    }).toThrow()
  })
  test('when list has only one blog equalt to that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })
  test('of a bigger list to be correct', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(listWithMultipleBlogs[1])
  })

  // Tests listHelper.mostBlogs()
  describe('most blogs', () => {
    test('of empty list throws an error', () => {
      expect(() => {
        listHelper.mostBlogs(emptyList)
      }).toThrow()
    })
    test('when list has only one blog equal to that', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual({
        author: 'Jaska',
        blogs: 1
      })
    })
    test('of a bigger list to be correct', () => {
      const result = listHelper.mostBlogs(listWithMultipleBlogs)
      expect(result).toEqual({
        author: 'Ben',
        blogs: 3
      })
    })
  })
  // Tests listHelper.mostBlogs()
  describe('most likes', () => {
    test('of empty list throws an error', () => {
      expect(() => {
        listHelper.mostLikes(emptyList)
      }).toThrow()
    })
    test('when list has only one blog equal to that', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual({
        author: 'Jaska',
        blogs: 5
      })
    })
    test('of a bigger list to be correct', () => {
      const result = listHelper.mostLikes(listWithMultipleBlogs)
      expect(result).toEqual({
        author: 'Ben',
        blogs: 28
      })
    })
  })
})