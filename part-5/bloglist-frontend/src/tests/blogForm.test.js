import Rect from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from '../components/blogForm'

describe('<BlogForm /> Unit Tests', () => {
    test('creates a new blog and presses submit', () => {
        const mockHandlerCreate = jest.fn()

        const component = render (
            <BlogForm createBlog={mockHandlerCreate}/>
        )

        const title = component.container.querySelector('#input-title')
        const author = component.container.querySelector('#input-author')
        const url = component.container.querySelector('#input-url')
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: {value: 'Test Title'}
        })
        fireEvent.change(author, {
            target: {value: 'Test Author'}
        })
        fireEvent.change(url, {
            target: {value: 'Test URL'}
        })
        fireEvent.submit(form)

        expect(mockHandlerCreate.mock.calls).toHaveLength(1);
        expect(mockHandlerCreate.mock.calls[0][0].title).toBe('Test Title')
        expect(mockHandlerCreate.mock.calls[0][0].author).toBe('Test Author')
        expect(mockHandlerCreate.mock.calls[0][0].url).toBe('Test URL')
    })

})