/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROYECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebase = (user : any) => {
  if(!user) return
  const { displayName, uid } = user
  return {
    id: uid,
    username: displayName
  }
}

export const onAuthStateChanged = (onChange:any) =>{
  return firebase
    .auth()
    .onAuthStateChanged(u => {
      const mappedUser = mapUserFromFirebase(u)
      return ( onChange(mappedUser))
    })
}

export const googleLogin = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const logout = () => {
  firebase.auth().signOut()
}