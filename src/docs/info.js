export const info = {
    definition: {
        openapi: '3.0.0',   
        info: {
            title: 'Desbordads eccommerce',
            version: '1.0.0',
            description: 'Tecnologías utilizadas: Node, Express, MongoDB'
        },
        servers: [  
            {
                url: 'http://localhost:3000/'
            },
            {

                url: 'https://desbordadasbackend.vercel.app/'

            }
        ]
    },
    apis: ['../src/docs/*yml']
}