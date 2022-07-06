import React, { useState, useEffect } from 'react'
import { SimpleCard, Breadcrumb, ConfirmationDialog } from '../../../app/components'
import { styled, Box } from '@mui/system'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Avatar,
    Tooltip,
    LinearProgress,
    TextField,
} from '@mui/material'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

//useHistory(v5rrd) x useNavigate(v6^rrd)
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

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const apiUrl = 'http://localhost:4000/api'

const ListPago = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [pagos, setpagos] = useState([])
    const [pagosId, setIdpagos] = useState(null)
    const [pagosName, setNamepagos] = useState(null)
    const [pagosState, setpagosState] = useState('')
    const [isOpenModalChangeState, setIsOpenModalChangeState] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [status, setStatus] = React.useState('habilitado');
    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handlePagosDetail = (idPagos) => {
        navigate(`/pago/editar?codigo=${idPagos}&isEditable=false`)
    }

    const handlePagosEdit = (idPagos) => {
        navigate(`/pago/editar?codigo=${idPagos}&isEditable=true`)
    }



    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            axios.get(`${apiUrl}/pagos`)
                .then((response) => {
                    setpagos(response.data.pagos)             
               setLoading(false)
                    console.log(response.data.pagos)
                },
                    (error) => {
                        console.log(error)
                    }
                )
        }, 1000)
    }, [])
    
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    }

    const dataSource = pagos
    
    console.log(pagos)

            return(
                <div>
                {
                   <Container>
                        <div className="breadcrumb">
                        <Breadcrumb
                        routeSegments={[
                                 {name:'Listado', path:'/pago/listar'},
                                {name:'Pagos'},
                                        ]}  />
                </div>
            {
    !isLoading
    ?
    <SimpleCard title="Pedidos">
        <div>

        </div>
                <Box width="100%" overflow="auto">
                <StyledTable>
                <TableHead>
                                            <TableRow width={500}>
                                                <TableCell width={100}>Cliente</TableCell>
                                                <TableCell width={100}>email</TableCell>
                                                <TableCell width={100}>Fecha Creacion</TableCell>
                                                <TableCell width={100}>Fecha Entrega</TableCell>
                                                <TableCell width={100}>Acciones</TableCell>
                                                
                                            </TableRow>
                                        </TableHead>
                    <TableBody>
                       {dataSource.length != 0
                        ?
                        dataSource
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((pagos, index) => (
                                <TableRow width={500}>
                                <TableCell align="left" width={100} key="Nombre">
                               {pagos.nombre} 
                                 </TableCell>
                                 <TableCell align="left" width={100} key="email">
                                {pagos.email} 
                                 </TableCell>
                                 <TableCell align="left" width={100} key="createdAt">
                                {pagos.createdAt} 
                                 </TableCell>
                                 <TableCell align="left" width={100} key="FechaEntrega">
                                {pagos.fechaEntrega}
                                 </TableCell>
                                 <TableCell align="left" width={100}>
                                 <Tooltip title="Visualizar">
                                                         <IconButton
                                              onClick={() => handlePagosDetail(pagos._id)}
                                                             >
                                                         <Icon color="primary">visibility</Icon>
                                                         </IconButton>
                                                     </Tooltip>
                                 </TableCell>
                                </TableRow>
                            ))
                            : 
                            <TableRow>
                                                    <TableCell />
                                                    <TableCell />
                                                    <TableCell>
                                                        No data
                                                        <br />
                                                        &nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/windows/32/undefined/no-data-availible.png" />
                                                    </TableCell>
                                                    <TableCell />
                                                    <TableCell />
                                                </TableRow>
                       } 
                    </TableBody>
                </StyledTable>
                <TablePagination
                                        sx={{ px: 2 }}
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={dataSource.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                </Box>


    </SimpleCard>
    :
 // <CircularProgress className="progress" color="secondary" />
 <LinearProgress color="secondary" />
}
                   </Container>
                }
    
               
            </div >



            )

}






export default ListPago;