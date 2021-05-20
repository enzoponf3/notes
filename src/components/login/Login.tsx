import * as React from "react"

import styles from "./Login.module.scss"
import logo from "~/assets/logo.svg"
import google from "~/assets/googleLogo.svg"
import Loader from "../loader"

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
    <div className={styles.login}>
      <img src={logo} alt="" />
      <div>
        <button className={ status ? `${styles.loginBtn} ${styles.disabled}` : `${styles.loginBtn}` } onClick={handleClick}>
          {status ?  
            <Loader/> : 
            <img src={google} alt="" />
          }
        </button>
        <button className={ status ? `${styles.loginBtn} ${styles.disabled}` : `${styles.loginBtn}`} onClick={handleClick}><span className="material-icons">facebook</span></button>
      </div>
    </div>
  )
}

export default Login
