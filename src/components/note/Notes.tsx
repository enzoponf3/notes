import * as React from "react"
import { useParams, useHistory } from "react-router-dom"
import { Helmet } from "react-helmet-async"

import styles from "./Notes.module.scss"
import {Note} from "./types"
import NoteCard from "./noteCard"

import Loader from "../loader"
import { deleteNote, getNotes, updateNote } from "~/firebase"
import { useUser } from "../user/hooks"

const Notes: React.FC = () => {
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")
  const [notes, setNotes] = React.useState<Note[]>([])
  const [favorites, setFavorites] = React.useState<Note[]>([])
  const { label } = useParams<{label: string}>()
  const user = useUser()
  const history = useHistory()

  React.useEffect( () => {
    if(!user) return
    getNotes(user.id)
      .then( (e) => {
        const typedNotes = e as Note[]   
        setNotes(typedNotes)
        setFavorites(typedNotes.filter(n => n.favorite === true))
        setStatus("resolved")
      })
  },[])

  const handleDelete = (note:Note) => {
    if(confirm("Are you sure you want to delete this note?")){
      deleteNote(note.id)
        .then( () => {
          {user && getNotes(user.id)
            .then(n => setNotes(n as Note[]))}
        })
    }
  }

  const handleFav = async(note: Note) =>{
    if(!user) return
    note.favorite = !note.favorite
    await updateNote(note.id, note)
    await getNotes(user?.id)
      .then( n => {
        const updatedNotes = n as Note[]
        setFavorites(updatedNotes.filter(n => n.favorite === true))
        setNotes(updatedNotes.filter(n => n.favorite !== true))
      })
  }

  const handleEdit = (note: Note) =>{
    history.push(`edit/note/${note.id}`)
  }

  if (status === "pending") {
    return(
      <Loader/>
    ) 
  }

  if(label){
    return(
      <div className={styles.notes}>
        <Helmet>
          <title>PNotes | Notes: {label}</title>
        </Helmet>
        <>
          <p>Label: {label}</p>
          <div className={styles.container}>
            {notes
              .filter(n => {
                let contains = false
                n.labels.map( l => {
                  if(l.title === label) contains = true
                })
                return contains
              })
              .map( e =>
                <NoteCard 
                  handleEdit={() => handleEdit(e)} 
                  handleFav={() => handleFav(e)} 
                  handleDelete={() => handleDelete(e)} 
                  key={e.id} 
                  note={e}
                />)}
          </div>
        </>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>PNotes</title>
      </Helmet>
      {notes.length === 0 && <div className={styles.message}><p>Add notes by clicking the</p><strong>+</strong> <p> icon below!</p></div> }
      {notes.length !== 0 &&
        <div className={styles.notes}>          
          {favorites.length !== 0 &&
        <>
          <p>Favorites</p>
          <div className={styles.favorites}>
            {favorites.map(e => 
              <NoteCard 
                handleFav={() => handleFav(e)} 
                handleDelete={() => handleDelete(e)} 
                handleEdit={() => handleEdit(e)}
                key={e.id} 
                note={e}/>)}
          </div>
        </>
          }
          <div className={styles.container}>
            {notes.filter(n => n.favorite === false).map( e =>
              <NoteCard 
                handleFav={() => handleFav(e)} 
                handleDelete={() => handleDelete(e)} 
                handleEdit= { () => handleEdit(e)}
                key={e.id} 
                note={e}
              />)}
          </div>
        </div>
      }
    </>
  )
}

export default Notes
