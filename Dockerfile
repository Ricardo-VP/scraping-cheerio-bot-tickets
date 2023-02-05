FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./bot.js .
COPY ./index.js .
COPY ./scraping.js .

CMD ["node", "index.js"]