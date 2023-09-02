const fs = require('fs')
const jsonServer = require('json-server')
const path = require('path')
const https = require('https')
const http = require('http')

// Опции для подключения сертификата https
const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
}

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800)
    })
    next()
})

// Эндпоинт для логина

server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
        )
        const { users = [] } = db

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        )

        if (userFromBd) {
            return res.json(userFromBd)
        }

        return res.status(403).json({ message: 'User not found' })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: e.message })
    }
})

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
// server.use((req, res, next) => {
//     if (!req.headers.authorization) {
//         return res.status(403).json({ message: 'AUTH ERROR' })
//     }

//     next()
// })

server.use(router)

// запуск сервера
const PORT = 8443
const HTTP_PORT = 8000

// Создаем HTTPS сервер для прода
const httpsServer = https.createServer(options, server)
httpsServer.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`)
})

// Создаем HTTP сервер для локальной разработки
const httpServer = http.createServer(options, server)
httpServer.listen(HTTP_PORT, () => {
    console.log(`server is running on ${HTTP_PORT} port`)
})

// server.listen(8000, () => {
//     console.log('server is running on 8000 port')
// })
