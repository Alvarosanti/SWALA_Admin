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

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}))

const apiUrl = 'http://localhost:4000/api'

const AddOc = () => {
  const [oc, setOc] = useState({
    recursos: {
      nombreRecurso: '',
      precioRecurso: '',
      cantidadPedido: '',
      unidadMedida: '',
      subtotal: ''
    },
    numeroOc: '',
    proveedor_ruc: '',
    razon_social: '',
    estado: '',
    fechaCreacion: '',
  })
  const { search } = useLocation()
  const searchParam = new URLSearchParams(search)
  const isEditable = searchParam.get('isEditable')
  const idOc = searchParam.get('codigo')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${apiUrl}/oc/${idOc}`)
      .then((response) => {
        setOc(response.data.oc)
        //console.log("🚀 ~ file: AddOc.jsx ~ line 43 ~ .then ~ oc", response.data.oc)
      },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  const tittleName = () => {
    return (
      idOc !== null
        ? isEditable === 'true'
          ? 'Editar orden de compra'
          : 'Consultar orden de compra'
        : 'Agregar orden de compra'

    )
  }


  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Agregar orden de compra', path: '/oc/agregar' },
            { name: 'Orden de compra' },
          ]}
        />
      </div>
      <SimpleCard title={tittleName()}>
        <div>
          <ValidatorForm >
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                {isEditable !== null
                  ?
                  < TextField
                    label="N° Orden de compra"
                    //onChange={handleChange}
                    type="text"
                    name="nCompra"
                    value={oc.numeroOc || ''}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    disabled={true}
                  />
                  : ''
                }
                <TextField
                  label="RUC"
                  //onChange={handleChange}
                  type="text"
                  name="ruc"
                  value={oc.proveedor_ruc}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Fecha de creación"
                  //onChange={handleChange}
                  type="text"
                  name="stock"
                  value={oc.fechaCreacion}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Cantidad del pedido"
                  //onChange={handleChange}
                  type="text"
                  name="cantidad"
                  value={`${oc.recursos.cantidadPedido} ${oc.recursos.unidadMedida} ` || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Precio subtotal"
                  //onChange={handleChange}
                  type="number"
                  name="precioSubtotal"
                  value={oc.recursos.subtotal}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                <br />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Razon social"
                  //onChange={handleChange}
                  type="text"
                  name="nombre"
                  value={oc.razon_social || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Recurso"
                  //onChange={handleChange}
                  type="text"
                  name="recurso"
                  value={oc.recursos.nombreRecurso || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                < TextField
                  label="Precio recurso c/u"
                  //onChange={handleChange}
                  type="text"
                  name="precioRecurso"
                  value={oc.recursos.precioRecurso || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
                < TextField
                  label="Estado de la orden"
                  //onChange={handleChange}
                  type="text"
                  name="estadoOrden"
                  value={oc.estado || ''}
                  validators={['required']}
                  errorMessages={['Este campo es requerido']}
                  disabled={isEditable === 'false'}
                />
              </Grid>
            </Grid>
            <Button
              className="w-full"
              sx={{ height: '37px' }}
              color="secondary"
              variant="outlined"
              type="submit"
              onClick={() => navigate('/oc/listar')}
            >
              Volver
            </Button>
          </ValidatorForm>
        </div>
      </SimpleCard>
    </Container>
  )
}

export default AddOc