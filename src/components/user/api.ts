import {User} from "./types"

export default {
  login: (): Promise<User | undefined> => new Promise( resolve => {
    resolve ({id:"1", name:"Enzo"})
  }),
  logout: (): Promise<User | undefined> => new Promise( () => undefined),
}