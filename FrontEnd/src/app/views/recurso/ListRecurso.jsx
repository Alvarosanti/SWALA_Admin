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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
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

const ListRecurso = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [recurso, setRecurso] = useState([])
    const [recursoId, setIdRecurso] = useState(null)
    const [recursoName, setNameRecurso] = useState(null)
    const [recursoState, setRecursoState] = useState('')
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

    const handleRecursoDetail = (idRecurso) => {
        navigate(`/recurso/editar?codigo=${idRecurso}&isEditable=false`)
    }

    const handleRecursoEdit = (idRecurso) => {
        navigate(`/recurso/editar?codigo=${idRecurso}&isEditable=true`)
    }

    const handleOpenModalChangeState = (idRecurso, recursoName, recursoState) => {
        setIsOpenModalChangeState(true)
        setIdRecurso(idRecurso)
        setNameRecurso(recursoName)
        setRecursoState(recursoState)
    }

    const handleCloseModal = () => {
        setIsOpenModalChangeState(false)
    }

    const handleChangeState = () => {
        // setIsLoading(true)
        if (recursoState === 'habilitado') {
            //deshabilitar api
            axios
                .put(`${apiUrl}/recurso/updateRecursoState/${recursoId}`, {
                    estado: "desactivado",
                })
                .then(
                    (response) => {
                        setIsOpenModalChangeState(false)
                        loadTableData()
                    },
                    (error) => {
                        console.log("🚀 ~ file: ListRecurso.jsx ~ line 110 ~ handleChangeState ~ error", error)
                        setIsOpenModalChangeState(false)
                    }
                )
        } else {
            //habilitar api
            axios
                .put(`${apiUrl}/recurso/updateRecursoState/${recursoId}`, {
                    estado: "habilitado",
                })
                .then(
                    (response) => {
                        setIsOpenModalChangeState(false)
                        loadTableData()
                    },
                    (error) => {
                        console.log("🚀 ~ file: ListRecurso.jsx ~ line 110 ~ handleChangeState ~ error", error)
                        setIsOpenModalChangeState(false)
                    }
                )
        }
    }

    const loadTableData = () => {
        setTimeout(() => {
            axios.get(`${apiUrl}/recurso`)
                .then((response) => {
                    setRecurso(response.data.recurso)
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
            axios.get(`${apiUrl}/recurso`)
                .then((response) => {
                    setRecurso(response.data.recurso)
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
                ? recurso
                : recurso.filter((c) => {
                    let field = c.nombre + ' ' + c.recurso_id
                    field = field.toLowerCase()
                    const query = search.toLowerCase()
                    return field.indexOf(query) !== -1
                })
            :
            status.trim().length === 0
                ? recurso
                : recurso.filter((c) => {
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
                                { name: 'Listado', path: '/recurso/listar' },
                                { name: 'Recurso' },
                            ]}
                        />
                    </div>
                    {
                        !isLoading
                            ?
                            <SimpleCard title="Recurso">
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
                                            <TableRow width={900}>
                                                <TableCell width={200}>Nombre</TableCell>
                                                <TableCell width={100}>Codigo recurso</TableCell>
                                                <TableCell width={100}>Precio/u{' '}(S/.)</TableCell>
                                                <TableCell width={100}>Cantidad</TableCell>
                                                <TableCell width={100}>Unidad de Medida</TableCell>
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
                                                    .map((recurso, index) => (
                                                        <TableRow width={900}>
                                                            <TableCell width={200}>
                                                                {recurso.nombre}
                                                            </TableCell>
                                                            <TableCell align="left" width={100}>
                                                                {recurso.recurso_id}
                                                            </TableCell>
                                                            <TableCell align="left" width={100}>
                                                                {/* {(recurso.precio).toString().indexOf('.') == 2 ? recurso.precio : `${recurso.precio}.00`} */}
                                                                {recurso.precio}
                                                            </TableCell>
                                                            <TableCell align="left" width={100}>
                                                                {recurso.stock}
                                                            </TableCell>
                                                            <TableCell align="left" width={100}>
                                                                {recurso.medida}
                                                            </TableCell>
                                                            <TableCell width={100}>{recurso.estado}</TableCell>
                                                            <TableCell align="left" width={100}>
                                                                <Tooltip title="Visualizar">
                                                                    <IconButton
                                                                        onClick={() => handleRecursoDetail(recurso._id)}
                                                                    >
                                                                        <Icon color="primary">visibility</Icon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Editar">
                                                                    <IconButton
                                                                        onClick={() => handleRecursoEdit(recurso._id)}
                                                                    >
                                                                        <Icon color="primary">edit</Icon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                {
                                                                    recurso.estado === 'habilitado'
                                                                        ? (
                                                                            <>
                                                                                <Tooltip title="Desactivar">
                                                                                    <IconButton
                                                                                        onClick={() => { handleOpenModalChangeState(recurso._id, recurso.nombre, recurso.estado) }}
                                                                                    >
                                                                                        <Icon color="error">do_not_disturb_alt</Icon>
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            </>
                                                                        )
                                                                        : (
                                                                            <>
                                                                                <Tooltip title="Habilitar">
                                                                                    <IconButton
                                                                                        onClick={() => { handleOpenModalChangeState(recurso._id, recurso.nombre, recurso.estado) }}
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
                title={recursoState === 'habilitado' ? 'Desactivar recurso' : 'Habilitar recurso'}
                text={
                    <>
                        {`¿Esta seguro que desea ${recursoState === 'habilitado' ? 'desactivar' : 'habilitar'} el recurso`} {' '}<strong>{`${recursoName}`}</strong>{'?'}
                    </>
                }
                productState={recursoState}
            />

        </div>

    )
}

export default ListRecurso;