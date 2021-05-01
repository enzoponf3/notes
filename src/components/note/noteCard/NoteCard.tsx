import * as React from "react"

import styles from "./NoteCard.module.scss"
import {Note} from "../types"



const NoteCard: React.FC = () => {
  return (
    <div className={styles.noteCard}>
      <div><h3>titledubsdubusdgusidgvbdsvgdsv</h3></div>
      <div className={styles.bodyCard}>
        <div>
            dasda isfiavsi fvaisv  fiavfiavsifvas
          <br/>
            sdbgisbdg sdbgisdbgbs
          <br/><br/>
            fisdgbidb gibsdgbfgb
          <br/>
            rbebrbewrwe irwie rbwer
            asdasd asfasfaf gdsgdggsd sadas sdadasd safafasfasfasfasf
        </div>    
    
      </div>
      <div className={styles.footCard}>
        <span className={`material-icons ${styles.selected}`}>delete</span>
        <span className="material-icons">favorite</span>
      </div>
    </div>
  )
}

export default NoteCard
