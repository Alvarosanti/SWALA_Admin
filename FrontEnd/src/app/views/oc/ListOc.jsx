import React from 'react'
import { SimpleCard, Breadcrumb } from '../../components'
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

const ListOc = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Listar orden de compra', path: '/oc/listar' },
                        { name: 'Orden de compra' },
                    ]}
                />
            </div>
        </Container>
    )
}

export default ListOc