import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import { Span } from 'app/components/Typography'
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors'
import { Button, Icon, Grid, ImageList, ImageListItem, Typography, Slide, Snackbar, Alert, MenuItem, Select } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate, useLocation } from 'react-router'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';



const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
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

const AddRecurso = () => {
  const [recurso, setRecurso] = useState({
    date: new Date(),
    nombre: '',
    medida: '',
    stock: '',
    precio: '',
    stockMinimo: '',
    descripcion: '',
    cantidad: '',
  })
  const { search } = useLocation()
  const searchParam = new URLSearchParams(search)
  const isEditable = searchParam.get('isEditable')
  const idRecurso = searchParam.get('codigo')
  const navigate = useNavigate()
  const [highlight, setHighlight] = useState(false)
  const [post, setPost] = useState({
    images: [],
  })
  const { images } = post
  const [open, setOpen] = useState(false);
  const [Transition, setTransition] = useState(undefined);
  const [hasError, setError] = useState(true)
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])
  const [uMedida, setUmedida] = useState('')

  useEffect(() => {
    if (idRecurso !== null && isEditable !== null) {
      axios.get(`${apiUrl}/recurso/${idRecurso}`)
        .then((response) => {
          setRecurso(response.data.recurso)
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
      ? createRecurso()
      : updateRecurso()
  }
  const createRecurso = async () => {
    function generatorNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    try {
      const form = new FormData();
      // aform
      // for (let key in product) {
      //   form.append(key, product[key]);
      // }
      form.append('recurso_id', generatorNumber(0, 10000))
      form.append('nombre', recurso.nombre)
      form.append('medida', uMedida)
      form.append('stock', recurso.stock)
      form.append('precio', recurso.precio)
      form.append('stockMinimo', recurso.stockMinimo)
      form.append('descripcion', recurso.descripcion)
      await axios.post(`${apiUrl}/recurso/createRecurso`,
        form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      navigate('/recurso/listar')
    } catch (error) {
      console.log("🚀 ~ file: AddRecurso.jsx ~ line 102 ~ createRecurso ~ error", error)
    }
  }
  const newStock = (recurso.stock) - (recurso.cantidad)
  const updateRecurso = async () => {
    try {
      console.log("🚀 ~ file: AddRecurso.jsx ~ line 110 ~ updateRecurso ~ newStock", newStock)
      const form = new FormData();
      form.append('nombre', recurso.nombre)
      form.append('medida', uMedida || recurso.medida)
      form.append('stock', newStock)
      form.append('precio', recurso.precio)
      form.append('stockMinimo', recurso.stockMinimo)
      form.append('descripcion', recurso.descripcion)
      await axios.put(`${apiUrl}/recurso/updateRecurso/${idRecurso}`,
        form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      checkStock()
      navigate('/recurso/listar')
    } catch (error) {
      console.log("🚀 ~ file: AddRecurso.jsx ~ line 127 ~ updateRecurso ~ error", error)
    }
  }

  //trae categoria
  useEffect(() => {
    axios.get(`${apiUrl}/category`)
      .then((response) => {
        setCategory(response.data.category)
      })
  }, [])

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
    setRecurso({
      ...recurso,
      [event.target.name]: event.target.value,
    })
    setError(false)
  }

  const tittleName = () => {
    return (
      idRecurso !== null
        ? isEditable === 'true'
          ? 'Editar recurso'
          : 'Consultar recurso'
        : 'Agregar recurso'

    )
  }

  const handleChangeuMedida = (event) => {
    setUmedida(event.target.value);
  }

  const ocCompra = () => {
    function generatorNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const form = new FormData();
    form.append('nombreRecurso', recurso.nombre)
    form.append('precioRecurso', recurso.precio)
    form.append('cantidadPedido', recurso.stock)
    form.append('codigoRecurso', recurso.recurso_id)
    form.append('unidadMedida', recurso.medida)
    form.append('numeroOc', generatorNumber(0, 10000))

    axios.post(`${apiUrl}/oc/createOc`,
      form, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  }

  const checkStock = () => {
    console.log('recurso', recurso.stock)
    if (newStock === 0) {
      ocCompra()
    }
    if (recurso.stock && newStock <= recurso.stockMinimo) {
      axios
        .put(`${apiUrl}/recurso/updateRecursoAlert/${idRecurso}`, {
          alerta: true,
        })
        .then(
          (response) => {
          },
          (error) => {
            console.log("🚀 ~ file: AddRecurso.jsx ~ line 249 ~ useEffect ~ error", error)
          }
        )
    } else {
      axios
        .put(`${apiUrl}/recurso/updateRecursoAlert/${idRecurso}`, {
          alerta: false,
        })
        .then(
          (response) => {
          },
          (error) => {
            console.log("🚀 ~ file: AddRecurso.jsx ~ line 249 ~ useEffect ~ error", error)
          }
        )
    }
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: tittleName(), path: '/recurso/agregar' },
            { name: 'Recurso' },
          ]}
        />
      </div>
      <SimpleCard title={tittleName()}>
        <div>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                {isEditable !== null
                  ?
                  < TextField
                    label="Codigo recurso"
                    onChange={handleChange}
                    type="text"
                    name="codigo"
                    value={recurso.recurso_id || ''}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    disabled={true}
                  />
                  : ''
                }
                <TextField
                  label="Nombre recurso"
                  onChange={handleChange}
                  type="text"
                  name="nombre"
                  value={recurso.nombre || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Stock"
                  onChange={handleChange}
                  type="number"
                  name="stock"
                  value={recurso.stock}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                {
                  isEditable == 'false' || idRecurso == null
                    ?
                    <TextField
                      label="Stock mínimo"
                      onChange={handleChange}
                      type="number"
                      name="stockMinimo"
                      value={recurso.stockMinimo}
                      validators={['required']}
                      errorMessages={['Este campo es requerido']}
                      disabled={isEditable === 'false'}
                    />
                    : ''
                }
                {
                  isEditable == 'true'
                    ?
                    <TextField
                      label="Cantidad recurso utilizado"
                      onChange={handleChange}
                      type="number"
                      name="cantidad"
                      value={recurso.cantidad}
                      disabled={isEditable === 'false'}
                      validators={['required']}
                      errorMessages={['Este campo es requerido']}
                    />
                    : ''
                }
                <br />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                {
                  isEditable == 'false'
                    ?
                    <TextField
                      label="Unidad de Medida"
                      onChange={handleChange}
                      type="text"
                      name="medida"
                      value={recurso.medida || ''}
                      validators={['required']}
                      errorMessages={['Este campo es requerido']}
                      disabled={isEditable === 'false'}
                    />
                    :
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Unidad de Medida</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        displayEmpty
                        id="demo-simple-select"
                        name="medida"
                        value={uMedida || recurso.medida}
                        label="Unidad de Medida"
                        onChange={handleChangeuMedida}
                      >
                        <MenuItem value={''}>Seleccionar</MenuItem>
                        <MenuItem value={'kilogramos'}>Kilogramos</MenuItem>
                        <MenuItem value={'litros'}>Litros</MenuItem>
                        <MenuItem value={'unidades'}>Unidades</MenuItem>
                      </Select>
                      <br />
                    </FormControl>
                }
                <TextField
                  label="Precio x Unidad Medida"
                  onChange={handleChange}
                  type="number"
                  name="precio"
                  value={recurso.precio || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                < TextField
                  label="Descripcion"
                  onChange={handleChange}
                  type="text"
                  name="descripcion"
                  value={recurso.descripcion || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
              </Grid>
            </Grid>
            {
              !isEditable || isEditable !== 'false'
                ? (
                  < Button disabled={recurso.cantidad > recurso.stock ? true : ''} onClick={handleClick(TransitionRight)} color="primary" variant="contained" type="submit" >
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
              onClick={() => navigate('/recurso/listar')}
            >
              Volver
            </Button>
            <Snackbar
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              autoHideDuration={6000}
            >
              <Alert
                onClose={handleClose}
                styled={{ backgroundColor: green[600] }}
                sx={{ width: '100%' }}
                variant="filled"
              >
                Recurso agregado exitosamente!
              </Alert>
            </Snackbar>
          </ValidatorForm>
        </div>
      </SimpleCard>
    </Container >
  )
}

export default AddRecurso