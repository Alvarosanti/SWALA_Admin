import React, { useState, useEffect } from 'react'
import {
    SimpleCard,
    Breadcrumb,
    ConfirmationDialog,
} from '../../../app/components'
import { styled, Box, useTheme } from '@mui/system'
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
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

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

const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const apiUrl = 'http://localhost:4000/api'

const ListPago = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [pagos, setpagos] = useState([])
    const [pagosId, setIdpagos] = useState(null)
    const [pagosName, setNamepagos] = useState(null)
    const [pagosState, setpagosState] = useState('')
    const [isOpenModalChangeState, setIsOpenModalChangeState] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [status, setStatus] = React.useState('habilitado')
    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handlePagosDetail = (idPagos) => {
        navigate(`/pago/editar?codigo=${idPagos}&isEditable=false`)
    }

    const handlePagosEdit = (idPagos) => {
        navigate(`/pago/editar?codigo=${idPagos}&isEditable=true`)
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            axios.get(`${apiUrl}/pagos`).then(
                (response) => {
                    setpagos(response.data.pagos)
                    setLoading(false)
                    console.log(response.data.pagos)
                },
                (error) => {
                    console.log(error)
                }
            )
        }, 1000)
    }, [])

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    }

    const dataSource = pagos

    return (
        <div>
            {
                <Container>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                { name: 'Listado', path: '/pago/listar' },
                                { name: 'Pedidos' },
                            ]}
                        />
                    </div>
                    {!isLoading ? (
                        <SimpleCard title="Pedidos">
                            <div></div>
                            <Box width="100%" overflow="auto">
                                <StyledTable>
                                    <TableHead>
                                        <TableRow width={500}>
                                            <TableCell width={100}>
                                                Cliente
                                            </TableCell>
                                            <TableCell width={100}>
                                                Email
                                            </TableCell>
                                            <TableCell width={100}>
                                                Fecha de creación
                                            </TableCell>
                                            <TableCell width={100}>
                                                Fecha de entrega
                                            </TableCell>
                                            <TableCell width={100}>
                                                Estado
                                            </TableCell>
                                            <TableCell width={100}>
                                                Acciones
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataSource.length != 0 ? (
                                            dataSource
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage +
                                                    rowsPerPage
                                                )
                                                .map((pagos, index) => (
                                                    <TableRow width={600}>
                                                        <TableCell
                                                            align="left"
                                                            width={50}
                                                            key="Nombre"
                                                        >
                                                            {pagos.nombre}
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            width={100}
                                                            key="email"
                                                        >
                                                            {pagos.email}
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            width={80}
                                                            key="createdAt"
                                                        >
                                                            {moment(
                                                                pagos.createdAt
                                                            ).format(
                                                                'DD/MM/YYYY'
                                                            )}
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            width={100}
                                                            key="FechaEntrega"
                                                        >
                                                            {moment(
                                                                pagos.fechaEntrega
                                                            ).format(
                                                                'DD/MM/YYYY - hh:mm'
                                                            )}
                                                        </TableCell>
                                                        {/* <TableCell
                                                            align="left"
                                                            width={100}
                                                            key="FechaEntrega"
                                                        >
                                                            {pagos.estado}
                                                        </TableCell> */}
                                                        <TableCell
                                                            align="left"
                                                            width={120}
                                                        >
                                                            {pagos.estado ==
                                                                'Pendiente' ? (
                                                                <Small
                                                                    bgcolor={
                                                                        bgError
                                                                    }
                                                                >
                                                                    Pendiente
                                                                </Small>
                                                            ) : pagos.estado ==
                                                                'En proceso' ? (
                                                                <Small
                                                                    bgcolor={
                                                                        bgPrimary
                                                                    }
                                                                >
                                                                    En proceso
                                                                </Small>
                                                            ) : pagos.estado ==
                                                                'Terminado' ? (
                                                                <Small
                                                                    bgcolor={
                                                                        bgSecondary
                                                                    }
                                                                >
                                                                    Terminado
                                                                </Small>
                                                            ) : (
                                                                <Small
                                                                    bgcolor={
                                                                        bgPrimary
                                                                    }
                                                                >
                                                                    Entregado
                                                                </Small>
                                                            )}
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            width={100}
                                                        >
                                                            <Tooltip title="Visualizar">
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handlePagosDetail(
                                                                            pagos._id
                                                                        )
                                                                    }
                                                                >
                                                                    <Icon color="primary">
                                                                        visibility
                                                                    </Icon>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                        ) : (
                                            <TableRow>
                                                <TableCell />
                                                <TableCell />
                                                <TableCell>
                                                    No data
                                                    <br />
                                                    &nbsp;&nbsp;&nbsp;
                                                    <img src="https://img.icons8.com/windows/32/undefined/no-data-availible.png" />
                                                </TableCell>
                                                <TableCell />
                                                <TableCell />
                                            </TableRow>
                                        )}
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
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </Box>
                        </SimpleCard>
                    ) : (
                        // <CircularProgress className="progress" color="secondary" />
                        <LinearProgress color="secondary" />
                    )}
                </Container>
            }
        </div>
    )
}

export default ListPago
