import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import { Span } from 'app/components/Typography'
import { styled } from '@mui/system'
import { Button, Icon, Grid, } from '@mui/material'
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


const AddProduct = () => {
  const [state, setState] = useState({
    date: new Date(),
  })

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  }

  const handleChange = (event) => {
    event.persist()
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    //
  })

  const {
    firstName,
    category,
    price,
    description,
  } = state

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Agregar', path: '/producto/agregar' },
            { name: 'Producto' },
          ]}
        />
      </div>
      <SimpleCard title="Agregar producto">
        {/* <SimpleForm /> */}
        <div>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Nombre producto"
                  onChange={handleChange}
                  type="text"
                  name="productName"
                  value={firstName || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
                <TextField
                  label="Categoria"
                  onChange={handleChange}
                  type="text"
                  name="productCategory"
                  value={category || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Precio"
                  onChange={handleChange}
                  type="text"
                  name="productPrice"
                  value={price || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
                <TextField
                  label="Descripcion"
                  onChange={handleChange}
                  type="text"
                  name="productPrice"
                  value={description || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" type="submit">
              <Icon>add_box</Icon>
              <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                Agregar
              </Span>
            </Button>
          </ValidatorForm>
        </div>
      </SimpleCard>
    </Container>
  )
}

export default AddProduct