FROM node:16.4.1-alpine

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

WORKDIR /var/www/wa-project

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start:prod" ]