import * as React from "react"
import Loader from "../loader"
import Login from "../login"

import api from "./api"
import { User } from "./types"

export interface Context {
    state:{
        user: User | undefined
    }
    actions:{
        login: () => void
        logout: () => void
    }
}

const UserContext = React.createContext({} as Context)

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<User>()
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")

  async function handleLogin(){
    if(user) return
    return api.login()
      .then(u => {
        setUser(u)
        setStatus("resolved")
      })
  }

  async function handleLogout() {
    if(!user) return
    return api.logout()
      .then( u => setUser(u))
  }
  
  if(!user || status === "pending"){
    return(
      <Login handleLogin={ () => handleLogin() }/>
    )
  }

  const state: Context["state"] = {
    user
  }

  const actions = {
    login: handleLogin,
    logout: handleLogout
  }

  return <UserContext.Provider value={{state, actions}}>{children}</UserContext.Provider>
}
export {UserContext as default, UserProvider as Provider}
