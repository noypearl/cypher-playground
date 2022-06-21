const express = require('express')
const app = express()
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const { path:appRoot } = require('app-root-path');
const indexRouter = require('./routes')
const { app:app_config } = require('./config.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


app.use('/health', ((req, res) => {
    res.send("Let's GOO! #1337")
}))

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/api', indexRouter)

app.get('/', (req, res) => {
    return res.sendFile(path.join(appRoot ,'public', 'index.html'))
})
//     not found middleware
app.use((req, res) => {
    console.log("not found middleware-  returning 404 page")
    return res.status(404).sendFile(path.join(appRoot ,'public', '404.html'))
})

console.log(`[x] Server up and running at ${app_config.host}:${app_config.port}`)
app.listen(app_config.port)
