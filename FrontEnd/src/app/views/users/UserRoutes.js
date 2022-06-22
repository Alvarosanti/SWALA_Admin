import ListUser from "./ListUser"
import AddUser from "./AddUser"

const userRoutes = [
    {
        path: '/usuario/listar',
        element: <ListUser />,
    },
    {
        path: '/usuario/agregar',
        element: <AddUser />,
    },
    {
        path: '/usuario/editar',
        element: <AddUser />,
    }
]

export default userRoutes