import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
    const [newTitle, setTitle] = useState('')
    const [newAuthor, setAuthor] = useState('')
    const [newUrl, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault();
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setTitle('')
        setUrl('')
        setAuthor('')
    }

    return (
        <div>
            <h2>Create a new Blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                    id="input-title"
                    type="text"
                    value={newTitle}
                    name="Title"
                    onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                    id="input-author"
                    type="text"
                    value={newAuthor}
                    name="Author"
                    onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                    id="input-url"
                    type="text"
                    value={newUrl}
                    name="URL"
                    onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm