import { Label } from "./types"
let labels: Label[] = [
  {
    id:"12",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ones"
  },
  {
    id:"123",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"oness"
  },
  {
    id:"13",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"onesss"
  },
  {
    id:"14",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"onesss"
  },
  {
    id:"15",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"onessss"
  },
  {
    id:"16",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"onaaaae"
  },
  {
    id:"17",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"onaae"
  },
  {
    id:"18",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"onea"
  },
  {
    id:"19",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"oneddd"
  },
  {
    id:"121",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"onde"
  }
]

export default {
  list: (): Promise<Label[]> => new Promise(resolve =>{
    resolve(labels)
  }),
  add: (label: Label): Promise<boolean> => new Promise( (resolve) =>
  {
    labels = [...labels, label]
    resolve(true)
  }),
  get: (id: string): Promise<Label | undefined> => new Promise( resolve =>{
    resolve( labels.find( l => l.id === id))
  })
}