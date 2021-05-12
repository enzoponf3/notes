import { Reminder } from "./types"
let reminders: Reminder[] = [
  {
    id: "1",
    title: "Meet with team",
    description:"Daily talk",
    type: "daily",
    createDate: "tuesday",
    hour: "08:00"
  },
  {
    id: "2",
    title: "Sprint",
    description: "Weekly stand up",
    type: "weekly",
    createDate: "monday",
    hour: "14:00"
  },
]

export default {
  list : () : Promise<Reminder[]> => Promise.resolve(reminders),
  add: (reminder: Reminder): Promise<boolean> => new Promise(resolve => {
    reminders = [...reminders, reminder]
    resolve (true)
  })
}