import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../utlis/init-firebase'
import { signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword} from "firebase/auth"

const AuthContext=createContext({
    currentUser:null,
    loginFirebase: () => Promise,
    register:()=>Promise,
    isAuthenticatedFire:false,
    setIsAuthenticatedFire:()=>Promise,
    
})


  export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [isAuthenticatedFire,setIsAuthenticatedFire]=useState(false)

    
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user ? user : null)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser])

  function loginFirebase (email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const value = {
    currentUser,
    loginFirebase,
    register,
    isAuthenticatedFire,
    setIsAuthenticatedFire

  }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}