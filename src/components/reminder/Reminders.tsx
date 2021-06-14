import * as React from "react"
import styles from "./Reminders.module.scss"
import { useHistory } from "react-router-dom"
import { Helmet } from "react-helmet-async"

import { Reminder } from "./types"
import Loader from "../loader"
import { deleteReminder, getReminders } from "~/firebase"
import { useUser } from "../user/hooks"

const Reminders: React.FC = () => {
  const [reminders, setReminders] = React.useState<Reminder[]>([])
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")
  const user = useUser()
  const history = useHistory()

  React.useEffect(() => {
    if(!user) return
    getReminders(user.id)
      .then(r =>{
        const typedLabels = r as Reminder[]
        setReminders(typedLabels)
        setStatus("resolved")
      })
  },[])

  const handleDelete = async (reminder:Reminder) => {
    const reminderIndex = reminders.findIndex( r => r.id === reminder.id)
    await deleteReminder(reminder.id)
    setReminders(reminders.splice(reminderIndex, 1))
  }

  const handleEdit = (reminder:Reminder) => {
    history.push(`/edit/reminder/${reminder.id}`)
  }

  if(status ==="pending"){
    return(
      <>
        <Helmet>
          <title>Loading. . .</title>
        </Helmet>
        <Loader/>
      </>
    )
  }
  return (
    <>
      <Helmet>
        <title>PNotes | Reminders </title>
      </Helmet>
      {reminders.length === 0 && <div className={styles.message}>Add Reminders by clicking the <span className="material-icons">add</span> icon below!</div>}
      <div className={styles.container}>
        { reminders.map( (r) => 
          <div key={r.id} className={styles.reminder}>
            <div onClick={() => handleEdit(r)}>
              <span className="material-icons">alarm</span>
              <div className={styles.content}>
                <div>
                  <h3>{r.title}</h3>
                  <h4>{r.description}</h4>
                </div>
                <div>
                  <h3>{new Date(r.createDate).toLocaleDateString() + "-" + r.hour + "hr"}</h3>
                  <h4>{r.type}</h4>
                </div>
              </div>
            </div>
            <a onClick={() => handleDelete(r)} ><span className={`material-icons ${styles.delete}`}>delete</span></a> 
          </div>)
        }
       
      </div>
    </>
  )
}

export default Reminders
