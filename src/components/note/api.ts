import { Note } from "./types"
let notes: Note[] = [
  {
    id: "1",
    title:"ESta nota es una prueba ",
    body:"nota 1\nnota",
    createDate: "12031293",
    labels:[],
    favorite:true,
  },
  {
    id: "2",
    title:"ESta nota es una prueba ",
    body:"nota 2\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "3",
    title:"ESta nota es una prueba ",
    body:"nota 3\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "4",
    title:"ESta nota es una prueba ",
    body:"nota 4\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "5",
    title:"ESta nota es una prueba ",
    body:"nota 5\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "6",
    title:"ESta nota es una prueba ",
    body:"nota 6\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "7",
    title:"ESta nota es una prueba ",
    body:"nota 7\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "8",
    title:"ESta nota es una prueba ",
    body:"nota 8\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "9",
    title:"ESta nota es una prueba ",
    body:"nota 9 nota",
    createDate: "12031293",
    labels:[{id:"", title:"ones"}],
    favorite:false,
  },
  {
    id: "10",
    title:"ESta nota es una prueba ",
    body:"nota 10\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "11",
    title:"ESta nota es una prueba ",
    body:"nota 11\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "12",
    title:"ESta nota es una prueba ",
    body:"nota 12\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "13",
    title:"ESta nota es una prueba ",
    body:"nota 13\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "14",
    title:"ESta nota es una prueba ",
    body:"nota 14\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
]

export default{
  list: (): Promise<Note[]> => Promise.resolve(notes),
  add: (note: Note): Promise<boolean> => new Promise( resolve => {
    notes = [...notes, note]
    resolve(true)
  }),
  get: (id: string): Promise<Note | undefined> => new Promise( resolve => {
    resolve (notes.find( n => n.id === id))
  })
}