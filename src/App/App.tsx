/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from "react"
import styles from "./App.module.scss"
import logo from  "../assets/logo.svg"
import {Route, Link, BrowserRouter as Router} from "react-router-dom"

import Notes from "~/components/note"
import Labels from "~/components/label"
import Reminders from "~/components/reminder"
import Add from "~/components/add"


function App() {
  const [title, setTitle] = React.useState<"Notes" | "Labels" | "Reminders">("Notes")
  const [filter, setFilter] = React.useState<string>("")

  return (
    <Router>

      <div className={styles.app}>
        <header>
          <div>
            <span>{title}</span>
          </div>
          <div>
            <Link to="/" onClick={() => setTitle("Notes")}>
              <img src={logo} alt="ponfe logo"/>
            </Link>
          </div>
        </header>
        <nav>
          <ul><Link to="/">Home<span className="material-icons">home</span></Link></ul>
          <ul><Link to="/reminders" onClick={()=>setTitle("Reminders")}>Reminders<span className="material-icons">alarm</span></Link></ul>
          <ul><Link to="/add">Add<span className="material-icons">add</span></Link></ul>
          <ul><Link to="/labels" onClick={()=>setTitle("Labels")}>Labels<span className="material-icons">label</span></Link></ul>
        </nav>
        <Route exact path="/" component={Notes}/>
        <Route path="/labels" exact component={Labels}/>
        <Route path="/reminders" exact component={Reminders}/>
        <Route path="/add" exact component={Add}/>
      </div>
    </Router>
  )
}

export default App
