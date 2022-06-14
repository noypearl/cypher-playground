const express = require('express')
const app = express()
const path = require('path');
const morgan = require('morgan');
const indexRouter = require('./routes')
const bodyParser = require('body-parser')

const {
    uri,
    user,
    password,
    database,
} = require('./config.json')

const PORT = 3030

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const neo4j = require('neo4j-driver').default
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {encrypted: 'ENCRYPTION_OFF'});
global.session = driver.session();
// global.session = driver.session({'database': database});


app.use(morgan('combined'))
app.use('/health', ((req, res) => {
    res.send("Up and running!")
}))

app.use('/', express.static(path.join(__dirname, 'static')))
app.use('/api', indexRouter)

//TODO - fix error handler to actually be error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(404
    ).send(`Error: ${err}`)
})

console.log(`[x] Server up and running on http://localhost:${PORT}`)
app.listen(PORT)

