import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import { Span } from 'app/components/Typography'
import { styled } from '@mui/system'
import { Button, Icon, Grid, ImageList, ImageListItem, Typography, Slide, Snackbar, Alert, MenuItem, Select } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'
import './imageUpload.css'
import { green } from '@mui/material/colors'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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

const AddProduct = () => {
  const [product, setProduct] = useState({
    date: new Date(),
    nombre: '',
    categoria: '',
    images: [],
    precio: '',
    descripcion: '',
  })
  const { search } = useLocation()
  const searchParam = new URLSearchParams(search)
  const isEditable = searchParam.get('isEditable')
  const idProduct = searchParam.get('codigo')
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
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    if (idProduct !== null && isEditable !== null) {
      axios.get(`${apiUrl}/product/${idProduct}`)
        .then((response) => {
          console.log(response.data.product)
          setProduct(response.data.product)
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
    function generatorNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    try {
      const form = new FormData();
      // aform
      // for (let key in product) {
      //   form.append(key, product[key]);
      // }
      form.append('producto_id', generatorNumber(0, 10000))
      form.append('nombre', product.nombre)
      form.append('precio', product.precio)
      form.append('descripcion', product.descripcion)
      form.append('categoria', selectedCategory)
      form.append('images', product.images)
      await axios.post(`${apiUrl}/product/createProduct`,
        form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      navigate('/producto/listar')
    } catch (error) {
      console.log("🚀 ~ file: AddProduct.jsx ~ line 102 ~ createProduct ~ error", error)
    }
  }

  const updateProduct = async () => {
    try {
      const form = new FormData();
      form.append('nombre', product.nombre)
      form.append('precio', product.precio)
      form.append('descripcion', product.descripcion)
      form.append('categoria', selectedCategory)
      await axios.put(`${apiUrl}/product/updateProduct/${idProduct}`,
        form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      navigate('/producto/listar')
    } catch (error) {
      console.log("🚀 ~ file: AddProduct.jsx ~ line 127 ~ updateProduct ~ error", error)
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
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    })
    setError(false)
  }

  const tittleName = () => {
    return (
      idProduct !== null
        ? isEditable === 'true'
          ? 'Editar producto'
          : 'Consultar producto'
        : 'Agregar producto'

    )
  }

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  }

  const imgManage = () => {
    return (
      idProduct !== null
        ? isEditable === 'true'
          ? (
            <div>
              {/* editar */}
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: '500' }}
                >
                  Imagenes
                </Typography>
                <ImageList>
                  {product !== null &&
                    product.images.map((item, index) => (
                      <ImageListItem key={index} sx={{ px: 1 }}>
                        <img
                          alt={index}
                          src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                </ImageList>
              </Grid>
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
                  Imagenes
                </Typography>
                <ImageList>
                  {
                    product !== null &&
                    product.images.map((item, index) => (
                      (
                        <ImageListItem key={index} sx={{ px: 1 }}>
                          <img
                            alt={index}
                            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                          />
                        </ImageListItem>

                      )
                    ))
                  }
                </ImageList>
              </Grid>
            </div>
          )
        : <div>
          <div className="custom-form-group">
            <div
              className={
                highlight
                  ? 'custom-file-drop-area highlight'
                  : 'custom-file-drop-area'
              }
              onDragEnter={handlehighlight}
              onDragOver={handlehighlight}
              onDragLeave={handleunhighlight}
              onDrop={handledrop}
            >
              <input
                type="file"
                name="images"
                placeholder="Enter images"
                multiple={true}
                onChange={handleFileChange}
                id="fileimages"
              />
              <label htmlFor="fileimages">Inserte imagenes</label>
            </div>
            <div
              className={
                images.length > 0
                  ? 'custom-file-preview files'
                  : 'custom-file-preview'
              }
            >
              {images.length > 0 &&
                images.map((item, index) => (
                  <div
                    className="prev-img"
                    key={index}
                    data-imgindex={index}
                  >
                    <span onClick={handleDelete}>&times;</span>
                    <img src={item.src} alt={item.name} />
                  </div>
                ))}
            </div>
          </div>
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

  const handledrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let dt = e.dataTransfer
    let files = dt.files
    setHighlight(false)
    product.images = (files[0])
    handleFiles(files)
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
  const handleFileChange = (e) => {
    let files = e.target.files
    product.images = (files[0])
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
            { name: tittleName(), path: '/producto/agregar' },
            { name: 'Producto' },
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
                    label="Codigo producto"
                    onChange={handleChange}
                    type="text"
                    name="codigo"
                    value={product.producto_id || ''}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    disabled={true}
                  />
                  : ''
                }
                <TextField
                  label="Nombre producto"
                  onChange={handleChange}
                  type="text"
                  name="nombre"
                  value={product.nombre || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                {isEditable === 'false'
                  ?
                  <TextField
                    label="Categoria"
                    onChange={handleChange}
                    type="text"
                    name="categoria"
                    value={product.categoria || ''}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    disabled={isEditable === 'false'}
                  />
                  :
                  < FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="categoria"
                      value={selectedCategory || product.categoria}
                      label="Categoria"
                      onChange={handleChangeCategory}
                    >
                      {
                        category.map((categoria, index) => (
                          <MenuItem key={index} value={categoria.nombre}>{categoria.nombre}</MenuItem>)
                        )
                      }
                    </Select>
                    <br />
                    <br />
                  </FormControl>
                }

                {imgManage()}
                <br />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Precio"
                  onChange={handleChange}
                  type="number"
                  name="precio"
                  value={product.precio || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Descripcion"
                  onChange={handleChange}
                  type="text"
                  name="descripcion"
                  value={product.descripcion || ''}
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
              onClick={() => navigate('/producto/listar')}
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
                Producto agregado exitosamente!
              </Alert>
            </Snackbar>
          </ValidatorForm>
        </div>
      </SimpleCard>
    </Container >
  )
}

export default AddProduct