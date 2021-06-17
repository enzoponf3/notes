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


//--- User authentication ---//

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


//--- Add elements to firebase collection ---//

export const addNote = (note: Note) =>{
  return db.collection("notes").add(note)
}

export const addReminder = (reminder:Reminder) => {
  return db.collection("reminders").add(reminder)
}

export const addLabel = (label:Label) => {
  return db.collection("labels").add(label)
}


//--- Retrieve collection data ---//

const getFirebaseCollection = (userId: string, type: string) => {
  return(
    db.collection(type)
      .where("userId", "==", userId)
      .get()
      .then(({docs}) => {
        return docs.map( doc => {
          return{
            ...doc.data(),
            id: doc.id,
          }
        })
      })
  )
}
    
export const getNotes = (userId: string) =>{
  return getFirebaseCollection(userId, "notes")
}
    
export const getReminders = (userId: string) =>{
  return getFirebaseCollection(userId, "reminders")
}
    
export const getLabels = (userId: string) => {
  return getFirebaseCollection(userId, "labels")
}


//--- Retrieve a single element ---//

export const getFirebaseElement = (elementId: string, type: string) => {
  return db.collection(type)
    .doc(elementId)
    .get()
    .then( doc => {
      return {
        ...doc.data(),
        id: doc.id
      }})
}

export const getNote = (noteId: string) => {
  return getFirebaseElement(noteId, "notes")
}

export const getReminder = (reminderId: string) => {
  return getFirebaseElement(reminderId, "reminders")
}

export const getLabel = (labelId: string) => {
  return getFirebaseElement(labelId, "labels")
}
    

//--- Update elements content ---//

export const updateNote = (noteId: string, note: Note) => {
  return db.collection("notes").doc(noteId).update(note)
}

export const updateReminder = (reminderId: string, reminder: Reminder) => {
  return db.collection("reminders").doc(reminderId).update(reminder)
}

export const updateLabel = (labelId: string, label: Label) => {
  return db.collection("labels").doc(labelId).update(label)
}


//--- Delete elements ---//

export const deleteNote = (noteId: string) => {
  return db.collection("notes").doc(noteId).delete()
}

export const deleteReminder = (reminderId: string) => {
  return db.collection("reminders").doc(reminderId).delete()
}

export const deleteLabel = (labelId: string) => {
  return db.collection("labels").doc(labelId).delete()
}
