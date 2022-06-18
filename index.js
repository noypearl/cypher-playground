const express = require('express')
const app = express()
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const indexRouter = require('./routes')
const { app:app_config } = require('./config.json')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))

app.use('/health', ((req, res) => {
    res.send("Let's GOO! #1337")
}))

app.use('/', express.static(path.join(__dirname, 'static')))
app.use('/api', indexRouter)


//TODO - fix error handler to actually be error handler
app.use((err, req, res, next) => {
    console.error(err.body)
    res.status(404
    ).send(`Error: ${err}`)
})

console.log(`[x] Server up and running on ${app_config.host}:${app_config.port}`)
app.listen(app_config.port)

