import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb, ConfirmationDialog } from '../../../app/components'
import { styled, Box } from '@mui/system'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Avatar,
    Tooltip,
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

//useHistory(v5rrd) x useNavigate(v6^rrd)
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const apiUrl = 'http://localhost:4000/api'

const ListProduct = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [products, setProduct] = useState([])
    const [productId, setIdProduct] = useState(null)
    const [productName, setNameProduct] = useState(null)
    const [productState, setProductState] = useState('')
    const [isOpenModalChangeState, setIsOpenModalChangeState] = useState(false)
    const navigate = useNavigate()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleProductDetail = (idProduct) => {
        navigate(`/producto/editar?codigo=${idProduct}&isEditable=false`)
    }

    const handleProductEdit = (idProduct) => {
        navigate(`/producto/editar?codigo=${idProduct}&isEditable=true`)
    }

    const handleOpenModalChangeState = (idProduct, productName, productState) => {
        setIsOpenModalChangeState(true)
        setIdProduct(idProduct)
        setNameProduct(productName)
        setProductState(productState)
    }

    const handleCloseModal = () => {
        setIsOpenModalChangeState(false)
    }

    const handleChangeState = () => {
        // setIsLoading(true)
        axios
            .post(`${apiUrl}/productos/anular`, {
                // id: productId,
            })
            .then(
                (response) => {
                    // setIsOpenModal(false)
                    // loadTableData()
                },
                (error) => {
                    // setIsOpenModal(false)
                }
            )
    }

    useEffect(() => {
        axios.get(`${apiUrl}/product`)
            .then((response) => {
                setProduct(response.data.products)
            },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    return (
        <div>
            {
                (products.length)
                    ? <Container>
                        <div className="breadcrumb">
                            <Breadcrumb
                                routeSegments={[
                                    { name: 'Listado', path: '/producto/listar' },
                                    { name: 'Productos' },
                                ]}
                            />
                        </div>
                        <SimpleCard title="Productos">
                            <Box width="100%" overflow="auto">
                                <StyledTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Codigo producto</TableCell>
                                            <TableCell>Precio/u{' '}(S/.)</TableCell>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((product, index) => (
                                                <TableRow key={product.producto_id}>
                                                    <TableCell >
                                                        <div style={{ position: 'relative', float: 'left', textAlign: 'right' }}>
                                                            <Avatar
                                                                src={product.images[0].url}
                                                                sx={{ cursor: 'pointer' }}>
                                                            </Avatar>
                                                        </div>
                                                        <div style={{ paddingTop: '10px', paddingLeft: '50px' }}>
                                                            {product.nombre}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {`0${product.producto_id}`}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {product.precio}
                                                    </TableCell>
                                                    <TableCell>{product.estado}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Visualizar">
                                                            <IconButton
                                                                onClick={() => handleProductDetail(product._id)}
                                                            >
                                                                <Icon color="primary">visibility</Icon>
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Editar">
                                                            <IconButton
                                                                onClick={() => handleProductEdit(product._id)}
                                                            >
                                                                <Icon color="primary">edit</Icon>
                                                            </IconButton>
                                                        </Tooltip>
                                                        {
                                                            product.estado === 'habilitado'
                                                                ? (
                                                                    <>
                                                                        <Tooltip title="Deshabilitar">
                                                                            <IconButton
                                                                                onClick={() => { handleOpenModalChangeState(product._id, product.nombre, product.estado) }}
                                                                            >
                                                                                <Icon color="error">do_not_disturb_alt</Icon>
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </>
                                                                )
                                                                : (
                                                                    <>
                                                                        < Tooltip title="Habilitar">
                                                                            <IconButton
                                                                                onClick={() => { handleOpenModalChangeState(product._id, product.nombre, product.estado) }}
                                                                            >
                                                                                <Icon color="primary">check</Icon>
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </>
                                                                )
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </StyledTable>
                                <TablePagination
                                    sx={{ px: 2 }}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={products.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Box >
                        </SimpleCard>
                    </Container>
                    : <div>No hay productos en el catalogo</div>
            }


            {/* modal confirmation state */}
            <ConfirmationDialog
                open={isOpenModalChangeState}
                onConfirmDialogClose={handleCloseModal}
                onYesClick={handleChangeState}
                title={productState === 'habilitado' ? 'Deshabilitar producto' : 'Habilitar producto'}
                text={
                    <>
                        {`¿Esta seguro que desea ${productState === 'habilitado' ? 'deshabilitar' : 'habilitar'} el producto`} {' '}<strong>{`${productName}`}</strong>{'?'}
                    </>
                }
                productState={productState}
            />
        </div >


    )
}

export default ListProduct;
