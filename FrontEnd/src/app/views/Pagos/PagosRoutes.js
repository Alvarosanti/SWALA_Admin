import ListPago from "./ListPago"
import AddPagos from "./AddPagos"

const pagoRoutes = [
    {
        path: '/pago/listar',
        element: <ListPago />,
    },
    {
        path: '/pago/agregar',
        element: <AddPagos />,
    },
    {
        path: '/pago/editar',
        element: <AddPagos />,
    }
]

export default pagoRoutes