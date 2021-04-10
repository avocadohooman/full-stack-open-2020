const blogsRouter = require('express').Router()
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs);
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body;
    if (!body.title || !body.url) {
        return response.status(400).json({error: "Missing Title / URL"});
    }
    if (!request.token || !request.user) {
        return response.status(401).json({error: 'token missing or invalid'});
    }
    if (!body.likes) {
        body.likes = 0;
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: request.user._id
    })

    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id);
    await request.user.save();
    response.json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    if (!request.token || !request.user) {
        return response.status(401).json({error: 'token missing or invalid'});
    }
    const tokenUser = await User.findById(request.user._id);
    const blogUser = await Blog.findById(request.params.id);
    if (!blogUser) {
        return response.status(401).json({error: 'blog not found'});
    }
    if (blogUser.user.toString() === tokenUser._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();    
    } else {
        return response.status(401).json({error: 'invalid user rights'})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    console.log("Body", body, "ID", body.id)
    const blog = {
        id: body.id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    await Blog.findByIdAndUpdate(request.body.id, blog, {new: true});
    response.status(204).end()
})

module.exports = blogsRouter 