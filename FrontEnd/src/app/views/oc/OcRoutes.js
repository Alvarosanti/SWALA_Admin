import ListOc from "./ListOc"
import AddOc from "./AddOc"

const ocRoutes = [
    {
        path: '/oc/listar',
        element: <ListOc />,
    },
    {
        path: '/oc/agregar',
        element: <AddOc />,
    },
    {
        path: '/oc/editar',
        element: <AddOc />,
    }
]

export default ocRoutes