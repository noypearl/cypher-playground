
# Cypher Playground

## What?

A spongebob-themed vulnerable web app for learning Cypher Query Injection.
<br>

## What's here?
- Vulnerable NodeJS Web App at http://localhost:3030
- Redis Graph database w/ spongebob data
- Neo4J database w/ spongebob data 
- Swagger at port http://localhost:8888
- [Postman collection(s)](https://github.com/noypearl/cypher-playground/tree/main/postman)

## Why?

- To learn Cypher Query injections
- To apply the knowledge in Bug Bounty
- To protect against those injections in your apps
- To profit.

## Screenshots
![homepage](/screenshots/homepage.png?raw=true)
![error](/screenshots/404.png?raw=true)
![swagger](/screenshots/swagger.png?raw=true)

## How
### Build & run all 
```
docker-compose up
```

### Or - Build & run specific components from here: 
```
docker-compose up web neo4j redisgraph swagger
```
The web app will run at http://localhost:3030 and will listen to your HTTP requests.
<br> 
See your logs for more information.
### Browse the Swagger
Try it! http://localhost:8888

### Add & use custom Postman collections 
##### These are the collections of the REST api
- [RedisGraph-postman](https://github.com/noypearl/cypher-playground/blob/main/postman/redisgraph-spongebob%20.postman_collection.json) 
- [Neo4J-postman](https://github.com/noypearl/cypher-playground/blob/main/postman/neo4j-spongebob.postman_collection.json)

### Send API requests
{DB} - replace with `neo4j` or `redisgraph`

Action | Path | Description 
--- | --- | ---  
GET | /api/{DB}/internal-api/keys.txt | get secret
GET | /api/{DB}/characters | get all characters
GET | /api/{DB}/characters/name/:name | get character by name
GET | /api/{DB}/characters/id/:id | get character by id
GET | /api/{DB}/all | get all data
POST | /api/{DB}/characters | create new character
POST | /api/{DB}/places | create new place
POST | /api/{DB}/raw | run arbitrary query
DELETE | /api/{DB}/characters/id | delete character by id
DELETE | /api/{DB}/places/id | delete place by id

### Inject
Try to find an injection. 
<br> 
**Hint: URL encode your query params. 2nd Hint: See postman collections :)**

## Debugging & solutions to annoying problems
#### Redis Graph starts without default data!
- You might have to enable your directory to be discoverable by Docker volumes. 
See https://docs.docker.com/desktop/mac/#file-sharing
- Verify if that's the issue by accessing the swagger at http://locallhost:8888. Couldn't access it? Probable it's the same volume issue. See docker's link above. 

#### The injection doesn't work for me! I get a weird error!
Remember to URL encode your parameter since it's a URL param.

#### Neo4j Connection Errors
- Did you get `Connection refused` error when trying to start the docker?
- If so - add the `--force-recreate` flag when you run like this:
```
docker-compose up --force-recreate
``` 
- Still getting the same issue? Try to clean/flush docker data in your host and run again

## Credits
This app is based on [this open source project I found](https://github.com/morkin1792/CIWA)

## More
This app is a playground for the research I presented [here](https://bsidestlv.com/agenda/cypher_query_injection___the_new__sql_injection__we_aren_t_aware_of/)
<br>
You can see the actual slides I made for BSidesTLV 2022 talk [here](https://github.com/noypearl/cypher-playground/blob/main/BsidesTLV_2022_Presentation.pptx)
