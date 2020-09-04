import React, { useState, useEffect } from 'react';
// Import Component
import {
  Container,
  Grid,
  TextField,
  Divider,
  IconButton
} from '@material-ui/core'
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Todo from './component/todo'
// import firebase
import firestore from './firebase'
import firebase from 'firebase'
// Import Style
import './assets/style/core.scss'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    firestore.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        todo: doc.data()
      })))
    })
  }, [])

  const addTodo = (event) => {
    event.preventDefault()

    firestore.collection('todos').add({
      title: title,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTitle('')
    setText('')
  }

  return (
    <div>
      <Container maxWidth="lg" spacing={3}>
        <h1>Make your list.</h1>
        <form>
          <Grid container spacing={3} className="__app_grid">
              <Grid className="__app_spacing" item xs={6} sm={3}>
                <TextField
                  className="__app_input"
                  label="Title"
                  variant="outlined"
                  color="primary"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Grid>
              <Grid className="__app_spacing" item xs={10} sm={8}>
                <TextField
                  className="__app_input"
                  label="Text"
                  variant="outlined"
                  color="primary"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  multiline
                  />
              </Grid>
              <Grid className="__app_spacing" item xs={2} sm={1}>
                <IconButton 
                  aria-label="add" 
                  className={title && text ? '__app_input_button' : ''}
                  disabled ={!title || !text}  
                  type="submit"
                  color="secondary"
                  onClick={addTodo} >
                  <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
              </Grid>
          </Grid>
        </form>

        <Divider variant="middle" />

        <h1> Todo list. </h1>
        {
          todos.map((item) => (
            <Todo title={item.todo.title} text={item.todo.text} id={item.id}/>
          ))
        }
      </Container>
    </div>
  );
}

export default App;
