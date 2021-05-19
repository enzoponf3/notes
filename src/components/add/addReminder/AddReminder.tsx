import * as React from "react"

import styles from "./AddReminder.module.scss"
import api from "~/components/reminder/api"

import { Reminder } from "~/components/reminder/types"

interface Props{
  id: string
}

const AddReminder: React.FC<Props> = ({id=""}) => {
  const [disabled, setDisabled] = React.useState<boolean>(false)
  type frecuency = "daily" | "weekly" | "monthly" | "yearly"
  const [reminder, setReminder]= React.useState<Reminder>({
    id:"",
    title:"",
    description:"",
    hour:"",
    type:"daily",
    createDate:""
  })
  React.useEffect(() => {
    if(id !== ""){
      api.get(id)
        .then(r => {
          if(r !== undefined){
            setReminder(r)
          }
        })
    }
  },[id])

  const handleSubmit = () => {
    if(reminder.title === "") return
    setDisabled(true)
    api.add(reminder)
      .then(() => {
        document.location.href = "/reminders"
      })
  }
  return (
    <div className={styles.addReminder}>
      <form action="submit">
        <label>
            Title
          <input value={reminder.title} type="text" onChange={e => setReminder({
            id:reminder.id,
            title:e.target.value,
            description:reminder.description,
            hour:reminder.hour,
            type:reminder.type,
            createDate:reminder.createDate
          })} 
          />
        </label>
        <label>
            Description
          <input value={reminder.description} type="text" onChange={e => setReminder({
            id:reminder.id,
            title:reminder.title,
            description:e.target.value,
            hour:reminder.hour,
            type:reminder.type,
            createDate:reminder.createDate
          })} 
          />
        </label>
        <div className={styles.selectors}>
          <label htmlFor="">Frecuency</label>
          <select onChange={e => setReminder({
            id:reminder.id,
            title:reminder.title,
            description:reminder.description,
            hour:reminder.hour,
            type:e.target.value as frecuency,
            createDate:reminder.createDate
          })}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <label htmlFor="">Hour</label>
          <select onChange={e => setReminder({
            id:reminder.id,
            title:reminder.title,
            description:reminder.description,
            hour:e.target.value,
            type:reminder.type,
            createDate:reminder.createDate
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
        <button disabled={disabled} type="button" onClick={handleSubmit}>Save Reminder</button>
      </form>
    </div>
  )
}

export default AddReminder
