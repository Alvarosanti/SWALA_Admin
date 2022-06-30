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

//rafce

const ListProvider = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [provider, setProvider] = useState([])
    const [providerId, setIdProvider] = useState(null)
    const [providerName, setNameProvider] = useState(null)
    const [productState, setProviderState] = useState('')
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

    const handleProviderDetail = (idProvider) => {
        navigate(`/proveedor/editar?codigo=${idProvider}&isEditable=false`)
    }

    const handleProviderEdit = (idProvider) => {
        navigate(`/proveedor/editar?codigo=${idProvider}&isEditable=true`)
    }

    const handleOpenModalChangeState = (idProvider, providerName, providerState) => {
        setIsOpenModalChangeState(true)
        setIdProvider(idProvider)
        setNameProvider(providerName)
        setProviderState(providerState)
    }

    const handleCloseModal = () => {
        setIsOpenModalChangeState(false)
    }

    const handleChangeState = () => {
        // setIsLoading(true)
        if (productState === 'habilitado') {
            //deshabilitar api
            axios
                .put(`${apiUrl}/provider/updateProviderState/${providerId}`, {
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
                .put(`${apiUrl}/provider/updateProviderState/${providerId}`, {
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
            axios.get(`${apiUrl}/provider`)
                .then((response) => {
                    setProvider(response.data.providers)
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
            axios.get(`${apiUrl}/provider`)
                .then((response) => {
                    setProvider(response.data.providers)
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
                ? provider
                : provider.filter((c) => {
                    let field = c.razon_social + ' ' + c.ruc
                    field = field.toLowerCase()
                    const query = search.toLowerCase()
                    return field.indexOf(query) !== -1
                })
            :
            status.trim().length === 0
                ? provider
                : provider.filter((c) => {
                    let field = c.estado
                    field = field.toLowerCase()
                    const query = status.toLowerCase()
                    return field.indexOf(query) !== -1
                })

    return (
        <div>
            {
                <Container>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                { name: 'Listado', path: '/proveedor/listar' },
                                { name: 'Proveedores' },
                            ]}
                        />
                    </div>


                    {
                        <SimpleCard title="Proveedores">
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
                                            <TableCell width={300}>Razon social</TableCell>
                                            <TableCell width={100}>RUC</TableCell>
                                            <TableCell width={100}>Contacto</TableCell>
                                            <TableCell width={100}>Estado</TableCell>
                                            <TableCell width={100}>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            dataSource
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage + rowsPerPage
                                                )
                                                .map((provider, index) => (
                                                    <TableRow width={800}>
                                                        <TableCell width={300}>
                                                            {provider.razon_social}
                                                        </TableCell>
                                                        <TableCell align="left" width={100}>
                                                            {provider.ruc}
                                                        </TableCell>
                                                        <TableCell align="left" width={100}>
                                                            {provider.contacto}
                                                        </TableCell>
                                                        <TableCell width={100}>{provider.estado}</TableCell>
                                                        <TableCell align="left" width={100}>
                                                            <Tooltip title="Visualizar">
                                                                <IconButton
                                                                    onClick={() => handleProviderDetail(provider._id)}
                                                                >
                                                                    <Icon color="primary">visibility</Icon>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Editar">
                                                                <IconButton
                                                                    onClick={() => handleProviderEdit(provider._id)}
                                                                >
                                                                    <Icon color="primary">edit</Icon>
                                                                </IconButton>
                                                            </Tooltip>
                                                            {
                                                                provider.estado === 'habilitado'
                                                                    ? (
                                                                        <>
                                                                            <Tooltip title="Desactivar">
                                                                                <IconButton
                                                                                    onClick={() => { handleOpenModalChangeState(provider._id, provider.razon_social, provider.estado) }}
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
                                                                                    onClick={() => { handleOpenModalChangeState(provider._id, provider.razon_social, provider.estado) }}
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
                                        }
                                    </TableBody>
                                </StyledTable>
                                {isLoading && <div><br /><LinearProgress color="secondary" /> <br /></div>}
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
                    }
                </Container>
            }

            {/* modal confirmation state edit*/}
            <ConfirmationDialog
                open={isOpenModalChangeState}
                onConfirmDialogClose={handleCloseModal}
                onYesClick={handleChangeState}
                title={productState === 'habilitado' ? 'Desactivar proveedor' : 'Habilitar proveedor'}
                text={
                    <>
                        {`¿Esta seguro que desea ${productState === 'habilitado' ? 'desactivar' : 'habilitar'} al proveedor`} {' '}<strong>{`${providerName}`}</strong>{'?'}
                    </>
                }
                productState={productState}
            />
        </div >
    )
}

export default ListProvider