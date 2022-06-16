const express = require('express')
const app = express()
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const indexRouter = require('./routes')
const connection = require('./connection')
const { redisgraph:redisgraph_config, app:app_config } = require('./config.json')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))

app.use('/health', ((req, res) => {
    res.send("Let's GOO! #1337")
}))

console.log("Initializing database connection")
redisGraphSession = connection.redisgraph(redisgraph_config.host, redisgraph_config.port)

app.use('/', express.static(path.join(__dirname, 'static')))
app.use('/api', indexRouter)


//TODO - fix error handler to actually be error handler
app.use((err, req, res, next) => {
    console.error(err.body)
    res.status(404
    ).send(`Error: ${err}`)
})

console.log(`[x] Server up and running on http://localhost:${app_config.port}`)
app.listen(app_config.port)

