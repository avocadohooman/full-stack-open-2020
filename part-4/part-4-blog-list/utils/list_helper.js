const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let i = 0;
    let sumLikes = 0;
    while (i < blogs.length) {
        sumLikes += blogs[i].likes;
        i++;
    }
    if (blogs.length === 0) {
        return 0;
    } else {
        return sumLikes;
    }
}

const favoriteBlog = (blogs) => {
    let i = 0;
    let mostLikes = 0;
    let favoriteBlog = 0;

    if (blogs.length === 0 || blogs === undefined) {
        return 0;
    }
    while (i < blogs.length) {
        if (blogs[i].likes > mostLikes) {
            mostLikes = blogs[i].likes;
            favoriteBlog = i;
        }
        i++;
    }
    return blogs[favoriteBlog];
}


// const compareManyBlogs = [
//     {
//         title: "Canonical string reduction",
//         author: "Lars P",
//         likes: 1
//     },
//     {
//         title: "Canonical string reduction",
//         author: "Lars P",
//         likes: 44
//     },
//     {
//         title: "Canonical string reduction",
//         author: "Lars P",
//         likes: 42
//     },
//     {
//         title: "Canonical string reduction",
//         author: "Gary V",
//         likes: 33
//     },
//     {
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         likes: 1
//     },
//     {
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         likes: 44
//     },
//     {
//         title: "Canonical string reduction",
//         author: "Peter Z",
//         likes: 42
//     },
//     {
//         title: "Canonical string reduction",
//         author: "",
//         likes: 33
//     }
// ]

const mostBlogs = (blogs) => {
    let authors = blogs.map(blog => ({author: blog.author, blogs: 0}));
    let i = 0;
    let k = 0;
    while (i < authors.length) {
        k = 0;
        while (k < authors.length) {
            if (authors[i].author === authors[k].author && i !== k) {
                authors.splice(k, 1);
            }
            k++
        }
        i++;
    }
    i = 0;
    while (i < blogs.length) {
        authors.find(author => author.author === blogs[i].author ? author.blogs += 1 : 0)
        i++;
    }
    return authors.find(author => author.blogs === Math.max.apply(Math, authors.map(x => x.blogs)));
}

// mostBlogs(compareManyBlogs);

const mostLikes = (blogs) => {
    let authors = blogs.map(blog => ({author: blog.author, likes: blog.likes}));
    let i = 0;
    let k = 0;
    while (i < authors.length) {
        k = 0;
        while (k < authors.length) {
            if (authors[i].author === authors[k].author && i !== k) {
                authors[i].likes += authors[k].likes;
                authors.splice(k, 1);
            }
            k++
        }
        i++;
    }
    // console.log("List of authors", authors);
    // console.log("Author with most likes", authors.find(author => author.likes === Math.max.apply(Math, authors.map(x => x.likes))))
    return authors.find(author => author.likes === Math.max.apply(Math, authors.map(x => x.likes)))
}

// mostLikes(compareManyBlogs);

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}