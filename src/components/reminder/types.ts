export interface Reminder{
    id: string
    title: string
    description:string
    type: "daily" | "weekly" | "monthly" | "yearly"
    createDate: string
    hour: string
}