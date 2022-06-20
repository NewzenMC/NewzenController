FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY ./dist/ .

EXPOSE 5678

ENTRYPOINT ["npm", "start"]

