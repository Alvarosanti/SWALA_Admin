import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SimpleCard, Breadcrumb, ConfirmationDialog } from '../../../app/components'
import InputLabel from '@mui/material/InputLabel';
import { styled, Box } from '@mui/system'
import axios from 'axios'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Tooltip,
    LinearProgress,
    TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

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
const ListOc = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [isLoading, setLoading] = useState(false);
    const [oc, setOc] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = React.useState('pendiente');
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            axios.get(`${apiUrl}/oc`)
                .then((response) => {
                    setOc(response.data.oc)
                    setLoading(false)
                })
        }, 1000)
    }, [])

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    }

    const dataSource =
        (search)
            ?
            search.trim().length === 0
                ? oc
                : oc.filter((c) => {
                    let field = c.recursos.nombreRecurso + ' ' + c.numeroOc
                    field = field.toLowerCase()
                    const query = search.toLowerCase()
                    return field.indexOf(query) !== -1
                })
            :
            status.trim().length === 0
                ? oc
                : oc.filter((c) => {
                    let field = c.estado
                    field = field.toLowerCase()
                    const query = status.toLowerCase()
                    return field.indexOf(query) !== -1
                })

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleOcDetail = (idOc) => {
        navigate(`/oc/editar?codigo=${idOc}&isEditable=false`)
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Listar orden de compra', path: '/oc/listar' },
                        { name: 'Orden de compra' },
                    ]}
                />
            </div>
            {
                !isLoading
                    ?
                    <SimpleCard title="Orden de compra">
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
                                    <MenuItem value={'pendiente'}>Pendiente</MenuItem>
                                    <MenuItem value={'aceptado'}>Aceptado</MenuItem>
                                    <MenuItem value={'Procesado'}>Habilitado</MenuItem>
                                    <MenuItem value={'enviado'}>Enviado</MenuItem>
                                    <MenuItem value={'rechazado'}>Rechazado</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Box width="100%" overflow="auto">
                            <StyledTable >
                                <TableHead>
                                    <TableRow width={900}>
                                        <TableCell width={200}>Razon Social</TableCell>
                                        <TableCell width={100}>N° Orden Compra</TableCell>
                                        <TableCell width={100}>Fecha Creación</TableCell>
                                        <TableCell width={100}>Recurso</TableCell>
                                        <TableCell width={60}>Total</TableCell>
                                        <TableCell width={100}>Estado</TableCell>
                                        <TableCell width={40}>Acciones</TableCell>
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
                                            .map((oc, index) => (
                                                <TableRow width={900}>
                                                    <TableCell key={'1'} width={200}>
                                                        {oc.razon_social}
                                                    </TableCell>
                                                    <TableCell key={'2'} align="left" width={100}>
                                                        {oc.numeroOc}
                                                    </TableCell>
                                                    <TableCell key={'3'} align="left" width={100}>
                                                        {oc.fechaCreacion}
                                                    </TableCell>
                                                    <TableCell key={'4'} align="left" width={100}>
                                                        {oc.recursos.nombreRecurso}
                                                    </TableCell>
                                                    <TableCell key={'5'} align="left" width={100}>
                                                        {oc.recursos.subtotal}
                                                    </TableCell>
                                                    <TableCell key={'6'} width={60}>{oc.estado}</TableCell>
                                                    <TableCell key={'7'} align="left" width={40}>
                                                        <Tooltip title="Visualizar">
                                                            <IconButton
                                                                onClick={() => handleOcDetail(oc._id)}
                                                            >
                                                                <Icon color="primary">visibility</Icon>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        :
                                        <TableRow>
                                            <TableCell key={'1'} />
                                            <TableCell key={'2'} />
                                            <TableCell key={'3'}>
                                                No data
                                                <br />
                                                &nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/windows/32/undefined/no-data-availible.png" />
                                            </TableCell>
                                            <TableCell key={'4'} />
                                            <TableCell key={'5'} />
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
    )
}

export default ListOc