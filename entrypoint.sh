bash /docker-entrypoint.sh
neo4j start
neo4j-admin load --from /neo4j_db.dump
function changePassword() {
    echo 'neo4j1' | cypher-shell -u neo4j -p neo4j 2>/dev/null >&2
}
echo -n 'waiting for neo4j to load'
while ! changePassword; do
    sleep 1docker
    echo -n '.'
done
echo
npm start
