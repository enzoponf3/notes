import * as React from "react"

import styles from "./ReminderModal.module.scss"
import { Reminder } from "../types"

interface Props{
    isOpen: boolean
    reminder: Reminder | undefined
    handleSave: () => void
}

const ReminderModal: React.FC<Props> = ({isOpen = false, reminder, handleSave}) => {
  return (
    <div className={isOpen ? `${styles.modal} ${styles.open}` : `${styles.modal}`}>
      {reminder?.title}
    </div>
  )
}

export default ReminderModal
