const Redis = require("ioredis");
const neo4j = require("neo4j-driver").default;

module.exports = {
    redisgraph: (host, port) => {
        console.log(`Connecting to RedisGraph at ${host}:${port}`)
        return new Redis(port, host)
    },
        neo4j: (uri, username, password, database) => {
            console.log(`Connecting to neo4j ${database} database at ${uri}`)
            const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {encrypted: 'ENCRYPTION_OFF'});
            return driver.session({'database': database});

        }
    }

