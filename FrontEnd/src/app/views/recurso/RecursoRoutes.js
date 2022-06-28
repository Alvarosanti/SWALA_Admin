import ListRecurso from "./ListRecurso"
import AddRecurso from "./AddRecurso"

const recursoRoutes = [
    {
        path: '/recurso/listar',
        element: <ListRecurso />,
    },
    {
        path: '/recurso/agregar',
        element: <AddRecurso />,
    },
    {
        path: '/recurso/editar',
        element: <AddRecurso />,
    }
]

export default recursoRoutes