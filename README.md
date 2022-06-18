
# Cypher Playground

## What?

A spongebob-themed vulnerable web app for learning Cypher Query Injection.
TODO - add swagger :) https://metamug.com/util/postman-to-swagger/
## Why?

- To learn Cypher Query injections
- To apply the knowledge in Bug Bounty
- To protect against those injections in your apps
- To profit.

## How
### Run docker
```
docker huetueot
```
The app will run at localhost:3030

### Browser the Swagger
Try it! http://localhost:8888

### Download the Postman collection

TODO - add here

### Send API requests
Action | Path | Description 
--- | --- | ---  
GET | /api/neo4j/ | get secret
GET | /api/neo4j/characters | get all characters
GET | /api/neo4j/characters/name/:name | get character by name
GET | /api/neo4j/characters | get all characters
GET | /api/neo4j/characters | get all characters
GET | /api/neo4j/characters | get all characters
GET | /api/neo4j/characters | get all characters
GET | /api/neo4j/characters | get all characters
GET | /api/neo4j/characters | get all characters


### Inject
Try to find an injection. Hint: URL encode your query params. :)


## What Else?
- There's a postman collection of the REST api
- You can either explore Neo4J or RedisGraph

## Debugging & solutions to annoying problems
#### Redis Graph starts without default data!
- You might have to enable your directory to be discoverable by Docker volumes. 
See https://docs.docker.com/desktop/mac/#file-sharing
- Verify if that's the issue by accessing the swagger at http://locallhost:8888. Couldn't access it? Probable it's the same volume issue. See docker's link above. 

#### The injection doesn't work for me! I get a weird error!
Remember to URL encode your parameter since it's a URL param.


## Credits
This app is based on [this open source project I found](https://github.com/morkin1792/CIWA)


TODO - change dis


add Postman collectino
Add neo4j references
Add presentation BSides link

Add table of  api requests

Add docker start & build instructions
