import * as React from "react"

import styles from "./NoteCard.module.scss"
import {Note} from "../types"

interface Props{
  note: Note
  handleDelete: () => void
  handleFav: () => void
}

const NoteCard: React.FC<Props> = ({note, handleDelete, handleFav}) => {
  return (
    <div className={styles.noteCard}>
      <div><h3>{note.title}</h3></div>
      <div className={styles.bodyCard}>
        <div>
          {note.body.map(e => <p key={e}>{e}</p>)}
        </div>    
    
      </div>
      <div className={styles.footCard}>
        <a onClick={handleDelete} ><span className={`material-icons ${styles.selected}`}>delete</span></a>
        <a onClick={handleFav}><span className={note.favorite ? `material-icons ${styles.selected}` :"material-icons"}>favorite</span></a>
      </div>
    </div>
  )
}

export default NoteCard
