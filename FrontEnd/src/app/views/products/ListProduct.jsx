import React from 'react'
import PaginationTable from '../../views/material-kit/tables/PaginationTable'
import { SimpleCard, Breadcrumb } from '../../../app/components'
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

const ListProduct = () => {
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
                    <PaginationTable />
                </SimpleCard>
            </Container>
        </div>
    )
}

export default ListProduct;
