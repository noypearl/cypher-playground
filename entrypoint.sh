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
neo4j-admin load --from=/var/app/spongebob-db.dump --database=spongebob

# create database to use after load
cypher-shell -u $NEO4J_USER -p $NEO4J_PASS "CREATE DATABASE spongebob"

sleep 5
echo neo4j database is ready!
tail -f /dev/null
