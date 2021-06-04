import * as React from "react"

import styles from "./NoteForm.module.scss"

import { Label } from "~/components/label/types"
import { Note } from "~/components/note/types"
import { addNote, getNote, updateNote } from "~/firebase"

interface Props{
    labels: Label[]
    id: string
    userId: string
}

const AddNote: React.FC<Props> = ({labels, id = "", userId}) => {
  const [favorite, setFavorite] = React.useState<boolean>(false)
  const [selectedLabels, setSelectedLabels] = React.useState<Label[]>([])
  const [_labels, set_labels] = React.useState<Label[]>([])
  const [disabled, setDisabled] = React.useState<boolean>(false)
  const [note, setNote] = React.useState<Note>({
    id:"",
    userId:userId,
    title:"",
    body: "",
    labels: [],
    createDate: "",
    favorite: false
  })

  React.useEffect(() => {
    set_labels(labels)
    if(id !== ""){
      getNote(id)
        .then(n => {
          if(n !== undefined){
            const typedNote = n as Note
            setNote(typedNote)
            setFavorite(typedNote.favorite)
            setSelectedLabels(typedNote.labels)
            set_labels(_labels.filter(l => !selectedLabels.includes(l) ))
          }})
    }
  },[id, userId])

  const addBadge = (title:string) => {
    const label = labels.filter( l => l.title === title)[0]
    setSelectedLabels([...selectedLabels, label])
    set_labels(_labels.filter( l => l.title !== title))

  }

  const removeBadge = (label:Label) => {
    setSelectedLabels(selectedLabels => selectedLabels.filter(s => s !== label))
    set_labels([..._labels,label])
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const  handleSubmit = async (e:any) => {
    e.preventDefault()
    if(note.title === "" && note.body === "") return
    setDisabled(true)
    note.labels = [...selectedLabels]
    const date = String(new Date)
    note.createDate = date
    try {
      if(id !== ""){
        await updateNote(id, note)
      }else{
        await addNote(note)
      }
      document.location.href="/"
    } catch (error) {
      console.log("something went wrong", error)
    }
  }

  return (
    <div className={styles.addNote}>
      <form onSubmit={handleSubmit}>
        <label>
                Title
          <input value={note.title} type="text" onChange={e => setNote({
            ...note, title: e.target.value
          })}/>
        </label>
        <label >
                Note
          <textarea value={note.body} onChange={e => setNote({
            ...note, body: e.target.value
          })
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
          <button type="button" className={!favorite? `${styles.selected} ${styles.labelBtn}` : styles.labelBtn } onClick={() =>{ 
            note.favorite=false
            setFavorite(false)
          }}>No</button>
          <button type="button" className={favorite? `${styles.selected} ${styles.labelBtn}` : styles.labelBtn } onClick={() => {
            note.favorite=true
            setFavorite(true)
          }}>Yes</button>
        </label>
        <button disabled={disabled} type="button" onClick={handleSubmit}>Save Note</button>
      </form>
    </div>  
  )
}

export default AddNote
