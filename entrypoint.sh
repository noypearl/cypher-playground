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

echo noy
tail -f /dev/null
