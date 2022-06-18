const Redis = require("ioredis");
const neo4j = require("neo4j-driver").default;

module.exports = {
    redisgraph: (host, port) => {
        console.log(`Connecting to redisgraph at ${host}:${port}`)

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
// TODO - change to docker host
        const redis = new Redis(port, host);
        redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

// ioredis supports the node.js callback style
        redis.get("mykey", (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result); // Prints "value"
            }
        });

// Or ioredis returns a promise if the last argument isn't a function
        redis.get("mykey").then((result) => {
            console.log(result); // Prints "value"
        });
        return redis
    },
    neo4j: (uri,username,password, database) => {
        // console.log(`Connecting to neo4j ${database} database at ${uri}}`)
        console.log(`Connecting to neo4j ${database} database at ${uri}  `)
        const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {encrypted: 'ENCRYPTION_OFF'});
        return driver.session({'database': database});

    }
}

