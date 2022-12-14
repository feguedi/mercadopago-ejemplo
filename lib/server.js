require('../config')
const Hapi = require('@hapi/hapi')

const isDev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'

async function server() {
    const Server = Hapi.server({
        port: process.env.PORT || 8080,
        host: '0.0.0.0',
    })

    const plugins = []

    isDev && plugins.push(require('../plugins/logs'))
    isDev && plugins.push(require('../plugins/pino'))

    await Server.register(plugins, { once: true })

    Server.route({
        method: 'GET',
        path: '/',
        handler: function () {
            return 'Hello World!'
        }
    })

    return Server
}

exports.init = async () => {
    try {
        const Server = await server()
        await Server.initialize()
    
        return Server
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

exports.start = async () => {
    try {
        const Server = await server()
        await Server.start()
        console.log(`Server running at: ${Server.info.uri}`)
    
        return Server
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
