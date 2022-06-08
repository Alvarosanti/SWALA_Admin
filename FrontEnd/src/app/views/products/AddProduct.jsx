import React from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import SimpleForm from '../../views/material-kit/forms/SimpleForm'
import { styled } from '@mui/system'

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
        <SimpleForm />
      </SimpleCard>
    </Container>
  )
}

export default AddProduct