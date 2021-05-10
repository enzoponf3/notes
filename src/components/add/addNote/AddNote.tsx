import * as React from "react"

import styles from "./AddNote.module.scss"
import { Label } from "~/components/label/types"
import { Note } from "~/components/note/types"

interface Props{
    labels: Label[]
}

const AddNote: React.FC<Props> = ({labels}) => {
  const [favorite, setFavorite] = React.useState<boolean>(false)
  const [selectedLabels, setSelectedLabels] = React.useState<Label[]>([])
  const [_labels, set_labels] = React.useState<Label[]>([])

  React.useEffect(() => {
    set_labels(labels)
  },[labels])

  const note: Note = {
    id:"",
    title:"",
    body: "",
    labels: [],
    createDate: "",
    favorite: false
    
  }

  const addBadge = (title:string) => {
    const label = labels.filter( l => l.title === title)[0]
    setSelectedLabels([...selectedLabels, label])
    set_labels(_labels.filter( l => l.title !== title))

  }

  const removeBadge = (label:Label) => {
    setSelectedLabels(selectedLabels => selectedLabels.filter(s => s !== label))
    set_labels([..._labels,label])
  }

  const handleSubmit = () => {
    if(note.title === "" && note.body === "") return
    note.labels = [...selectedLabels]
    const date = String(new Date)
    note.createDate = date
    console.log(note)
  }

  return (
    <div className={styles.addNote}>
      <form action="submit">
        <label>
                Title
          <input type="text" onChange={e => note.title = e.target.value}/>
        </label>
        <label >
                Note
          <textarea onChange={e => {
            note.body = e.target.value
          }
          } />
        </label>
        <select id="labelInput" onChange={e => addBadge(e.target.value)}   className={styles.labelsInput} value="Select a label">
          <option>Choose a label</option>
          {_labels.map(l => <option key={l.id} value={l.title}>{l.title}</option> )}
          
        </select>
        <div>
          {selectedLabels.map(s => 
            <span key={s.id} onClick={() => removeBadge(s)} className={styles.labelBadge}>{s.title}</span>
                  
          )}
        </div>
        <label>
                Add to Favorites ? 
          <button type="button" className={!favorite? styles.selected : ""} onClick={() =>{ 
            note.favorite=false
            setFavorite(false)
          }}>No</button>
          <button type="button" className={favorite? styles.selected : ""} onClick={() => {
            note.favorite=true
            setFavorite(true)
          }}>Yes</button>
        </label>
        <button className={styles.submitBtn} type="button" onClick={handleSubmit}>Save Note</button>
      </form>
    </div>  
  )
}

export default AddNote
