import ListProduct from "./ListProduct"
import AddProduct from "./AddProduct"

const productsRoutes = [
    {
        path: '/producto/listar',
        element: <ListProduct />,
    },
    {
        path: '/producto/agregar',
        element: <AddProduct />,
    }
]

export default productsRoutes