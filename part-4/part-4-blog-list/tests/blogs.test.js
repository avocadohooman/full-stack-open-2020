const blog = require('../utils/list_helper')

describe('dummy tests', () => {
    test('Simple dummy tests', () => {
        const blogs = [];

        const result = blog.dummy(blogs)
        expect(result).toBe(1);
    })
})


describe('total likes', () => {

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0           
        }
    ]

    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0           
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 3,
            __v: 0           
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0           
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 0,
            __v: 0           
        }
    ]
    const listWithEmptyBlog = []

    test('list with only blog', () => {
        const result = blog.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    })

    test('list with multiple blogs', () => {
        const result = blog.totalLikes(listWithMultipleBlogs);
        expect(result).toBe(10);
    })

    test('list with only blog', () => {
        const result = blog.totalLikes(listWithEmptyBlog);
        expect(result).toBe(0);
    })
})


describe ('favorite Blog', () => {
    const compareTwoBlogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 11
        }
    ]

    const compareManyBlogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 1
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 44
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 42
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 33
        }
    ]

    const compareTwoBlogsSameLikes = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
    ]

    test('comparing two Blogs', () => {
        const result = blog.favoriteBlog(compareTwoBlogs);
        // console.log('comparing two Blogs Result', result, 'Exptect', compareTwoBlogs[0]);
        expect(result).toEqual(compareTwoBlogs[0])
    })
    test('comparing multiple Blogs', () => {
        const result = blog.favoriteBlog(compareManyBlogs);
        // console.log('comparing multiple Blogs Result', result, 'Exptect', compareManyBlogs[1]);
        expect(result).toEqual(compareManyBlogs[1])
    })
    test('comparing two Blogs Same Amount', () => {
        const result = blog.favoriteBlog(compareTwoBlogsSameLikes);
        // console.log('comparing two Blogs Same Amount Result', result, 'Exptect', compareTwoBlogsSameLikes[0]);
        expect(result).toEqual(compareTwoBlogsSameLikes[1] || compareTwoBlogsSameLikes[0])
    })
})

describe('Finding author with most blogs', () => {
    const compareTwoBlogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 11
        }
    ]

    const compareManyBlogs = [
        {
            title: "Canonical string reduction",
            author: "Lars P",
            likes: 1
        },
        {
            title: "Canonical string reduction",
            author: "Lars P",
            likes: 44
        },
        {
            title: "Canonical string reduction",
            author: "Lars P",
            likes: 42
        },
        {
            title: "Canonical string reduction",
            author: "Gary V",
            likes: 33
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 1
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 44
        },
        {
            title: "Canonical string reduction",
            author: "Peter Z",
            likes: 42
        },
        {
            title: "Canonical string reduction",
            author: "",
            likes: 33
        }
    ]
    test('comparing two Blogs', () => {
        const result = blog.mostBlogs(compareTwoBlogs);
        // console.log('comparing two Blogs Result', result, 'Exptect', {author: "Edsger W. Dijkstra", blogs: 2});
        expect(result).toEqual({author: "Edsger W. Dijkstra", blogs: 2})
    })
    test('comparing multiple Blogs', () => {
        const result = blog.mostBlogs(compareManyBlogs);
        // console.log('comparing multiple Blogs Result', result, 'Exptect', {author: "Lars P", blogs: 3});
        expect(result).toEqual({author: "Lars P", blogs: 3})
    })
})

describe('Finding author with most likes', () => {
    const compareTwoBlogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 11
        }
    ]

    const compareManyBlogs = [
        {
            title: "Canonical string reduction",
            author: "Lars P",
            likes: 1
        },
        {
            title: "Canonical string reduction",
            author: "Lars P",
            likes: 44
        },
        {
            title: "Canonical string reduction",
            author: "Lars P",
            likes: 42
        },
        {
            title: "Canonical string reduction",
            author: "Gary V",
            likes: 33
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 1
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 44
        },
        {
            title: "Canonical string reduction",
            author: "Peter Z",
            likes: 42
        },
        {
            title: "Canonical string reduction",
            author: "",
            likes: 33
        }
    ]
    test('comparing two Blogs', () => {
        const result = blog.mostLikes(compareTwoBlogs);
        // console.log('comparing two Blogs Result', result, 'Exptect', {author: "Edsger W. Dijkstra", likes: 23});
        expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 23})
    })
    test('comparing multiple Blogs', () => {
        const result = blog.mostLikes(compareManyBlogs);
        // console.log('comparing multiple Blogs Result', result, 'Exptect', {author: 'Lars P', likes: 87});
        expect(result).toEqual({author: 'Lars P', likes: 87})
    })
})