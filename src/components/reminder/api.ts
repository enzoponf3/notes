import { Reminder } from "./types"
let reminders: Reminder[] = [
  {
    id: "1",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title: "Meet with team",
    description:"Daily talk",
    type: "daily",
    createDate: "tuesday",
    hour: "08:00"
  },
  {
    id: "2",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
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
  }),
  get: (id: string): Promise<Reminder | undefined> => new Promise(resolve => {
    resolve (reminders.find(r => r.id === id))
  })
}