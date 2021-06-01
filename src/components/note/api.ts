import { Note } from "./types"

const notes: Note[] = [
  {
    id: "1",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 1\nnota",
    createDate: "12031293",
    labels:[],
    favorite:true,
  },
  {
    id: "2",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 2\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "3",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 3\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "4",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 4\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "5",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 5\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "6",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 6\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "7",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 7\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "8",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 8\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "9",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 9 nota",
    createDate: "12031293",
    labels:[{id:"",
      userId:"3Yi2sDk6MucHElfFSI7VswgGn583", title:"ones"}],
    favorite:false,
  },
  {
    id: "10",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 10\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "11",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 11\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "12",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 12\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "13",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 13\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
  {
    id: "14",
    userId:"3Yi2sDk6MucHElfFSI7VswgGn583",
    title:"ESta nota es una prueba ",
    body:"nota 14\nnota",
    createDate: "12031293",
    labels:[],
    favorite:false,
  },
]

export default{
  list: (): Promise<Note[]> => new Promise(resolve => {
    resolve(notes)
  }),
  get:() : Promise<Note> => new Promise(resolve => {
    resolve(notes[1])
  }),
  add:(note: Note): Promise<boolean> => new Promise( () => {return true})
}