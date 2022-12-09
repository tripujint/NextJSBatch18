module.exports = {
    domain: 'http://localhost:8080',
    urlImg: 'http://localhost:8080/api/region/files',
    image: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3002',
                pathname: '/api/region/files/**',
            },
        ],
    }
}