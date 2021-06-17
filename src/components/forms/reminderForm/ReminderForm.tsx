import * as React from "react"
import { useHistory } from "react-router-dom"
import styles from "./ReminderForm.module.scss"
//import api from "~/components/reminder/api"

import { Reminder } from "~/components/reminder/types"
import { addReminder, getReminder, updateReminder } from "~/firebase"

interface Props{
  id: string
  userId: string
}

const ReminderForm: React.FC<Props> = ({id="", userId}) => {
  const [disabled, setDisabled] = React.useState<boolean>(false)
  type frecuency = "daily" | "weekly" | "monthly" | "yearly"
  const [reminder, setReminder]= React.useState<Reminder>({
    id:"",
    userId:userId,
    title:"",
    description:"",
    hour:"",
    type:"daily",
    createDate:""
  })
  const history = useHistory()

  React.useEffect(() => {
    if(id !== ""){
      getReminder(id)
        .then(r => {
          if(r !== undefined){
            setReminder(r as Reminder)
          }
        })
    }
  },[id])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async ( e: any) => {
    e.preventDefault()
    if(reminder.title === "") return
    setDisabled(true)
    reminder.createDate = String(new Date)
    try {
      if(id !== ""){
        await updateReminder(id, reminder)
      }else{
        await addReminder(reminder)
      }
      history.push("/")
    } catch (error) {
      setDisabled(false)
      console.log("something went wrong", error)
    }
  }
  return (
    <div className={styles.addReminder}>
      <form onSubmit={handleSubmit}>
        <label>
            Title
          <input value={reminder.title} type="text" onChange={e => setReminder({
            ...reminder, title: e.target.value
          })} 
          />
        </label>
        <label>
            Description
          <input value={reminder.description} type="text" onChange={e => setReminder({
            ...reminder, description: e.target.value
          })} 
          />
        </label>
        <div className={styles.selectors}>
          <label htmlFor="">Frecuency</label>
          <select onChange={e => setReminder({
            ...reminder, type: e.target.value as frecuency
          })}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <label htmlFor="">Hour</label>
          <select onChange={e => setReminder({
            ...reminder, hour: e.target.value
          })}>
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
          </select>
        </div>
        <button disabled={disabled}>Save Reminder</button>
      </form>
      {id && <button className={styles.cancelBtn} type="button" onClick={() => history.goBack()}>Cancel</button>}
    </div>
  )
}

export default ReminderForm
