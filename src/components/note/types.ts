import { Label } from "../label/types"

export interface Note {
    id:string
    title: string
    body: string
    labels: Label[]
    createDate: string
    favorite: boolean
}