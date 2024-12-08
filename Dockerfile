FROM node:18-alpine

WORKDIR /phishing

COPY apps/backend/package.json ./

RUN npm i -g @nestjs/cli chalk@4.1.2 --silent

RUN npm install --silent

COPY apps/backend ./

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
