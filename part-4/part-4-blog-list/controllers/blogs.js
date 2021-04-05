const blogsRouter = require('express').Router()
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs);
})


blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const user = await User.findById(body.userId);

    console.log("Found User", user);
    if (!body.likes) {
        body.likes = 0;
    }

    if (!body.title || !body.url) {
        return response.status(400).json({error: "Missing Title / URL"});
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
})

blogsRouter.put('/:id', async(request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
})

module.exports = blogsRouter 