import * as React from "react"
import Loader from "../loader"

import api from "./api"
import { Label } from "./types"

import styles from "./Labels.module.scss"
import Add from "../add"


const Labels: React.FC = () => {
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")
  const [labels, setLabels] = React.useState<Label[]>([])
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [edit, setEdit] = React.useState<Label>({id:"", title:""})

  React.useEffect(() => {
    api.list()
      .then( l => {
        setLabels(l)
        setStatus("resolved")
      })      
  },[])

  const handleDelete = (label: Label) => {
    setLabels(labels.filter(l => l !== label))
  }

  const handleClick = (label: Label) => {
    document.location.href = `/notes/${label.title}`
  }

  const handleEdit = (label: Label) => {
    setEdit(label)
    setIsOpen(true)
  }

  if(status ==="pending"){
    return(
      <Loader/>
    )
  }


  return (
    <>
      {labels.length === 0 && <div className={styles.message}>Add labels by clicking the <span className="material-icons">add</span> icon below!</div>}
      <div className={styles.container}>
        {labels.map( l => 
          <div  key={l.id} className={styles.label}>
            <div onClick={() => handleClick(l)}>
              <span className="material-icons">label</span>
              <span className={styles.title}>{l.title}</span>
            </div>
            <div>
              <a onClick={() => handleEdit(l)} ><span className="material-icons">edit</span></a>
              <a onClick={() => handleDelete(l)} ><span className={`material-icons ${styles.delete}`}>delete</span></a>
            </div>
          </div>
        )}
        <div className={isOpen? `${styles.edit} ${styles.open}`:`${styles.edit}`}>
          <Add  _type="label" id={edit.id} />
          <button onClick={ () => setIsOpen(false)} className={styles.cancelBtn} type="button">Cancel</button>
        </div>
      </div>
    </>
  )
}

export default Labels

