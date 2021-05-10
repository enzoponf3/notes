import * as React from "react"

import styles from "./Add.module.scss"
import { Label } from "../label/types"
import labelApi from "../label/api"

import AddNote from "./addNote"
import AddLabel from "./addLabel"


const Add: React.FC = () => {
  const [type, setType] = React.useState<"note" | "reminder" | "label">("note")
  const [labels, setLabels] = React.useState<Label[]>([])
  React.useEffect(() => {
    labelApi.list()
      .then(l => setLabels(l))
  },[])

  return (
    <div className={styles.add}>
      <div>
          Type:
        <button className={type=== "note" ? `${styles.selector} ${styles.selected}` : `${styles.selector}`} onClick={() => setType("note")}>Note</button>
        <button className={type=== "reminder" ? `${styles.selector} ${styles.selected}` : `${styles.selector}`} onClick={() => setType("reminder")}>Reminder</button>
        <button className={type=== "label" ? `${styles.selector} ${styles.selected}` : `${styles.selector}`} onClick={() => setType("label")}>Label</button>
      </div>
      {type === "note" && 
        <AddNote labels={labels}/>
      }
      {type === "reminder" && 
        <div>
            Add reminder
        </div>
      }
      {type === "label" && 
          <AddLabel/>
      }
    </div>
  )
}

export default Add
