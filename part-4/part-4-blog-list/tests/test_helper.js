const Blog = require('../models/blog');
const User = require('../models/user');

const initialeBlogs = [
    {
        title: "Canonical string reduction",
        author: "Lars P",
        url: "test",
        likes: 1
    },
    {
        title: "Canonical string reduction",
        author: "Lars P",
        url: "test",
        likes: 44
    },
    {
        title: "Canonical string reduction",
        author: "Lars P",
        url: "test",
        likes: 42
    },
    {
        title: "Canonical string reduction",
        author: "Gary V",
        url: "test",
        likes: 33
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "test",
        likes: 1
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "test",
        likes: 44
    },
    {
        title: "Canonical string reduction",
        author: "Peter Z",
        url: "test",
        likes: 42
    },
    {
        title: "Canonical string reduction",
        author: "",
        url: "test",
        likes: 33
    }
]

const nonExistingId = async () => {
    const blog = new Blog({title: "Placeholder", author: "Max Mustermann", likes: 0})
    await blog.save();
    await blog.remove();

    return blog._id.toString();
}

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const findBlogInDb = async (toFind) => {
    const blog = await Blog.findOne(toFind);
    return blog.toJSON();
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialeBlogs,
    nonExistingId,
    blogsInDb,
    findBlogInDb,
    usersInDb
  }
  