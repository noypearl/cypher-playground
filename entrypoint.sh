#! /bin/bash

bash /docker-entrypoint.sh
neo4j start

function changePassword() {
    neo4j-admin set-initial-password $NEO4J_PASS
}

echo 'waiting for neo4j to load'

while ! changePassword; do
    sleep 1
    echo '.'
done

# load spongebob db
echo starting to load neo4j database dump data
neo4j-admin load --from=/var/app/spongebob-db.dump --database=spongebob

# create database to use after load
cypher-shell -u $NEO4J_USER -p $NEO4J_PASS "CREATE DATABASE spongebob IF NOT EXISTS"

sleep 5
echo neo4j - spongebob database is ready!
echo Done! Server is up at http://localhost:3030
echo try to access neo4j browser locally at http://0.0.0.0:7474 or see the swagger at http://localhost:8888
tail -f /dev/null
