FROM redislabs/redisgraph:2.8.13

WORKDIR /var/app/
# TODO - copy previous redisgraph data
RUN npm ci

COPY . .
CMD [ "node", "index.js" ]
