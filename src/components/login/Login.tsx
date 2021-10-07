import * as React from "react"

import styles from "./Login.module.scss"
import note from "~/assets/noteIcon.svg"
import blob from "~/assets/blob.svg"
import blob1 from "~/assets/blob1.svg"
import google from "~/assets/googleLogo.svg"
import Loader from "../loader"
import { Helmet } from "react-helmet-async"

interface Props{
    handleLogin: () => void
}

const Login: React.FC<Props> = ({handleLogin}) => {
  const [status, setStatus] = React.useState<boolean>(false)

  const handleClick = () =>{
    setStatus(true)
    handleLogin()
  }

  return (
    <>
      <Helmet>
        <title>Ponfe Notes | Login</title>
        <meta name="descripion" content="Your application to take notes 📝, add them to favorites ♥ or filter by labels 🏷"/>
        <meta name="twitter:site" content="@enzoponf3" />
        <meta name="twitter:creator" content="@enzoponf3" />
        <meta name="title" content="PonfeNotes | Notes Application"/>
        <meta name="twitter:card" content="summary_large_image" />
        
      </Helmet>
      <div className={styles.login}>
        <div className="container">
          <div className={styles.presentation}>
            <h4>Welcome 👋 to your aplication to</h4>
            <h1>Take Notes</h1>
            <h2>Notes, labels and reminders</h2>
            <h3>Add notes to favorites or filter by labels</h3>
            <button className={ status ? `${styles.loginBtn} ${styles.disabled}` : `${styles.loginBtn}` } onClick={handleClick}>
              {status ?  
                <Loader/> : 
                <img src={google} alt="google" />
              }
            </button>
            <p>Sign in with your Google Account</p>
          </div>
          <div className={styles.images}>
            <img id={styles.noteIcon} src={note} alt="Paper sheet" />
            <img id={styles.blob} src={blob} alt="bubble" />
            <img id={styles.blob1} src={blob1} alt="bubble" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
