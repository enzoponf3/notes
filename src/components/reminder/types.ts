export interface Reminder{
    id:string
    userId: string
    title: string
    description:string
    type: "daily" | "weekly" | "monthly" | "yearly"
    createDate: string
    hour: string
}