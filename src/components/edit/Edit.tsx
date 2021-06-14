import * as React from "react"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async" 

import styles from "./Edit.module.scss"

import { Label } from "~/components/label/types"
import { getLabels } from "~/firebase"
import { useUser } from "~/components/user/hooks"
import NoteForm from "~/components/forms/noteForm"
import ReminderForm from "~/components/forms/reminderForm"
import LabelForm from "~/components/forms/labelForm"

const Edit: React.FC = () => {

  const { type, id } = useParams<{type: string, id: string}>()
  const [labels, setLabels] = React.useState<Label[]>([])
  const user = useUser()

  React.useEffect(() => {
    {user && getLabels(user.id).then(l => setLabels(l as Label[]))}
  },[])
  return (
    <>
      <Helmet>
        <title>{`PNotes | Edit ${type}`}</title>
      </Helmet>
      <div className={styles.add}>
        {type === "note" && <NoteForm id={id} labels={labels} userId={user? user.id : ""} />}
        {type === "label" && <LabelForm id={id} userId={user? user.id : ""} />}
        {type === "reminder" && <ReminderForm id={id} userId={user? user.id : ""} />}
        <button>Cancel</button>
      </div>
    </>
  )
}

export default Edit
