import * as React from "react"

import styles from "./Notes.module.scss"
import {Note} from "./types"
import NoteCard from "./noteCard"

import api from "./api"
import Loader from "../loader"

interface Props{
    filter:string
}

const Notes: React.FC<Props> = ({filter = ""}) => {
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")
  const [notes, setNotes] = React.useState<Note[]>([])
  const [favorites, setFavorites] = React.useState<Note[]>([])

  React.useEffect( () => {
    api.list()
      .then( (e) => {          
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

  if (status === "pending") {
    return(
      <Loader/>
    ) 
  }

  return (
    <>
      {notes.length === 0 && <div className={styles.message}><p>Add notes by clicking the</p><strong>+</strong> <p> icon below!</p></div> }
      {notes.length !== 0 &&
        <div className={styles.notes}>
          {filter !== "" &&
        <div className={styles.filter}><span>{filter}</span></div> 
          }
          {favorites.length !== 0 &&
        <>
          <p>Favorites</p>
          <div className={styles.favorites}>
            {favorites.map(e => <NoteCard handleFav={() => handleFav(e)} handleDelete={() => handleDelete(e)} key={e.id} note={e}/>)}
          </div>
        </>
          }
          <div className={styles.container}>
            {notes.filter(n => n.favorite === false).map( e =><NoteCard handleFav={() => handleFav(e)} handleDelete={() => handleDelete(e)} key={e.id} note={e}/>)}
          </div>
        </div>
      }
    </>
  )
}

export default Notes