FROM neo4j:4.4.8-enterprise

ENV NEO4J_ACCEPT_LICENSE_AGREEMENT yes
ENV NEO4J_apoc_import_file_enabled yes
ENV NEO4J_PASS=hello
ENV NEO4J_USER=neo4j
ENV NEO4J_AUTH=$NEO4J_USER/$NEO4J_PASS
ENV NEO4J_apoc_import_file_use__neo4j__config true

WORKDIR /var/app/
COPY entrypoint.sh .
COPY spongebob-db.dump .

ENTRYPOINT [ "/bin/bash", "entrypoint.sh" ]
