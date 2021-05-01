export interface Note {
    title: string
    body: string[]
    type: "note" | "todo" | "reminder"
    labels: string[]
    createDate: Date
    remindFrecuency: "daily" | "weekly" | "yearly" | "montly"
    remindDate: Date
}