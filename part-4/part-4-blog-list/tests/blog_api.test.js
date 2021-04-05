const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
    await Blog.deleteMany({});
    console.log('Database cleared');

    const blogObjects = helper.initialeBlogs
        .map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
    console.log('Database for testing initialised')
})

describe ('Testing GET api calls', () => {
    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs/')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Blog objects are saved with id not _id', async () => {
        const response = await api.get('/api/blogs/');

        const contents = response.body.map(blog => blog.id);
        expect(contents).toBeDefined();
    })
})

describe ('Testing POST api calls', () => {
    test('a blog can be added', async () => {
        const newBlog = {
            title: "The Guide For API Testing",
            author: "Gerhard M",
            url: "test",
            likes: 0
        }

        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialeBlogs.length + 1);

        const contents = blogsAtEnd.map(blog => blog.title);
        expect(contents).toContain('The Guide For API Testing');
    })

    test('default value of likes is 0 if not defined', async() => {
        const newBlog = {
            title: "A blog post without likes :(",
            author: "Gerhard M",
            url: "test"
        }

        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const addedBlog = await helper.findBlogInDb(newBlog)
        expect(addedBlog.likes).toBe(0);
    })

    test('if title and url missing expect 400 Bad Request', async() => {
        const newBlog = {
            author: "Gerhard M",
        }

        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialeBlogs.length);
    })
})

describe ('Testing DELETE api calls', () => {
    
})

afterAll(() => {
    mongoose.connection.close()
})