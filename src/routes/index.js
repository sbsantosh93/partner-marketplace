import React from 'react'
const Home = React.lazy(() => import('../containers/login'))
const CarPartner = React.lazy(() => import('../containers/login'))

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
]
export default routes