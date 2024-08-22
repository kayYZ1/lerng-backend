FROM node:18-alpine As prod 

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
