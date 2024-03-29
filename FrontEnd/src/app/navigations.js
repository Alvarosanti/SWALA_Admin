export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    {
        label: 'MENU',
        type: 'label',
    },
    // {
    //     name: 'Session/Auth',
    //     icon: 'security',
    //     children: [
    //         {
    //             name: 'Sign in',
    //             iconText: 'SI',
    //             path: '/session/signin',
    //         },
    //         {
    //             name: 'Sign up',
    //             iconText: 'SU',
    //             path: '/session/signup',
    //         },
    //         {
    //             name: 'Forgot Password',
    //             iconText: 'FP',
    //             path: '/session/forgot-password',
    //         },
    //         {
    //             name: 'Error',
    //             iconText: '404',
    //             path: '/session/404',
    //         },
    //     ],
    // },
    {
        name: 'Productos',
        icon: 'computer',
        children: [
            {
                name: 'Agregar productos',
                iconText: 'AP',
                path: '/producto/agregar',
            },
            {
                name: 'Listar productos',
                iconText: 'LP',
                path: '/producto/listar',
            },
        ],
    },
    {
        name: 'Proveedores',
        icon: 'computer',
        children: [
            {
                name: 'Agregar proveedores',
                iconText: 'AP',
                path: '/proveedor/agregar',
            },
            {
                name: 'Listar proveedores',
                iconText: 'LP',
                path: '/proveedor/listar',
            },
        ],
    },
    {
        name: 'Recurso',
        icon: 'computer',
        children: [
            {
                name: 'Agregar recursos',
                iconText: 'AP',
                path: '/recurso/agregar',
            },
            {
                name: 'Listar recursos',
                iconText: 'LP',
                path: '/recurso/listar',
            },
        ],
    },
    {

        name: 'Pedido',
        icon: 'computer',
        children: [
            // {
            //     name: 'Agregar pedido',
            //     iconText: 'AP',
            //     path: '/pago/agregar',
            // },
            {
                name: 'Listar pedidos',
                iconText: 'LP',
                path: '/pago/listar',
            },
        ],
    },
    {

        name: 'Orden de compra',
        icon: 'computer',
        children: [
            {
                name: 'Listar orden de compra',
                iconText: 'LP',
                path: '/oc/listar',
            },
        ],
    }


    // {
    //     label: 'Components',
    //     type: 'label',
    // },
    // {
    //     name: 'Components',
    //     icon: 'favorite',
    //     badge: { value: '30+', color: 'secondary' },
    //     children: [
    //         {
    //             name: 'Auto Complete',
    //             path: '/material/autocomplete',
    //             iconText: 'A',
    //         },
    //         {
    //             name: 'Buttons',
    //             path: '/material/buttons',
    //             iconText: 'B',
    //         },
    //         {
    //             name: 'Checkbox',
    //             path: '/material/checkbox',
    //             iconText: 'C',
    //         },
    //         {
    //             name: 'Dialog',
    //             path: '/material/dialog',
    //             iconText: 'D',
    //         },
    //         {
    //             name: 'Expansion Panel',
    //             path: '/material/expansion-panel',
    //             iconText: 'E',
    //         },
    //         {
    //             name: 'Form',
    //             path: '/material/form',
    //             iconText: 'F',
    //         },
    //         {
    //             name: 'Icons',
    //             path: '/material/icons',
    //             iconText: 'I',
    //         },
    //         {
    //             name: 'Menu',
    //             path: '/material/menu',
    //             iconText: 'M',
    //         },
    //         {
    //             name: 'Progress',
    //             path: '/material/progress',
    //             iconText: 'P',
    //         },
    //         {
    //             name: 'Radio',
    //             path: '/material/radio',
    //             iconText: 'R',
    //         },
    //         {
    //             name: 'Switch',
    //             path: '/material/switch',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Slider',
    //             path: '/material/slider',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Snackbar',
    //             path: '/material/snackbar',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Table',
    //             path: '/material/table',
    //             iconText: 'T',
    //         },
    //     ],
    // },
    // {
    //     name: 'Charts',
    //     icon: 'trending_up',

    //     children: [
    //         {
    //             name: 'Echarts',
    //             path: '/charts/echarts',
    //             iconText: 'E',
    //         },
    //     ],
    // },
]
