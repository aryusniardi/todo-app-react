import React, { useState } from 'react'
import { List, ListItem, ListItemText, IconButton, Modal, Grid, TextField, Button } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from "@material-ui/icons/Edit"
import firebase from 'firebase'
import firestore from '../firebase'

function ToDo(props) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    
    const onClick = (event) => {
        firestore.collection('todos').doc(props.id).delete()
    }

    const onClose = (event) => {
        setOpen(false)
    }

    const onClickEdit = (event) => {
        setOpen(true)
    }

    const editTodo = (event) => {
      event.preventDefault();

      firestore.collection("todos").doc(props.id).set({
        title: title,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }, {merge: true});
      setOpen(false)

    };

    const body = (
      <div className="__todo_list_modal">
        <h1>Edit todo</h1>
        <form>
          <Grid container spacing={3} className="__app_grid">
            <Grid className="__app_spacing" item xs={6} sm={4}>
              <TextField
                className="__app_input"
                label="Title"
                variant="outlined"
                color="primary"
                value={title}
                placeholder={props.title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>
            <Grid className="__app_spacing" item xs={10} sm={9}>
              <TextField
                className="__app_input"
                label="Text"
                variant="outlined"
                color="primary"
                value={text}
                placeholder={props.text}
                onChange={(event) => setText(event.target.value)}
                multiline
              />
            </Grid>
            <Grid
              className="__app_spacing __app_spacing_button"
              item
              xs={2}
              sm={3}
            >
              <Button
                variant="contained"
                aria-label="edit"
                disabled={!props.title || !props.text}
                type="submit"
                color="primary"
                onClick={editTodo}
                endIcon={<EditIcon />}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
    
    return(
        <List className="__todo_list">
            <ListItem className="__todo_item" alignItems="flex-start">
                <ListItemText
                    primary={props.title}
                    secondary={props.text}
                />
            </ListItem>
            <span className="__todo_list_button_group">
                <IconButton 
                    onClick={onClickEdit}
                    aria-label="edit" >
                    <EditIcon />
                </IconButton>
                <IconButton 
                    onClick={onClick}
                    aria-label="delete"> 
                    <DeleteForeverIcon fontSize="large" />
                </IconButton>
            </span>

            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </List>
    )
}

export default ToDo