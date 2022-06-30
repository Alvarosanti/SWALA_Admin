import React from 'react'
import { Navigate } from 'react-router-dom'
import chartsRoute from './views/charts/ChartsRoute'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import productsRoutes from './views/products/ProductsRoutes'
import userRoutes from './views/oc/OcRoutes'

import recursoRoutes from './views/recurso/RecursoRoutes'

import providersRoutes from './views/providers/ProviderRoutes'


const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Navigate to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Navigate to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...materialRoutes,
    ...chartsRoute,
    ...redirectRoute,
    ...errorRoute,
    ...productsRoutes,
    ...userRoutes,

    ...recursoRoutes,

    ...providersRoutes,

]

export default routes
