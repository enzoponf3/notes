import * as React from "react"
import Loader from "../loader"

import styles from "./Reminders.module.scss"
import { Reminder } from "./types"
import api from "./api"
import Add from "../add"

const Reminders: React.FC = () => {
  const [reminders, setReminders] = React.useState<Reminder[]>([])
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [editId, setEditId] = React.useState<string>("")

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
    setEditId(reminder.id)
    setIsOpen(true)
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
          <div key={r.id} className={styles.reminder}>
            <div onClick={() => handleEdit(r)}>
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
        <div 
          className={isOpen? `${styles.edit} ${styles.open}`:`${styles.edit}`}
        >
          <Add  _type="reminder" id={editId} />
          <button 
            onClick={ () => setIsOpen(false)} 
            className={styles.cancelBtn} 
            type="button"
          >Cancel</button>
        </div>
      </div>
    </>
  )
}

export default Reminders
