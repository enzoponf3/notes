import * as React from "react"

import styles from "./Notes.module.scss"
import {Note} from "./types"
import NoteCard from "./noteCard"

interface Props{
    filter:string
}

const Notes: React.FC<Props> = ({filter}) => {
  const [notes, setNotes] = React.useState<Note[]>([])
  return (
    <div className={styles.notes}>
      {filter !== "none" &&
      <div className={styles.filter}><span>Filter: {filter}</span></div> 
      }
      <div className={styles.container}>
        <NoteCard/>
        <NoteCard/>
      </div>
    </div>
  )
}

export default Notes
