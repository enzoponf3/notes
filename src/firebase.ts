/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"
import { Label } from "./components/label/types"
import { Note } from "./components/note/types"
import { Reminder } from "./components/reminder/types"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROYECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

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
  return firebase.auth().signInWithRedirect(googleProvider)
}

export const logout = () => {
  return firebase.auth().signOut()
}

export const addNote = (note: Note) =>{
  return db.collection("notes").add(note)
}

export const addReminder = (reminder:Reminder) => {
  return db.collection("reminders").add(reminder)
}

export const addLabel = (label:Label) => {
  return db.collection("labels").add(label)
}

export const getNotes = (userId: string) =>{
  return (db.collection("notes")
    .where("userId", "==", userId)
    .get()
    .then(({docs}) => {
      return docs.map( doc => {
        const id = doc.id
        const data = doc.data()
        const note = data as Note
        return{
          ...note,
          id,
        }
      })
    }))
}

export const getReminders = (userId: string) =>{
  return (db.collection("reminders")
    .where("userId", "==", userId)
    .get()
    .then(({docs}) => {
      return docs.map( doc => {
        const id = doc.id
        const data = doc.data()
        const reminder = data as Reminder
        return{
          ...reminder,
          id,
        }
      })
    }))
}

export const getLabels = (userId: string) => {
  return (db.collection("labels")
    .where("userId", "==", userId)
    .get()
    .then(({docs}) => {
      return docs.map( doc => {
        const id = doc.id
        const data = doc.data()
        const labels = data as Label
        return{
          ...labels,
          id,
        }
      })
    }))
}

