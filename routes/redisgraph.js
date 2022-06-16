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



module.exports = router;
