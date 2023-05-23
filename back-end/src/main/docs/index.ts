

import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
    openapi: '3.0.0',
    info: {
        title: 'CMS Brave',
        description: 'API desenvolvida para servir de base para projetos internos que precisem de um gerenciador de conteúdo',
        version: '1.0.0'
    },
    servers: [{
        url: '/api',
        description: 'Servidor Principal',
    }],
    tags: [{
        name: 'Login',
        description: 'APIs relacionadas a Login'
    },{
        name: 'Contents',
        description: 'APIs relacionadas a busca e listagem de conteúdos'
    },
    {
        name: 'Contents by admin',
        description: 'APIs relacionadas a criação, edição e busca de conteúdos por administradores'
    },
    {
        name: 'Uploads',
        description: 'APIs relacionadas a uploads de imagens'
    },
    {
        name: 'Users',
        description: 'APIs relacionadas a usuarios'
    },
    {
        name: 'Dashboard',
        description: 'APIs relacionadas a dashboard'
    }
    ],
    paths,
    schemas,
    components
}