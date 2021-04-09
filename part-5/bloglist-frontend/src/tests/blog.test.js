import Rect from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'


describe('<Blog /> component', () => {

    let component 
    const mockHandler = jest.fn()
    const mockHandlerDelete = jest.fn()

    beforeEach(() => {
        const testBlog = {
            title: "Test",
            author: "GM",
            url: "www.test.com",
            likes: 10
        }

        component = render (
            <Blog blog={testBlog} handleLike={mockHandler} handleDelete={mockHandlerDelete}/>
        )
    })

    test('render Title and Author, but not URL and Likes', () => {

        const blog = component.container.querySelector('#blogLess')
        const blogMore = component.container.querySelector('#blogMore')
        expect(blog).toBeDefined();
        expect(blogMore).toBe(null);
    })

    test('show URL and Likes when button is clicked', () => {
        const button = component.container.querySelector('#button-more')
        fireEvent.click(button)

        const blogMore = component.container.querySelector('#blogMore')
        expect(blogMore).toBeDefined();
        expect(blogMore).toHaveTextContent('www.test.com')
        expect(blogMore).toHaveTextContent(10)
    })

    test('test if like button can be clicked', () => {
        const buttonMore = component.container.querySelector('#button-more')
        fireEvent.click(buttonMore)
        const buttonLike = component.container.querySelector('#button-like')
        fireEvent.click(buttonLike)
        fireEvent.click(buttonLike)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
