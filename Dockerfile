FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm i -g @nestjs/cli chalk@4.1.2 --silent

RUN npm install --silent

COPY . ./

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
