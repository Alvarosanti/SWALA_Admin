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
  const [personName, setPersonName] = React.useState([]);

  useEffect(() => {
    if (idProvider !== null && isEditable !== null) {
      axios.get(`${apiUrl}/provider/${idProvider}`)
        .then((response) => {
          console.log(response.data.provider)
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

  const createProvider = async () => {
    function generatorNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    try {
      const form = new FormData();
      // aform
      // for (let key in product) {
      //   form.append(key, product[key]);
      // }
      form.append('razon_social', provider.razon_social)
      form.append('ruc', provider.ruc)
      form.append('correo', provider.correo)
      form.append('contacto', provider.contacto)
      form.append('celular', provider.celular)
      form.append('descuento', provider.descuento)
      form.append('producto', provider.productos)


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

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
                <div>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Productos</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={''}
                      onChange={handleChange1}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {''.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
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
                  value={provider.descuento || ''}
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