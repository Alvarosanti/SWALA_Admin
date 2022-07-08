import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import { Span } from 'app/components/Typography'
import { styled } from '@mui/system'
import {
    Button,
    Icon,
    Grid,
    ImageList,
    ImageListItem,
    Typography,
    Slide,
    Snackbar,
    Alert,
    MenuItem,
    Select,
    TableHead,
    TableRow,
    TableCell,
    TextField,
    Table,
    TableBody,
    Avatar,
    Box,
} from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'
import './imageUpload.css'
import moment from 'moment'
import { green } from '@mui/material/colors'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

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

const apiUrl = 'http://localhost:4000/api'

const AddPagos = () => {
    const [pagos, setPagos] = useState({
        nombre: '',
        email: '',
        cart: [],
        direccion: {
            line1: ''
        }
    })

    const [estado, setEstado] = React.useState('')

    const handleUpdateState = (event) => {
        //setEstado(event.target.value)
        //console.log('event', event.target.value)
        //console.log('idPedido', idPagos)
        if (event.target.value == 10) {
            axios.put(`${apiUrl}/pagos/updatePagoState/${idPagos}`, {
                estado: 'Pendiente',
            }).then(
                (response) => {
                    setEstado(event.target.value)
                },
                (error) => {
                    console.log(
                        '🚀 ~ file: ListProduct.jsx ~ line 110 ~ handleChangeState ~ error',
                        error
                    )
                }
            )
        } else if (event.target.value == 20) {
            axios.put(`${apiUrl}/pagos/updatePagoState/${idPagos}`, {
                estado: 'En proceso',
            }).then(
                (response) => {
                    setEstado(event.target.value)
                },
                (error) => {
                    console.log(
                        '🚀 ~ file: ListProduct.jsx ~ line 110 ~ handleChangeState ~ error',
                        error
                    )
                }
            )
        } else if (event.target.value == 30) {
            axios.put(`${apiUrl}/pagos/updatePagoState/${idPagos}`, {
                estado: 'Terminado',
            }).then(
                (response) => {
                    setEstado(event.target.value)
                },
                (error) => {
                    console.log(
                        '🚀 ~ file: ListProduct.jsx ~ line 110 ~ handleChangeState ~ error',
                        error
                    )
                }
            )
        } else if (event.target.value == 40) {
            axios.put(`${apiUrl}/pagos/updatePagoState/${idPagos}`, {
                estado: 'Entregado',
            }).then(
                (response) => {
                    setEstado(event.target.value)
                },
                (error) => {
                    console.log(
                        '🚀 ~ file: ListProduct.jsx ~ line 110 ~ handleChangeState ~ error',
                        error
                    )
                }
            )
        }
    }

    const { search } = useLocation()

    const searchParam = new URLSearchParams(search)
    const isEditable = searchParam.get('isEditable')

    const idPagos = searchParam.get('codigo')

    const navigate = useNavigate()
    const [highlight, setHighlight] = useState(false)
    const [post, setPost] = useState({
        cart: [],
    })
    const { cart } = post
    const [open, setOpen] = useState(false)
    const [Transition, setTransition] = useState(undefined)
    const [hasError, setError] = useState(true)

    const TextField = styled(TextValidator)(() => ({
        width: '100%',
        marginBottom: '16px',
    }))

    useEffect(() => {
        if (idPagos !== null && isEditable !== null) {
            axios.get(`${apiUrl}/pagos/${idPagos}`).then(
                (response) => {
                    setPagos(response.data.pagos)
                },
                (error) => {
                    console.log(error)
                }
            )
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        isEditable == null ? createProduct() : updateProduct()
    }

    const createProduct = async () => { }

    const updateProduct = async () => { }
    const handleClick = (Transition) => () => {
        if (hasError == false) {
            setOpen(true)
            setTransition(() => Transition)
        }
    }

    function TransitionRight(props) {
        return <Slide {...props} direction="right" />
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event) => {
        event.persist()
        setPagos({
            ...pagos,
            [event.target.name]: event.target.value,
        })
        setError(false)
    }

    const dataSource = pagos.cart
    const estadoPedido = pagos.estado

    const tittleName = () => {
        return idPagos !== null
            ? isEditable === 'true'
                ? 'Editar Pedido'
                : 'Consultar Pedido'
            : 'Agregar Pedido'
    }

    const imgManage = () => {
        return idPagos !== null ? (
            isEditable === 'true' ? (
                <div></div>
            ) : (
                <div>
                    {/*  consulta */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: '500' }}
                        >
                            <br></br>
                            Datos del Producto
                        </Typography>
                        <StyledTable>
                            <TableHead>
                                <TableRow width={970}>
                                    <TableCell width={300}>Nombre</TableCell>
                                    <TableCell width={130}>
                                        Codigo producto
                                    </TableCell>
                                    <TableCell width={100}>
                                        Precio/u (S/.)
                                    </TableCell>
                                    <TableCell width={100}>Cantidad</TableCell>
                                    <TableCell width={340}>
                                        Descripcion
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataSource.length !== 0 ? (
                                    dataSource.map((dataSource, index) => (
                                        <TableRow width={970}>
                                            <TableCell
                                                align="left"
                                                width={300}
                                                key="Nombre"
                                            >
                                                <div
                                                    style={{
                                                        position: 'relative',
                                                        float: 'left',
                                                        textAlign: 'right',
                                                    }}
                                                >
                                                    <Avatar
                                                        src={
                                                            dataSource.images[0]
                                                                .url
                                                        }
                                                        sx={{
                                                            cursor: 'pointer',
                                                        }}
                                                    ></Avatar>
                                                </div>
                                                <div
                                                    style={{
                                                        margin: '10px',
                                                        paddingLeft: '50px',
                                                    }}
                                                >
                                                    {dataSource.nombre}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                width={130}
                                                key="productoId"
                                            >
                                                {dataSource.producto_id}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                width={100}
                                                key="precio"
                                            >
                                                {dataSource.precio}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                width={100}
                                                key="cantidad"
                                            >
                                                {dataSource.quantity}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                width={340}
                                                key="descripcion"
                                            >
                                                {dataSource.descripcion}
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
                        <br></br>
                        <TextField
                            label="Precio total"
                            value={
                                's/. ' +
                                dataSource.reduce((prev, item) => {
                                    return prev + item.precio * item.quantity
                                }, 0)
                            }
                        />
                    </Grid>
                    <br></br>
                </div>
            )
        ) : (
            <div></div>
        )
    }

    const handlehighlight = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setHighlight(true)
    }

    const handleunhighlight = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setHighlight(false)
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: tittleName(), path: '/pago/agregar' },
                        { name: 'Pedidos' },
                    ]}
                />
            </div>
            <SimpleCard title={tittleName()}>
                <div>
                    <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                        <Grid container spacing={6}>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <TextField
                                    label="Nombre del cliente"
                                    onChange={handleChange}
                                    type="text"
                                    name="nombre"
                                    value={pagos.nombre || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    disabled={isEditable === 'false'}
                                />
                                <TextField
                                    label="Email"
                                    onChange={handleChange}
                                    type="text"
                                    name="email"
                                    value={pagos.email || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    disabled={isEditable === 'false'}
                                />

                                <TextField
                                    label="Direccion de entrega"
                                    onChange={handleChange}
                                    type="text"
                                    name="direccionEntrega"
                                    value={pagos.direccion.line1 || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    disabled={isEditable === 'false'}
                                />

                                {imgManage()}
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <TextField
                                    label="Fecha de registro"
                                    onChange={handleChange}
                                    type="text"
                                    name="fechaCreacion"
                                    value={
                                        moment(pagos.createdAt).format(
                                            'DD/MM/YYYY'
                                        ) || ''
                                    }
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    disabled={isEditable === 'false'}
                                />
                                <TextField
                                    label="Fecha de entrega"
                                    onChange={handleChange}
                                    type="text"
                                    name="fechaEntrega"
                                    value={
                                        moment(pagos.fechaEntrega).format(
                                            'DD/MM/YYYY - hh:mm'
                                        ) || ''
                                    }
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    disabled={isEditable === 'false'}
                                />
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Estado
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={10}
                                            // value={estado}
                                            label="Estado"
                                            onChange={handleUpdateState}
                                        >
                                            <MenuItem value={10}>
                                                {pagos.estado}
                                            </MenuItem>
                                            <MenuItem value={20}>
                                                En proceso
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Terminado
                                            </MenuItem>
                                            <MenuItem value={40}>
                                                Entregado
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                        {!isEditable || isEditable !== 'false' ? (
                            <Button
                                onClick={handleClick(TransitionRight)}
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                <Icon>add_box</Icon>
                                <Span
                                    sx={{ pl: 1, textTransform: 'capitalize' }}
                                >
                                    {isEditable === 'true'
                                        ? 'Actualizar'
                                        : 'Agregar'}
                                </Span>
                            </Button>
                        ) : (
                            ''
                        )}{' '}
                        <Button
                            className="w-full"
                            sx={{ height: '37px' }}
                            color="secondary"
                            variant="outlined"
                            type="submit"
                            onClick={() => navigate('/pago/listar')}
                        >
                            Volver
                        </Button>
                    </ValidatorForm>
                </div>
            </SimpleCard>
        </Container>
    )
}

export default AddPagos
