import React, {useState, useEffect, useRef} from 'react'
import Note from './Note'
import axios from 'axios'
import noteService from '../services/notes'
import loginService from '../services/login';
import LoginForm from './loginForm';
import Togglable from './toggle';
import NoteForm from './noteForm';

const App = (props) => {
    
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState(
		'a new note...'
	)
	const [showAll, setShowAll] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)

    useEffect(() => {
        noteService
          .getAll()
          .then(initialNotes => {
            setNotes(initialNotes)
          })
      }, [])
    
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    console.log('render', notes.length, 'notes')

	const addNote = (noteObject) => {
        noteService
        .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        noteFormRef.current.toggleVisibility();
    })
	}

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('logging in with', username, password);

        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log('Error')
        }
    }

    const loginForm = () => {
        return (
            <div>
                <Togglable buttonLabel='login'>
                    <LoginForm 
                        username={username}
                        password={password}
                        handlePasswordChange={({target}) => setPassword(target.value)}
                        handleUsernameChange={({target}) => setUsername(target.value)}
                        handleSubmit={handleLogin}
                    />
                </Togglable>
            </div>
        )
    }

    const logout = () => {
        window.localStorage.removeItem('loggedNoteappUser');
        setUser(null);
    }

    const noteFormRef = useRef();

    const noteForm = () => (
        <Togglable buttonLabel="create note" ref={noteFormRef}>
          <NoteForm createNote={addNote}/>
        </Togglable>
    )

	const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const toggleImportanceOf = (id) => {
        console.log('importance of ' + id + ' needs to be toggled')
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                alert(
                    `the note '${note.content}' was already deleted from server`
                )
                setNotes(notes.filter(n => n.id !== id))
            })
    }

	return (
		<div>
			<h1>Notes</h1>

            {
                user === null 
                ? loginForm()
                : 
                <div>
                <p>{user.name} logged in</p>
                {noteForm()}
                <button onClick={logout}>Logout</button>
                </div>
            }
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map(note => 
                <Note 
                    key={note.id} 
                    note={note}
                    toggleImportance={() => toggleImportanceOf(note.id)}
                />)}
			</ul>

		</div>
	)
}

export default App