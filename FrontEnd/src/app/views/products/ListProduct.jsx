import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
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
} from '@mui/material'
import axios from 'axios'

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        axios.get(`${apiUrl}/product`).then(
            (response) => {
                setProduct(response.data)
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])
    
    return (
        <div>
            <Container>
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
                                    <TableCell>Precio/u</TableCell>
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
                                        <TableRow key={index}>
                                            <TableCell >
                                                <div style={{ position: 'relative', float: 'left', textAlign: 'right' }}>
                                                    <Avatar
                                                        src={product.imagen}
                                                        sx={{ cursor: 'pointer' }}>
                                                    </Avatar>
                                                </div>
                                                <div style={{ paddingTop: '10px', paddingLeft: '50px' }}>
                                                    {product.nombre}
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                {product.producto_id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {product.precio}
                                            </TableCell>
                                            <TableCell>{product.contenido}</TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <Icon color="edi">edit</Icon>
                                                </IconButton>
                                                <IconButton>
                                                    <Icon color="error">do_not_disturb_alt</Icon>
                                                </IconButton>
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
        </div>

    )
}

export default ListProduct;
