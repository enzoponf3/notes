import * as React from "react"

import styles from "./Add.module.scss"
import { Helmet } from "react-helmet-async"

import { Label } from "~/components/label/types"
import labelApi from "~/components/label/api"
import NoteForm from "~/components/forms/noteForm"
import LabelForm from "~/components/forms/labelForm"
import ReminderForm from "~/components/forms/reminderForm"
import { useUser } from "~/components/user/hooks"
import { getLabels } from "~/firebase"
 interface Props{
  _type: "note" | "reminder" | "label"
  id: string
 }

const Add: React.FC <Props> = ( { _type = "note", id = ""} ) => {
  const [type, setType] = React.useState<string>(_type)
  const [labels, setLabels] = React.useState<Label[]>([])
  const user = useUser()

  React.useEffect(() => {
    {user && getLabels(user.id)
      .then(l => setLabels(l as Label[]))}
  },[])

  return (
    <>
      <Helmet>
        <title>{`PNotes | Add ${type}`}</title>
      </Helmet>
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
        <NoteForm labels={labels} id={id} userId={user? user.id : ""}/>
        }
        {type === "reminder" && 
        <ReminderForm id={id} userId={user? user.id : ""}/>
        }
        {type === "label" && 
        <LabelForm id={id} userId={user? user.id : ""}/>
        }
      </div>
    </>
  )
}

export default Add
