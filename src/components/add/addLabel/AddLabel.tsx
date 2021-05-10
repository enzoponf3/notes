import * as React from "react"

import styles from "./AddLabel.module.scss"

const AddLabel: React.FC = () => {
  return (
    <div>
      <form action="submit">
        <label>
                    Title
          <input type="text" />
        </label>
        <button type="button">Save Label</button>
      </form>
    </div>
  )
}

export default AddLabel
