import * as React from "react"

import styles from "./Labels.module.scss"
import { useHistory } from "react-router"
import { Helmet } from "react-helmet-async"
 
import { Label } from "./types"
import Loader from "../loader"
import { useUser } from "../user/hooks"
import { deleteLabel, getLabels } from "~/firebase"

const Labels: React.FC = () => {
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")
  const [labels, setLabels] = React.useState<Label[]>([])
  const user = useUser()
  const history = useHistory()

  React.useEffect(() => {
    if(!user) return
    getLabels(user.id)
      .then( l => {
        const typedLabels = l as Label[]
        setLabels(typedLabels)
        setStatus("resolved")
      })      
  },[])

  const handleDelete = (label: Label) => {
    const labelIndex = labels.findIndex( l => l.id === label.id)
    deleteLabel(label.id)
      .then(() => 
        setLabels(labels.splice(labelIndex, 1))
      )
  }

  const handleClick = (label: Label) => {
    document.location.href = `/notes/${label.title}`
  }

  const handleEdit = (label: Label) => {
    history.push(`/edit/label/${label.id}`)
  }

  if(status ==="pending"){
    return(
      <>
        <Helmet>
          <title>Loading . . .</title>
        </Helmet>
        <Loader/>
      </>
    )
  }


  return (
    <>
      <Helmet>
        <title>PNotes | Labels</title>
      </Helmet>
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
        
      </div>
    </>
  )
}

export default Labels

