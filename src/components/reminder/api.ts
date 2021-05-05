import { Reminder } from "./types"

export default {
  list : () : Promise<Reminder[]> => Promise.resolve(
    [
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
    ])
}