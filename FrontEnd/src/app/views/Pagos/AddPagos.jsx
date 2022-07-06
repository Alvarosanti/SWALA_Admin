import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import { Span } from 'app/components/Typography'
import { styled } from '@mui/system'
import { Button, Icon, Grid, ImageList, ImageListItem, Typography, Slide, Snackbar, Alert, MenuItem, Select,TableHead,TableRow,TableCell,TextField,Table,TableBody,Avatar } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'
import './imageUpload.css'
import { green } from '@mui/material/colors'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
        email:'',
        cart: [],
    })
    
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
  const [open, setOpen] = useState(false);
  const [Transition, setTransition] = useState(undefined);
  const [hasError, setError] = useState(true)
  
  const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
  }))

  useEffect(() => {
    if (idPagos !== null && isEditable !== null) {
      axios.get(`${apiUrl}/pagos/${idPagos}`)
        .then((response) => {
          console.log(response.data.pagos)
          setPagos(response.data.pagos)
          console.log("🚀 ~ file: AddPagos.jsx ~ line 84 ~ .then ~ response.data.pagos", response.data.pagos)
        },
          (error) => {
            console.log(error)
          }
        )
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    isEditable == null
      ? createProduct()
      : updateProduct()
  }

  const createProduct = async () => {
  }

  const updateProduct = async () => {
}
const handleClick = (Transition) => () => {
    if (hasError == false) {
      setOpen(true);
      setTransition(() => Transition);
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

  console.log("🚀 ~ file: AddPagos.jsx ~ line 124 ~ AddPagos ~ dataSource", dataSource)

  
 

  const tittleName = () => {
    return(
        idPagos!==null 
        ? isEditable === 'true' 
            ? 'Editar Pedido' 
            : 'Consultar Pedido'
         : 'Agregar Pedido'
    )
  }

  const imgManage = () => {

  return(
    idPagos !== null
    ? isEditable === 'true'
    ? (
        <div>
          
                 </div>
    )
    : (
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
                <StyledTable >
                <TableHead>
                <TableRow width={1400}>
                                                <TableCell width={400}>Nombre</TableCell>
                                                <TableCell width={200}>Codigo producto</TableCell>
                                                <TableCell width={200}>Precio/u{' '}(S/.)</TableCell>
                                                <TableCell width={200}>Cantidad</TableCell>
                                                <TableCell width={400}>Descripcion</TableCell>
                                            </TableRow>
                </TableHead>
                  <TableBody>
                  {dataSource.length !== 0
                          ?
                          dataSource
                                        .map((dataSource, index) => (
                                                      <TableRow width={1200}>
                                                      <TableCell align="left" width={400} key="Nombre">
                                                      <div style={{ position: 'relative', float: 'left', textAlign: 'right' }}>
                                                                    <Avatar
                                                                        src={dataSource.images[0].url}
                                                                        sx={{ cursor: 'pointer' }}>
                                                                    </Avatar>
                                                                </div>
                                                                <div style={{ margin: '10px', paddingLeft: '50px' }}>
                                                                {dataSource.nombre}
                                                                </div>
                               
                                 </TableCell>
                                 <TableCell align="left" width={200} key="productoId">
                                {dataSource.producto_id} 
                                 </TableCell>
                                 <TableCell align="left" width={200} key="precio">
                                {dataSource.precio} 
                                 </TableCell>
                                 <TableCell align="left" width={200} key="cantidad">
                                {dataSource.quantity} 
                                 </TableCell>
                                 <TableCell align="left" width={400} key="descripcion">
                                {dataSource.descripcion} 
                                 </TableCell>
                                </TableRow>

                                
                                                    ))
                                              
                            :<TableRow>
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
                <br></br>
              <TextField label="Precio total" 
                value={
                  dataSource.map((item,index) =>(
                          (
                            item.precio* item.quantity
                          )  
                    ) )   
             }     /> 
               
               
              </Grid>
              <br></br>
                 </div>
                
                 )
             : 
             <div>
           
                      </div>
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
            { name: 'Pagos' },
          ]}
        />
      </div>
      <SimpleCard title={tittleName()}>
        <div>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
        {isEditable !== null
        ?
        < TextField
          label="Codigo Pedido"
          onChange={handleChange}
          type="text"
          name="nombre"
          value={pagos.pago_id || ''}
          validators={['required']}
          errorMessages={['this field is required']}
          disabled={true}
        />
        : ''
        }
        <TextField
                  label="Nombre Cliente"
                  onChange={handleChange}
                  type="text"
                  name="nombre"
                  value={pagos.nombre || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />

        <TextField
                  label="Fecha de registro"
                  onChange={handleChange}
                  type="text"
                  name="fecha"
                  value={pagos.createdAt || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
             {imgManage()}
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          {pagos.cart.map((item, index) => (
                      (
                <TextField
                  label="Email"
                  onChange={handleChange}
                  type="text"
                  name="nombre"
                  value={pagos.email || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                      )))
              }
                <TextField
                  label="id usuario"
                  onChange={handleChange}
                  type="text"
                  name="nombre"
                  value={pagos.usuario_id || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Fecha de Entrega"
                  onChange={handleChange}
                  type="text"
                  name="fechaentrega"
                  value={pagos.fechaEntrega || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
              </Grid>
        </Grid>
        {
              !isEditable || isEditable !== 'false'
                ? (
                  < Button onClick={handleClick(TransitionRight)} color="primary" variant="contained" type="submit" >
                    <Icon>add_box</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                      {
                        isEditable === 'true'
                          ? 'Actualizar' : 'Agregar'
                      }
                    </Span>
                  </Button>
                )
                : ''
            }
        {' '}
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