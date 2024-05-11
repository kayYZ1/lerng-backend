FROM node:18-alpine As dev

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV development

CMD [ "node", "dist/main.js" ]
