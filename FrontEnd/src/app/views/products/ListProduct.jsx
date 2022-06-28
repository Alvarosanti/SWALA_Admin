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
    LinearProgress,
    TextField,
} from '@mui/material'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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
    const [isLoading, setLoading] = useState(false);
    const [status, setStatus] = React.useState('habilitado');
    const [search, setSearch] = useState('')

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
        if (productState === 'habilitado') {
            //deshabilitar api
            axios
                .put(`${apiUrl}/product/updateProductState/${productId}`, {
                    estado: "desactivado",
                })
                .then(
                    (response) => {
                        setIsOpenModalChangeState(false)
                        loadTableData()
                    },
                    (error) => {
                        console.log("🚀 ~ file: ListProduct.jsx ~ line 110 ~ handleChangeState ~ error", error)
                        setIsOpenModalChangeState(false)
                    }
                )
        } else {
            //habilitar api
            axios
                .put(`${apiUrl}/product/updateProductState/${productId}`, {
                    estado: "habilitado",
                })
                .then(
                    (response) => {
                        setIsOpenModalChangeState(false)
                        loadTableData()
                    },
                    (error) => {
                        console.log("🚀 ~ file: ListProduct.jsx ~ line 110 ~ handleChangeState ~ error", error)
                        setIsOpenModalChangeState(false)
                    }
                )
        }
    }

    const loadTableData = () => {
        setTimeout(() => {
            axios.get(`${apiUrl}/product`)
                .then((response) => {
                    setProduct(response.data.products)
                },
                    (error) => {
                        console.log(error)
                    }
                )
        }, 1000)
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            axios.get(`${apiUrl}/product`)
                .then((response) => {
                    setProduct(response.data.products)
                    console.log(response.data.products)
                    setLoading(false)
                },
                    (error) => {
                        console.log(error)
                    }
                )
        }, 1000)
    }, [])

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    }

    const dataSource =
        (search)
            ?
            search.trim().length === 0
                ? products
                : products.filter((c) => {
                    let field = c.nombre + ' ' + c.producto_id
                    field = field.toLowerCase()
                    const query = search.toLowerCase()
                    return field.indexOf(query) !== -1
                })
            :
            status.trim().length === 0
                ? products
                : products.filter((c) => {
                    let field = c.estado
                    field = field.toLowerCase()
                    const query = status.toLowerCase()
                    return field.indexOf(query) !== -1
                })
                console.log(dataSource)

    return (
        <div>
            {
                <Container>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                { name: 'Listado', path: '/producto/listar' },
                                { name: 'Productos' },
                            ]}
                        />
                    </div>
                    {
                        !isLoading
                            ?
                            <SimpleCard title="Productos">
                                <div>
                                    <FormControl sx={{ marginRight: 1, marginTop: 1 }}>
                                        <TextField
                                            placeholder='Buscar...'
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            style={{ width: '350px' }}
                                            suffix={
                                                search ? (
                                                    <a onClick={() => setSearch('')} />
                                                ) : ''
                                            }
                                        />
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="Estado"
                                            onChange={handleChangeStatus}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            <MenuItem value={'habilitado'}>Habilitado</MenuItem>
                                            <MenuItem value={'desactivado'}>Desactivado</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <Box width="100%" overflow="auto">
                                    <StyledTable >
                                        <TableHead>
                                            <TableRow width={800}>
                                                <TableCell width={300}>Nombre</TableCell>
                                                <TableCell width={100}>Codigo producto</TableCell>
                                                <TableCell width={100}>Precio/u{' '}(S/.)</TableCell>
                                                <TableCell width={100}>Estado</TableCell>
                                                <TableCell width={100}>Acciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dataSource.length !== 0
                                                ?
                                                dataSource
                                                    .slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage + rowsPerPage
                                                    )
                                                    .map((product, index) => (
                                                        <TableRow width={800}>
                                                            <TableCell width={300}>
                                                                <div style={{ position: 'relative', float: 'left', textAlign: 'right' }}>
                                                                    <Avatar
                                                                        src={product.images[0].url}
                                                                        sx={{ cursor: 'pointer' }}>
                                                                    </Avatar>
                                                                </div>
                                                                <div style={{ margin: '10px', paddingLeft: '50px' }}>
                                                                    {product.nombre}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell align="left" width={100}>
                                                                {product.producto_id}
                                                            </TableCell>
                                                            <TableCell align="left" width={100}>
                                                                {product.precio}
                                                            </TableCell>
                                                            <TableCell width={100}>{product.estado}</TableCell>
                                                            <TableCell align="left" width={100}>
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
                                                                                <Tooltip title="Desactivar">
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
                                                    ))
                                                :
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell />
                                                    <TableCell>
                                                        No data
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/windows/32/undefined/no-data-availible.png" />
                                                    </TableCell>
                                                    <TableCell />
                                                    <TableCell />
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </StyledTable>
                                    <TablePagination
                                        sx={{ px: 2 }}
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={dataSource.length}
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
                            :
                            // <CircularProgress className="progress" color="secondary" />
                            <LinearProgress color="secondary" />
                    }
                </Container>
            }

            {/* modal confirmation state edit*/} 
            <ConfirmationDialog
                open={isOpenModalChangeState}
                onConfirmDialogClose={handleCloseModal}
                onYesClick={handleChangeState}
                title={productState === 'habilitado' ? 'Desactivar producto' : 'Habilitar producto'}
                text={
                    <>
                        {`¿Esta seguro que desea ${productState === 'habilitado' ? 'desactivar' : 'habilitar'} el producto`} {' '}<strong>{`${productName}`}</strong>{'?'}
                    </>
                }
                productState={productState}
            />
        </div >
    )
}

export default ListProduct;
