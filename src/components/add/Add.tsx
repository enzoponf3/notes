import * as React from "react"

import styles from "./Add.module.scss"
import { Label } from "../label/types"
import labelApi from "../label/api"

import AddNote from "./addNote"
import AddLabel from "./addLabel"
import AddReminder from "./addReminder"
 interface Props{
  _type: "note" | "reminder" | "label"
  id: string
 }

const Add: React.FC <Props> = ( { _type = "note", id = ""} ) => {
  const [type, setType] = React.useState<string>(_type)
  const [labels, setLabels] = React.useState<Label[]>([])

  React.useEffect(() => {
    labelApi.list()
      .then(l => setLabels(l))
  },[])

  if(id){
    return(
      <div className={styles.add}></div>
    )
  }

  return (
    <div className={styles.add}>
      {id === "" &&
      <div>
          Type:
        <button className={type=== "note" ? `${styles.selector} ${styles.selected}` : `${styles.selector}`} onClick={() => setType("note")}>Note</button>
        <button className={type=== "reminder" ? `${styles.selector} ${styles.selected}` : `${styles.selector}`} onClick={() => setType("reminder")}>Reminder</button>
        <button className={type=== "label" ? `${styles.selector} ${styles.selected}` : `${styles.selector}`} onClick={() => setType("label")}>Label</button>
      </div>
      }      
      {type === "note" && 
        <AddNote labels={labels} id={id}/>
      }
      {type === "reminder" && 
        <AddReminder id={id}/>
      }
      {type === "label" && 
          <AddLabel id={id}/>
      }
    </div>
  )
}

export default Add
