import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Paragraph } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    MenuItem,
    Select,
} from '@mui/material'
import { format } from 'date-fns'

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        height: 15,
        width: 50,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const TopSellingTable = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const [alert, setAlert] = useState([])

    const handleRemove = (index, id) => {
        axios
            .put(`http://localhost:4000/api/recurso/updateRecursoAlert/${id}`, {
                alerta: false,
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/api/recurso/getRecursoAlerta`)
            .then((response) => {
                setAlert(response.data.recurso)
            })
    }, [alert])

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>Productos por agotarse</Title>
                <Select size="small" defaultValue="this_month">
                    <MenuItem value="this_month">This Month</MenuItem>
                    <MenuItem value="last_month">Last Month</MenuItem>
                </Select>
            </CardHeader>
            <Box overflow="auto">
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                Alerta
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Fecha
                            </TableCell>
                            {/* <TableCell sx={{ px: 0 }} colSpan={2}>
                                Stock Status
                            </TableCell>  */}
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                Accion
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alert.map((resource, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    <Paragraph sx={{ m: 0, ml: 4 }}>
                                        <strong>{resource.nombre}:</strong> Stock mínimo: <strong>{resource.stockMinimo} {resource.medida}</strong>, su stock actual es:  <Small bgcolor={resource.stock === 0 ? bgError : bgSecondary}><strong>{resource.stock} {resource.medida}</strong>.</Small>
                                    </Paragraph>

                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    {format(new Date(resource.updatedAt), 'MM/dd/yyyy hh:mma')}
                                </TableCell>
                                {/* 
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                >
                                    {product.available ? (
                                        product.available < 20 ? (
                                            <Small bgcolor={bgSecondary}>
                                               <strong>{resource.stock} {resource.medida}</strong>.
                                            </Small>
                                        ) : (
                                            <Small bgcolor={bgPrimary}>
                                                in stock
                                            </Small>
                                        )
                                    ) : (
                                        <Small bgcolor={bgError}>
                                            out of stock
                                        </Small>
                                    )}
                                </TableCell>  */}
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                    <IconButton>
                                        <Icon onClick={() => handleRemove(index, resource._id)} color="primary">delete</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
            </Box>
        </Card>
    )
}

const productList = [
    {
        imgUrl: '/assets/images/products/headphone-2.jpg',
        name: 'earphone',
        price: 100,
        available: 15,
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'earphone',
        price: 1500,
        available: 30,
    },
    {
        imgUrl: '/assets/images/products/iphone-2.jpg',
        name: 'iPhone x',
        price: 1900,
        available: 35,
    },
    {
        imgUrl: '/assets/images/products/iphone-1.jpg',
        name: 'iPhone x',
        price: 100,
        available: 0,
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'Head phone',
        price: 1190,
        available: 5,
    },
]

export default TopSellingTable
