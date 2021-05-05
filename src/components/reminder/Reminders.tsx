import * as React from "react"
import Loader from "../loader"

import styles from "./Reminders.module.scss"
import { Reminder } from "./types"
import api from "./api"
import ReminderModal from "./reminderModal"

const Reminders: React.FC = () => {
  const [reminders, setReminders] = React.useState<Reminder[]>([])
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")
  const [modal, setModal] = React.useState<boolean>(false)
  const [edit, setEdit] = React.useState<Reminder>()

  React.useEffect(() => {
    api.list()
      .then(r =>{
        setReminders(r)
        setStatus("resolved")
      })
  },[])

  const handleDelete = (reminder:Reminder) => {
    setReminders(reminders.filter(r => r !== reminder))
  }

  const handleEdit = (reminder:Reminder) => {
    setEdit(reminder)
    setModal(true)
  }

  const handleSave = () => {
    console.log("handleSave")
  }

  if(status ==="pending"){
    return(
      <Loader/>
    )
  }
  return (
    <>
      {reminders.length === 0 && <div className={styles.message}>Add Reminders by clicking the <span className="material-icons">add</span> icon below!</div>}
      <div className={styles.container}>
        { reminders.map( (r) => 
          <div onClick={() => handleEdit(r)} key={r.id} className={styles.reminder}>
            <div>
              <span className="material-icons">alarm</span>
              <div>
                <h3>{r.title}</h3>
                <h4>{r.description}</h4>
              </div>
              <div>
                <h3>{r.createDate + " - " + r.hour}</h3>
                <h4>{r.type}</h4>
              </div>
            </div>
            <a onClick={() => handleDelete(r)} ><span className={`material-icons ${styles.delete}`}>delete</span></a> 
          </div>)
        }
        <ReminderModal isOpen={modal} handleSave={handleSave} reminder={edit}/>
      </div>
    </>
  )
}

export default Reminders
