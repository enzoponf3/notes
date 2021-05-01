/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from "react"
import styles from "./App.module.scss"
import logo from  "../assets/logo.svg"

import Notes from "~/components/note"

function App() {
  const [title, setTitle] = React.useState<"Notes" | "Labels" | "Reminders">("Notes")
  const [filter, setFilter] = React.useState<string>("none")

  return (
    <div className={styles.app}>
      <header>
        <div>
          <span>{title}</span>
        </div>
        <div>
          <a href="/">
            <img src={logo} alt="ponfe logo"/>
          </a>
        </div>
      </header>
      <Notes filter={filter}/>
      <nav>
        <button onClick={()=>setTitle("Labels")}>Labels</button>
        <button><span className="material-icons">add</span></button>
        <button onClick={()=>setTitle("Reminders")}>Reminders</button>
      </nav>
    </div>
  )
}

export default App
