import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const CarPartner = () => {
  const {currentUser}=useAuth()
  return (
    <>
    {currentUser && <pre> {JSON.stringify(currentUser, null, 2)}</pre>}
    </>
  )
}

export default CarPartner