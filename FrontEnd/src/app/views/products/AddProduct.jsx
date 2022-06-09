import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import { Span } from 'app/components/Typography'
import { styled } from '@mui/system'
import { Button, Icon, Grid, } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'


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
    iamgen: '',
    precio: '',
    descripcion: '',
  })
  const { search } = useLocation()
  const searchParam = new URLSearchParams(search)
  const isEditable = searchParam.get('isEditable')
  const idProduct = searchParam.get('codigo')
  const navigate = useNavigate()

  useEffect(() => {
    if (!idProduct) {
      setProduct({
        nombre: '',
        categoria: '',
        iamgen: '',
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
        })
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
                  value={nombre || ''}
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
                <TextField
                  label="Imagen"
                  onChange={handleChange}
                  type="text"
                  name="imagen"
                  value={imagen || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
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
            <Button color="primary" variant="contained" type="submit">
              <Icon>add_box</Icon>
              <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                Agregar
              </Span>
            </Button>
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
    </Container>
  )
}

export default AddProduct