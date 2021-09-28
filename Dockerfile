FROM node:16.4.1-alpine

WORKDIR /var/www/wa-project

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start:prod" ]