import { Label } from "./types"
let labels: Label[] = [
  {
    id:"12",
    title:"ones"
  },
  {
    id:"123",
    title:"oness"
  },
  {
    id:"13",
    title:"onesss"
  },
  {
    id:"14",
    title:"onesss"
  },
  {
    id:"15",
    title:"onessss"
  },
  {
    id:"16",
    title:"onaaaae"
  },
  {
    id:"17",
    title:"onaae"
  },
  {
    id:"18",
    title:"onea"
  },
  {
    id:"19",
    title:"oneddd"
  },
  {
    id:"121",
    title:"onde"
  }
]

export default {
  list: (): Promise<Label[]> => Promise.resolve(labels),
  add: (label: Label): Promise<boolean> => new Promise( (resolve) =>
  {
    labels = [...labels, label]
    resolve(true)
  }),
  get: (id: string): Promise<Label | undefined> => new Promise( resolve =>{
    resolve( labels.find( l => l.id === id))
  })
}