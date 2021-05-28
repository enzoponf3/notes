import * as React from "react"
import Login from "../login"

import { User } from "./types"
import * as firebase from "~/firebase"
import Loader from "../loader"


export interface Context {
    state:{
        user: User | undefined
    }
    actions:{
      logout: () => Promise<void>
    }
}

const UserContext = React.createContext({} as Context)

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<User>()
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")

  React.useEffect(() => {
    firebase.onAuthStateChanged(setUser)
    setTimeout(() => {
      setStatus("resolved")
    }, 800)
  },[user])

  async function handleLogin(){
    if(user) return
    firebase.googleLogin()
      .then(()=>setStatus("resolved"))
    return
  }

  async function handleLogout(){
    if(!user) return
    await firebase.logout()
    setUser(undefined)
  }

  if(status === "pending"){
    return(
      <Loader/>
    )
  }
  
  if(!user){
    return(
      <Login handleLogin={ handleLogin }/>
    )
  }

  const state: Context["state"] = {
    user
  }

  const actions = {
    logout : handleLogout
  }

  return <UserContext.Provider value={{state, actions}}>{children}</UserContext.Provider>
}
export {UserContext as default, UserProvider as Provider}
