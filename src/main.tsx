import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App/App"
import {Provider as UserProvider} from "~/components/user/context"
import { HelmetProvider } from "react-helmet-async"

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
