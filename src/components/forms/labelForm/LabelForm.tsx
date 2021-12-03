import * as React from "react"
import { Label } from "~/components/label/types"

import styles from "./LabelForm.module.scss"
//import api from "~/components/label/api"
import { addLabel, getLabel, updateLabel } from "~/firebase"
import { useHistory } from "react-router"

interface Props {
  id: string
  userId: string
}

const AddLabel: React.FC<Props> = ({ id = "", userId }) => {
  const [disabled, setDisabled] = React.useState<boolean>(false)
  const [label, setLabel] = React.useState<Label>({
    id: "",
    userId: userId,
    title: ""
  })
  const history = useHistory()

  React.useEffect(() => {
    if (id !== "") {
      getLabel(id)
        .then(l => {
          if (l !== undefined) {
            setLabel(l as Label)
          }
        })
    }
  }, [id])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (label.title === "") return
    setDisabled(true)
    console.log(label)
    try {
      if (id !== "") {
        await updateLabel(id, label).then(() => console.log("updated"))
      } else {
        await addLabel(label).then(() => console.log("added"))
      }
      history.push("/")
    } catch (error) {
      setDisabled(false)
      console.log("something went wrong", error)
    }
  }

  return (
    <div className={styles.addLabel}>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input value={label.title} type="text" onChange={e => setLabel({
            ...label, title: e.target.value
          })} />
        </label>
        <button disabled={disabled}>Save Label</button>
      </form>
      {id && <button className={styles.cancelBtn} type="button" onClick={() => history.goBack()}>Cancel</button>}
    </div>
  )
}

export default AddLabel
