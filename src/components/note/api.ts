import { Note } from "./types"
let notes: Note[] = [
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 1","nota"],
    createDate: "12031293",
    labels:[],
    favorite:true,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 2","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 3","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 4","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 5","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 6","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 7","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 8","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 9","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 10","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 11","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 12","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 13","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "wafwfasf",
    title:"ESta nota es una prueba ",
    body:["nota 14","nota"],
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
]

export default{
  list: (): Promise<Note[]> => Promise.resolve(notes),
  add: (note: Note) : Promise<boolean> => new Promise( resolve => {
    notes = [...notes, note]
    resolve(true)
  })
}