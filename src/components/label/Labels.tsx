import * as React from "react"
import Loader from "../loader"

import api from "./api"
import { Label } from "./types"

import styles from "./Labels.module.scss"
import LabelModal from "./labelModal"


const Labels: React.FC = () => {
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")
  const [labels, setLabels] = React.useState<Label[]>([])
  const [modal, setModal] = React.useState<boolean>(false)
  const [edit, setEdit] = React.useState<Label>()

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
    console.log(label)
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
          <div onClick={() => handleClick(l)} key={l.id} className={styles.label}>
            <div>
              <span className="material-icons">label</span>
              <span className={styles.title}>{l.title}</span>
            </div>
            <div>
              <a onClick={() => handleEdit(l)} ><span className="material-icons">edit</span></a>
              <a onClick={() => handleDelete(l)} ><span className={`material-icons ${styles.delete}`}>delete</span></a>
            </div>
          </div>
        )}
        <LabelModal isOpen={modal} handleSave={()=>console.log("wara")} label={edit} />
      </div>
    </>
  )
}

export default Labels

