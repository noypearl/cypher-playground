FROM node:18-alpine
WORKDIR /var/app/
COPY . .
RUN npm ci
CMD [ "node", "index.js" ]
