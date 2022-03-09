import React from 'react'
const Home = React.lazy(() => import('../containers/homePage/homePage'))
const Login=React.lazy(() => import('../containers/login'))
const CarPartner = React.lazy(() => import('../containers/carPartner'))
const Register=React.lazy(() =>import('../containers/registerPage/RegisterPage'))

const routes = [
    {
        path: '/',
        exact: true,
        name: 'Home',
        component: Home,
        authRequired: false
      },
      {
        path: '/carpartner',
        exact: true,
        name: 'CarPartner',
        component: CarPartner,
        authRequired: true
      },
      {
        path: '/login',
        exact: true,
        name: 'Login',
        component: Login,
        authRequired: false
      },
      {
        path: '/register',
        exact: true,
        name: 'Register',
        component: Register,
        authRequired: false
      },
]
export default routes