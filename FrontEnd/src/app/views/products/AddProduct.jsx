import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import { Span } from 'app/components/Typography'
import { styled } from '@mui/system'
import { Button, Icon, Grid, ImageList, ImageListItem, Typography, } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'
import './imageUpload.css'
import { keyBy } from 'lodash'


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
    imagen: [],
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
    photos: [],
  })
  const { photos } = post

  useEffect(() => {
    if (!idProduct) {
      setProduct({
        nombre: '',
        categoria: '',
        imagen: [],
        precio: '',
        descripcion: '',
      })
    }
  }, [idProduct])

  useEffect(() => {
    if (idProduct !== null && isEditable !== null) {
      axios.get(`${apiUrl}/product/${idProduct}`, {
        id: idProduct,
      })
        .then((response) => {
          setProduct(response.data)
        },
          (error) => {
            console.log(error)
          }
        )
    }
  }, [])

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  }

  const handleChange = (event) => {
    event.persist()
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    })
  }

  const {
    nombre,
    categoria,
    imagen,
    precio,
    descripcion,
  } = product

  const tittleName = () => {
    return (
      idProduct !== null
        ? isEditable === 'true'
          ? 'Editar producto'
          : 'Consultar producto'
        : 'Agregar producto'

    )
  }

  const imgManage = (imagen) => {
    Object.entries(imagen).forEach(([key, value]) => {
      console.log(key)
      console.log(value)
    })
    // {
    //   product.map((item, index) => (
    //     console.log(item, index)
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
                  Imagenes
                </Typography>
                <ImageList cols={6}>
                  {product !== null &&
                    Object.entries(imagen).forEach(([key, value]) => {
                      <ImageListItem key={key} sx={{ px: 1 }}>
                        <img
                          alt={key}
                          src={value}
                          srcSet={`${value}`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    })
                  }
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
                  Imagenes
                </Typography>
                <ImageList cols={6}>
                  {product !== null &&
                    Object.entries(imagen).forEach(([key, value]) => {
                      <ImageListItem key={key} sx={{ px: 1 }}>
                        <img
                          alt={key}
                          src={value}
                          srcSet={`${value}`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    })
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
                name="photos"
                placeholder="Enter photos"
                multiple={true}
                onChange={handleFileChange}
                id="filephotos"
              />
              <label htmlFor="filephotos">Inserte imagenes</label>
            </div>
            <div
              className={
                photos.length > 0
                  ? 'custom-file-preview files'
                  : 'custom-file-preview'
              }
            >
              {photos.length > 0 &&
                photos.map((item, index) => (
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
    let photosArr = []
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
        photosArr.push(fileObj)
        setPost({
          ...post,
          photos: [...photos, ...photosArr],
        })
      })
    }
  }
  const handleFileChange = (e) => {
    let files = e.target.files
    console.log(files)
    handleFiles(files)
  }

  const handleDelete = (e) => {
    let target = e.target.parentElement
    let targetindex = target.dataset.imgindex * 1
    console.log(target, targetindex)
    setPost({
      ...post,
      photos: [
        ...photos.slice(0, targetindex),
        ...photos.slice(targetindex + 1),
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
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
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
                  value={categoria || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                {imgManage(imagen)}
                <br />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Precio"
                  onChange={handleChange}
                  type="text"
                  name="precio"
                  value={precio || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Descripcion"
                  onChange={handleChange}
                  type="text"
                  name="descripcion"
                  value={descripcion || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
              </Grid>
            </Grid>
            {
              !isEditable || isEditable !== 'false'
                ? (
                  < Button color="primary" variant="contained" type="submit" >
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
          </ValidatorForm>
        </div>
      </SimpleCard>
    </Container >
  )
}

export default AddProduct