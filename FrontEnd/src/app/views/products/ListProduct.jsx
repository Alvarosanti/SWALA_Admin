import React from 'react'
import PaginationTable from '../../views/material-kit/tables/PaginationTable'
import { SimpleCard, Breadcrumb } from '../../../app/components'
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
} from '@mui/material'

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


const ListProduct = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    const subscribarList = [
        {
            name: 'john doe',
            date: '18 january, 2019',
            amount: 1000,
            status: 'close',
            company: 'ABC Fintech LTD.',
        },
        {
            name: 'kessy bryan',
            date: '10 january, 2019',
            amount: 9000,
            status: 'open',
            company: 'My Fintech LTD.',
        },
        {
            name: 'kessy bryan',
            date: '10 january, 2019',
            amount: 9000,
            status: 'open',
            company: 'My Fintech LTD.',
        },
        {
            name: 'james cassegne',
            date: '8 january, 2019',
            amount: 5000,
            status: 'close',
            company: 'Collboy Tech LTD.',
        },
        {
            name: 'lucy brown',
            date: '1 january, 2019',
            amount: 89000,
            status: 'open',
            company: 'ABC Fintech LTD.',
        },
        {
            name: 'lucy brown',
            date: '1 january, 2019',
            amount: 89000,
            status: 'open',
            company: 'ABC Fintech LTD.',
        },
        {
            name: 'lucy brown',
            date: '1 january, 2019',
            amount: 89000,
            status: 'open',
            company: 'ABC Fintech LTD.',
        },
        {
            name: 'lucy brown',
            date: '1 january, 2019',
            amount: 89000,
            status: 'open',
            company: 'ABC Fintech LTD.',
        },
        {
            name: 'lucy brown',
            date: '1 january, 2019',
            amount: 89000,
            status: 'open',
            company: 'ABC Fintech LTD.',
        },
    ]

    return (
        <div>
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Listado', path: '/producto/listar' },
                            { name: 'Productos' },
                        ]}
                    />
                </div>
                <SimpleCard title="Productos">
                    {/* <PaginationTable /> */}
                    <Box width="100%" overflow="auto">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Codigo producto</TableCell>
                                    <TableCell>Precio/u</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subscribarList
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((subscriber, index) => (
                                        <TableRow key={index}>
                                            <TableCell >
                                                <div style={{ position: 'relative', float: 'left', textAlign: 'right' }}>
                                                    <Avatar
                                                        src={''}
                                                        sx={{ cursor: 'pointer' }}>
                                                    </Avatar>
                                                </div>
                                                <div style={{ paddingTop: '10px', paddingLeft: '50px' }}>
                                                    {subscriber.name}
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                {subscriber.company}
                                            </TableCell>
                                            <TableCell align="left">
                                                {subscriber.date}
                                            </TableCell>
                                            <TableCell>{subscriber.status}</TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <Icon color="edi">edit</Icon>
                                                </IconButton>
                                                <IconButton>
                                                    <Icon color="error">do_not_disturb_alt</Icon>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </StyledTable>
                        <TablePagination
                            sx={{ px: 2 }}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={subscribarList.length}
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
                    </Box >
                </SimpleCard>
            </Container>
        </div>
    )
}

export default ListProduct;
