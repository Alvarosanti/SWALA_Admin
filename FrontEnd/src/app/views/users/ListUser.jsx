import React from 'react'
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
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Listar usuario', path: '/usuario/listar' },
                        { name: 'Usuario' },
                    ]}
                />
            </div>
        </Container>
    )
}

export default ListProduct