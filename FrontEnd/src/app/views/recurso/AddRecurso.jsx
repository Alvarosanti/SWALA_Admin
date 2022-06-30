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
    categoria: '',
    images: [],
    precio: '',
    descripcion: '',
    stockMaximo: '',
    stockMinimo: '',
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

  useEffect(() => {
    if (idRecurso !== null && isEditable !== null) {
      axios.get(`${apiUrl}/recurso/${idRecurso}`)
        .then((response) => {
          console.log(response.data.recurso)
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
      form.append('precio', recurso.precio)
      form.append('descripcion', recurso.descripcion)
      form.append('cantidad', recurso.cantidad)
      form.append('stockMaximo', recurso.stockMaximo)
      form.append('stockMinimo', recurso.stockMinimo)
      form.append('medida', recurso.medida)
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
  const updateRecurso = async () => {
    try {
      const form = new FormData();
      form.append('nombre', recurso.nombre)
      form.append('precio', recurso.precio)
      form.append('descripcion', recurso.descripcion)
      form.append('categoria', selectedCategory)
      form.append('stockMaximo', recurso.stockMaximo)
      form.append('stockMinimo', recurso.stockMinimo)
      await axios.put(`${apiUrl}/recurso/updateRecurso/${idRecurso}`,
        form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
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

  const handleFiles = (files) => {
    let imagesArr = []
    for (let file of files) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        let fileObj = {
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result,
        }
        imagesArr.push(fileObj)
        setPost({
          ...post,
          images: [...images, ...imagesArr],
        })
      })
    }
  }

  const handledrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let dt = e.dataTransfer
    let files = dt.files
    setHighlight(false)
    recurso.images = (files[0])
    handleFiles(files)
  }

  const handleFileChange = (e) => {
    let files = e.target.files
    recurso.images = (files[0])
    handleFiles(files)
  }

  const handleDelete = (e) => {
    let target = e.target.parentElement
    let targetindex = target.dataset.imgindex * 1
    console.log(target, targetindex)
    setPost({
      ...post,
      images: [
        ...images.slice(0, targetindex),
        ...images.slice(targetindex + 1),
      ],
    })
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
                  label="Precio x Unidad Medida"
                  onChange={handleChange}
                  type="text"
                  name="precio"
                  value={recurso.precio || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Stock máximo"
                  onChange={handleChange}
                  type="text"
                  name="stockMaximo"
                  value={recurso.stockMaximo}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Stock mínimo"
                  onChange={handleChange}
                  type="text"
                  name="stockMinimo"
                  value={recurso.stockMinimo}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                <br />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Cantidad x Unidad Medida"
                  onChange={handleChange}
                  type="text"
                  name="cantidad"
                  value={recurso.cantidad || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
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
                <TextField
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
    </Container>
  )
}

export default AddRecurso