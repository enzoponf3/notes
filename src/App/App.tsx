/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from "react"
import styles from "./App.module.scss"
import logo from  "../assets/logo.svg"
import {Route, Link, BrowserRouter as Router} from "react-router-dom"
import { useLogout } from "~/components/user/hooks"

import Notes from "~/components/note"
import Labels from "~/components/label"
import Reminders from "~/components/reminder"
import Add from "~/components/add"
import Edit from "~/components/edit"

function App() {
  const [title, setTitle] = React.useState<"Notes" | "Labels" | "Reminders">("Notes")

  const logout = useLogout()
  
  return (
    <Router>

      <div className={styles.app}>
        <header>
          <div>
            <Link to="/" onClick={() => setTitle("Notes")}>
              <img src={logo} alt="ponfe logo"/>
            </Link>
            <span>{title}</span>
          </div>
          <div>
            <a onClick={() => logout()} className="material-icons">logout</a>
          </div>
        </header>
        <nav>
          <ul><Link to="/">Home<span className="material-icons">home</span></Link></ul>
          <ul><Link to="/reminders" onClick={()=>setTitle("Reminders")}>Reminders<span className="material-icons">alarm</span></Link></ul>
          <ul><Link to="/add">Add<span className="material-icons">add</span></Link></ul>
          <ul><Link to="/labels" onClick={()=>setTitle("Labels")}>Labels<span className="material-icons">label</span></Link></ul>
        </nav>
        <Route exact path="/" component={Notes}/>
        <Route path="/notes/:label" exact component={Notes}/>
        <Route path="/labels" exact component={Labels}/>
        <Route path="/reminders" exact component={Reminders}/>
        <Route path="/add" exact component={Add}/>
        <Route path="/edit/:type/:id" exact component = {Edit}/>
      </div>
    </Router>
  )
}

export default App
