import { useState, useEffect} from 'react'
import React from 'react';
import { Redirect, Route } from 'react-router'
// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../contexts/AuthContext';

type PropsType = {
  component: any,
  path: string,
  isAuthenticated: boolean,
  user: Object
}

const AuthRoute = ({ component: Component, path,isAuthenticated,  title, ...rest }: PropsType) => {
  // const [canRender, setCanRender] = useState(false)
  const {currentUser}=useAuth()

  
  // const token = useSelector((state: any) => state.token)
  // const user = useSelector((state: any) => state.user)
  // useEffect(() => {
  //   if (title) {
  //     document.title = title
  //   }
  // }, [title])

  // useEffect(() => {
  //   // allows user be redirected from wallet
  //   // using direct link without redirect on main page
  //   if (!isAuthenticatedFire) {
  //     setTimeout(() => {
  //       setCanRender(true)
  //     }, 2000)
  //   } else {
  //     setCanRender(true)
  //   }
  // }, [])

  // if (!canRender) {
  //   return (
  //     <div className="main-spinner">
  //       <CircularProgress />
  //     </div>
  //   )
  // }
  return (
    <Route
      {...rest}
      render={(props: Object) =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: path }
            }}
          />
        )
      }
    />
  )
}



export default AuthRoute
