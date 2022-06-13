FROM neo4j:enterprise
WORKDIR /var/app/
COPY entrypoint.sh .
ENV NEO4J_ACCEPT_LICENSE_AGREEMENT yes
ENV NEO4J_apoc_import_file_enabled yes
ENV NEO4J_PASS=hello
ENV NEO4J_AUTH=neo4j/$NEO4J_PASS
ENV NEO4J_apoc_import_file_use__neo4j__config true

CMD [ "bash", "/var/app/entrypoint.sh" ]
