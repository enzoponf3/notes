import * as React from "react"

import userContext, {Context} from "./context"

export function useLogout(): Context["actions"]["logout"]{
  const {
    actions: { logout }
  } = React.useContext(userContext)
  return  logout
}

export function useUser(): Context["state"]["user"]{
  const {
    state: { user }
  } = React.useContext(userContext)
  return user
}