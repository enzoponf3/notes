import { Label } from "../label/types"

export interface Note {
    id: string
    userId:string
    title: string
    body: string
    labels: Label[]
    createDate: string
    favorite: boolean
}