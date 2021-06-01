import * as React from "react"
import { Label } from "~/components/label/types"

import styles from "./AddLabel.module.scss"
import api from "~/components/label/api"

interface Props{
  id: string
  userId: string
}

const AddLabel: React.FC<Props> = ({ id = "", userId }) => {
  const [disabled, setDisabled] = React.useState<boolean>(false)
  const [label, setLabel] = React.useState<Label>({
    id:"",
    userId:userId,
    title:""
  })

  React.useEffect(() => {
    if(id !== ""){
      api.get(id)
        .then(l => {
          if(l !== undefined){
            setLabel(l)
          }
        })
    }
  },[id])

  const handleSubmit = () => {
    if(label.title === "") return 
    setDisabled(true)
    api.add(label)
      .then( () =>
        document.location.href="/labels"
      )

  }

  return (
    <div className={styles.addLabel}>
      <form action="submit">
        <label>
          Title
          <input value={label.title} type="text" onChange={e => setLabel({
            ...label, title: e.target.value
          }) }/>
        </label>
        <button disabled={disabled} onClick={handleSubmit} type="button">Save Label</button>
      </form>
    </div>
  )
}

export default AddLabel
