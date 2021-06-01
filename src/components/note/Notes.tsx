import * as React from "react"
import { useParams } from "react-router-dom"

import styles from "./Notes.module.scss"
import {Note} from "./types"
import NoteCard from "./noteCard"

import Loader from "../loader"
import Add from "../add"
import { getNotes } from "~/firebase"
import { useUser } from "../user/hooks"

const Notes: React.FC = () => {
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")
  const [notes, setNotes] = React.useState<Note[]>([])
  const [favorites, setFavorites] = React.useState<Note[]>([])
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [editId, setEditId] = React.useState<string>("")
  const { label } = useParams<{label: string}>()
  const user = useUser()

  React.useEffect( () => {
    if(!user) return
    getNotes(user.id)
      .then( (e) => { 
        console.log(e)      
        setNotes(e)
        setFavorites(e.filter(n => n.favorite === true))
        setStatus("resolved")
      })
  },[])
  const handleDelete = (note:Note) => {
    setNotes(notes => notes.filter(n => n !== note))
    setFavorites(notes => notes.filter(n => n !== note))
  }
  const handleFav = (note: Note) =>{
    note.favorite = !note.favorite
    setFavorites (notes.filter(n => n.favorite === true))
  }

  const handleEdit = (note: Note) =>{
    setEditId(note.id)
    setIsOpen(true)
  }

  if (status === "pending") {
    return(
      <Loader/>
    ) 
  }

  if(label){
    return(
      <div className={styles.notes}>
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
          <div 
            className={isOpen? `${styles.edit} ${styles.open}`:`${styles.edit}`}
          >
            <Add  _type="note" id={editId} />
            <button 
              onClick={ () => setIsOpen(false) }
              className={styles.cancelBtn} type="button">Cancel</button>
          </div>
        </div>
      }
    </>
  )
}

export default Notes
