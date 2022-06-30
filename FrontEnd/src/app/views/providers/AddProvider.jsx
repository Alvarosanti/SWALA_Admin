import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb } from '../../../app/components'
import { Span } from 'app/components/Typography'
import { styled } from '@mui/system'
import { Button, Icon, Grid, ImageList, ImageListItem, Typography, Slide, Snackbar, Alert, MenuItem, Select } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'
import { green } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

//rafce
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const apiUrl = 'http://localhost:4000/api'

const AddProvider = () => {
  const [provider, setProvider] = useState({
    date: new Date(),
    razon_social: '',
    ruc: '',
    correo: '',
    contacto: '',
    celular: '',
    descuento: '',
    productos: [],
  })
  const { search } = useLocation()
  const searchParam = new URLSearchParams(search)
  const isEditable = searchParam.get('isEditable')
  const idProvider = searchParam.get('codigo')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [Transition, setTransition] = useState(undefined);
  const [hasError, setError] = useState(true)
  const theme = useTheme();
  const [resourceName, setResourceName] = React.useState([]);
  const [recurso, setRecurso] = useState([])

  useEffect(() => {
    if (idProvider !== null && isEditable !== null) {
      axios.get(`${apiUrl}/provider/${idProvider}`)
        .then((response) => {
          setProvider(response.data.provider)

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
      ? createProvider()
      : updateProvider()
  }

  var arr = []
  for (var i = 0; i < resourceName.length; i++) {
    arr.push(resourceName[i].nombre);
  }

  const createProvider = async () => {
    try {
      const form = new FormData();
      form.append('razon_social', provider.razon_social)
      form.append('ruc', provider.ruc)
      form.append('correo', provider.correo)
      form.append('contacto', provider.contacto)
      form.append('celular', provider.celular)
      form.append('descuento', provider.descuento)
      form.append('recurso', arr)

      await axios.post(`${apiUrl}/provider/createProvider`,
        form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      navigate('/proveedor/listar')
    } catch (error) {
      console.log("🚀 ~ file: AddProvider.jsx ~ line 105 ~ createProvider ~ error", error)
    }
  }

  const updateProvider = async () => {
    try {
      const form = new FormData();
      form.append('razon_social', provider.razon_social)
      form.append('ruc', provider.ruc)
      form.append('correo', provider.correo)
      form.append('contacto', provider.contacto)
      form.append('celular', provider.celular)
      form.append('descuento', provider.descuento)
      form.append('recurso', resourceName)
      await axios.put(`${apiUrl}/provider/updateProvider/${idProvider}`,
        form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      navigate('/proveedor/listar')
    } catch (error) {
      console.log("🚀 ~ file: AddProvider.jsx ~ line 125 ~ updateProvider ~ error", error)
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
    setProvider({
      ...provider,
      [event.target.name]: event.target.value,
    })
    setError(false)
  }

  const tittleName = () => {
    return (
      idProvider !== null
        ? isEditable === 'true'
          ? 'Editar proveedor'
          : 'Consultar proveedore'
        : 'Agregar proveedor'

    )
  }

  const handleChangeResource = (value) => {
    setResourceName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    axios.get(`${apiUrl}/recurso/getRecursoHabilitado`)
      .then((response) => {
        setRecurso(response.data.recurso)
      },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: tittleName(), path: '/proveedor/agregar' },
            { name: 'Proveedor' },
          ]}
        />
      </div>
      <SimpleCard title={tittleName()}>
        <div>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Razon social"
                  onChange={handleChange}
                  type="text"
                  name="razon_social"
                  value={provider.razon_social || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="RUC"
                  onChange={handleChange}
                  type="text"
                  name="ruc"
                  value={provider.ruc || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Correo"
                  onChange={handleChange}
                  type="text"
                  name="correo"
                  value={provider.correo || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                {
                  isEditable === 'false'
                    ?
                    <TextField
                      label="Recurso"
                      onChange={handleChange}
                      type="text"
                      name="recurso"
                      value={provider.recurso || ''}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      disabled={isEditable === 'false'}
                    />
                    :
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={recurso}
                      getOptionLabel={(option) => option.nombre}
                      filterSelectedOptions
                      value={resourceName}
                      onChange={function (event, newValue) { return handleChangeResource(newValue) }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Recurso"
                          placeholder="Buscar..."
                        />
                      )}
                    />
                }

              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Contacto"
                  onChange={handleChange}
                  type="text"
                  name="contacto"
                  value={provider.contacto || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Celular"
                  onChange={handleChange}
                  type="text"
                  name="celular"
                  value={provider.celular || ''}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
                <TextField
                  label="Descuento %"
                  onChange={handleChange}
                  type="text"
                  name="descuento"
                  value={provider.descuento}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  disabled={isEditable === 'false'}
                />
              </Grid>
            </Grid>
            <br />
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
              onClick={() => navigate('/proveedor/listar')}
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
                Proveedor agregado exitosamente!
              </Alert>
            </Snackbar>
          </ValidatorForm>
        </div>
      </SimpleCard>
    </Container >
  )
}

export default AddProvider