const express = require('express');
const router = express.Router();

const executeQuery = async (query, params) => {
    let result = ''
    try {
        // TODO - make try / catch nicer - consult w/ Mev
        result = await session.run(query, params);
        result = result.records
    } catch (e) {
        result = e.toString()
    }
    return result
}

//Run arbitrary query - TRY IT OUT! :)
router.post('/raw', async (req, res) => {
    const query = req.body.query
    res.send(await executeQuery(query))
})

router.post('/characters', async (req, res, next ) => {
    const name = req.body.name
    if(!name){
        return next("No name was provided")
    }
    res.send(await executeQuery(`CREATE (c:Character {name: '${name}'}) return c`))
})

router.post('/places', async (req, res, next ) => {
    const name = req.body.name
    if(!name){
        return next("No name was provided")
    }
    res.send(await executeQuery(`CREATE (p:Place {name: '${name}'}) return p`))
})

router.get('/characters', async (req, res) => {
    res.send(await executeQuery('MATCH (c:Character) return c'))
})

router.get('/characters/id/:id', async (req, res) => {
    const id = req.params.id
    if(!id){
        return next("No id was provided")
    }
    res.send(await executeQuery('MATCH (c:Character) WHERE id(c) = ' + id + ' RETURN c'))
})

router.get('/places/id/:id', async (req, res) => {
    const id = req.params.id
    if(!id){
        return next("No id was provided")
    }
    res.send(await executeQuery('MATCH (p:Place) WHERE id(p) = ' + id + ' RETURN p'))
})

router.get('/places', async (req, res) => {
    res.send(await executeQuery('MATCH (p:Place) return p'))
})

router.get('/characters/name/:name', async (req, res) => {
    const name = req.params.name
    if(!name){
        return next("No name was provided")
    }
    res.send(await executeQuery("MATCH (c:Character) WHERE c.name = '" + name + "' RETURN c"))
})

router.get('/places/name/:name', async (req, res) => {
    const name = req.params.name
    if(!name){
        return next("No name was provided")
    }
    res.send(await executeQuery("MATCH (p:Place) WHERE p.name = '" + name + "' RETURN p"))
})

router.delete('/places/id/:id', async (req, res) => {
    const id = req.params.id
    if(!id){
        return next("No id was provided")
    }
    res.send(await executeQuery("MATCH (p:Place) WHERE ID(p) = " + id + " DETACH DELETE p"))
})

router.delete('/characters/id/:id', async (req, res) => {
    const id = req.params.id
    if(!id){
        return next("No id was provided")
    }
    res.send(await executeQuery("MATCH (c:Character) WHERE ID(c) = " + id + " DETACH DELETE c"))
})

router.get('/all', async (req, res) => {
    res.send(await executeQuery('MATCH (c:Character) MATCH (p:Place) RETURN c,p'))
})

//Top secret route!
router.get('/internal-api/keys.txt', async (req, res) => {
    const secret = "Krabby Patty Secret Formula - DO NOT EXPOSE AT ANY CIRCUMSTANCES"
    res.send(secret)
})

module.exports = router;
