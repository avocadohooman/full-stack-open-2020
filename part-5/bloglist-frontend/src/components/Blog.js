import React, {useState} from 'react'

const Blog = ({blog, handleLike, handleDelete}) => {
 
    const [visible, setVisible] = useState(true);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }


    const toggleVisibility = (event) => {
        event.preventDefault()
        setVisible(!visible)
    }

    const addLike = (event) => {
        event.preventDefault()
        handleLike({
            id: blog.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user
        })
    }

    const deleteBlog = (event) => {
        event.preventDefault()
        if (window.confirm("Do you really want to delete this blog?")) {
            handleDelete({
                id: blog.id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes,
                user: blog.user
            })
        }
    }

    if (visible) {
        return (
            <div className="blog" style={blogStyle}>
                <div id="blogLess">
                    Title: {blog.title} Author: {blog.author} <button id="button-more" onClick={toggleVisibility}>show more</button>
                </div>
            </div>  
        )
    } else if (!visible) {
        return (
            <div id="blogMore" style={blogStyle}>
                <div >
                    Title: {blog.title} Author: {blog.author} <button onClick={toggleVisibility}>show less</button>
                </div>

                <div>
                    URL: {blog.url}
                </div>

                <div>
                    Likes: {blog.likes} <button id="button-like" onClick={addLike}>like</button>
                </div>
                <button id="button-delete" onClick={deleteBlog}>Delete</button>
            </div> 
        )
    }

}

export default Blog