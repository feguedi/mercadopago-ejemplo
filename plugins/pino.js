module.exports = ({
    plugin: require('hapi-pino'),
    options: {
        prettyPrint: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
        ignoredEventTags: {
            log: ['TEST'],
        },
        redact: ['request.headers.authorization', 'request.payload', 'request.query'],
        logQueryParams: true,
    },
})
