import ListProvider from "./ListProvider"
import AddProvider from "./AddProvider"

const providersRoutes = [
    {
        path: '/proveedor/listar',
        element: <ListProvider />,
    },
    {
        path: '/proveedor/agregar',
        element: <AddProvider />,
    },
    {
        path: '/proveedor/editar',
        element: <AddProvider />,
    }
]

export default providersRoutes