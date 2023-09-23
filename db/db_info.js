module.exports = (() => {
    return{
        real : {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'youtube-translate-app'
        },
        local : {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'youtube-translate-app'
        },
        dev: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();