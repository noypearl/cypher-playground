const Redis = require("ioredis");

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

        redis.zadd("sortedSet", 1, "one", 2, "dos", 4, "quatro", 3, "three");
        redis.zrange("sortedSet", 0, 2, "WITHSCORES").then((elements) => {
            // ["one", "1", "dos", "2", "three", "3"] as if the command was `redis> ZRANGE sortedSet 0 2 WITHSCORES`
            console.log(elements);
        });

// All arguments are passed directly to the redis server,
// so technically ioredis supports all Redis commands.
// The format is: redis[SOME_REDIS_COMMAND_IN_LOWERCASE](ARGUMENTS_ARE_JOINED_INTO_COMMAND_STRING)
// so the following statement is equivalent to the CLI: `redis> SET mykey hello EX 10`
        redis.set("mykey", "hello", "EX", 10);

    },
    neo4j: (uri,username,password, database) => {
        console.log(`Connecting to neo4j ${database} database at ${uri}}`)
        const neo4j = require('neo4j-driver').default
        const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {encrypted: 'ENCRYPTION_OFF'});
        global.session = driver.session({'database': database});

    }
}

