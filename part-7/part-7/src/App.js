import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect,
    useHistory
 } from 'react-router-dom'


const Anectode = ({anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <div>{anecdote.author}</div>
        </div>
    )
}

const AnecdoteList = ({ notification, anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <div>
        {notification}
    </div>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
          <Link to={`/anectodes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push("/");
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`New anecdote ${anecdote.content} was created!`);
    setTimeout(() => {
        setNotification('')
    }, 1000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
    <h1>Software anecdotes</h1>
    <Router>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
        <Switch>
            <Route path="/anectodes/:id">
                <Anectode  anecdotes={anecdotes} />
            </Route>
            <Route path="/create">
                <CreateNew addNew={addNew} anecdotes={anecdotes} />
            </Route>
            <Route path="/about">
                <About anecdotes={anecdotes} />
            </Route>
            <Route path="/">
                <AnecdoteList notification={notification} anecdotes={anecdotes} />
            </Route>
        </Switch>
    </Router>
    <Footer />
    </div>
  )
}

export default App;