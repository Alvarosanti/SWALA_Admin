import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import { Span } from 'app/components/Typography'
import { styled } from '@mui/system'
import { Button, Icon, Grid, ImageList, ImageListItem, Typography, Slide, Snackbar, Alert } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'
import './imageUpload.css'
import { green } from '@mui/material/colors'


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
    // console.log("product form:", product);
    // console.log('post:', post)
    // console.log('images:', product.images[0])
    function generatorNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    e.preventDefault()
    try {
      const form = new FormData();
      // for (let key in product) {
      //   form.append(key, product[key]);
      // }
      form.append('producto_id', generatorNumber(0, 1000))
      form.append('nombre', product.nombre)
      form.append('precio', product.precio)
      form.append('descripcion', product.descripcion)
      form.append('categoria', product.categoria)
      form.append('images', product.images)
      await axios.post(`${apiUrl}/product/createProduct`,
        form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      navigate('/producto/listar')
    } catch (error) {
      console.log(error)
    }
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

  const imgManage = () => {
    // console.log('imagen: ', imagen)

    // Object.entries(imagen).forEach(([key, value]) => {
    //   console.log(key)
    //   console.log(value)
    // })
    // {
    //   product.images.map((item, index) => (
    //     console.log('item: ', item, 'index:', index)
    //     // Object.entries(item).forEach(([key, value])

    //     // item.map((val, inde) => {

    //     //   console.log('val:', val)
    //     //   console.log('item:', item)
    //     //   console.log('val inde:', val[inde])
    //     //   console.log('val index:', val[index])
    //     // })
    //     // console.log('item:', item[1])

    //   ))
    // }
    return (
      idProduct !== null
        ? isEditable === 'true'
          ? (
            <div>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: '500' }}
                >
                  Imagenes editar
                </Typography>
                <ImageList cols={6}>
                  {product !== null &&
                    product.images.map((item, index) => (
                      <ImageListItem key={index} sx={{ px: 1 }}>
                        <img
                          alt={index}
                          src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: '500' }}
                >
                  Imagenes consultar 2
                </Typography>
                <ImageList cols={6}>
                  {
                    product !== null &&
                    product.images.map((item, index) => (
                      (
                        <ImageListItem key={index} sx={{ px: 1 }}>
                          <img
                            alt={index}
                            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
    handleFiles(files)
    console.log(files)
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
                {imgManage()}
                <br />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Precio"
                  onChange={handleChange}
                  type="text"
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