import * as React from "react"
import { Label } from "~/components/label/types"

import styles from "./AddLabel.module.scss"
import api from "~/components/label/api"

interface Props{
  id: string
}

const AddLabel: React.FC<Props> = ({ id }) => {
  const [disabled, setDisabled] = React.useState<boolean>(false)
  const label: Label = {
    id:"",
    title:""
  }

  const handleSubmit = () => {
    if(label.title === "") return 
    setDisabled(true)
    api.add(label)
      .then(r => {
        console.log(r)
        document.location.href= "/labels"
      })

  }

  return (
    <div className={styles.addLabel}>
      <form action="submit">
        <label>
          Title
          <input type="text" onChange={e => label.title = e.target.value}/>
        </label>
        <button disabled={disabled} onClick={handleSubmit} type="button">Save Label</button>
      </form>
    </div>
  )
}

export default AddLabel
