import * as React from "react"

import styles from "./LabelModal.module.scss"
import {Label} from "../types"

interface Props{
    isOpen: boolean
    label: Label | undefined
    handleSave: () => void
}

const LabelModal: React.FC<Props> = ({isOpen = false, label, handleSave}) => {
  return (
    <div className={isOpen ? ` ${styles.modal} ${styles.open}` : `${styles.modal}` }>
      <button onClick={()=> isOpen = !isOpen}>Close</button>
      {label?.title}
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default LabelModal
