FROM node:14.17.2-alpine

#WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY server ./server
COPY prisma ./prisma
COPY client ./client
COPY .env ./.env
RUN yarn install
RUN yarn build
RUN yarn client:install
RUN yarn client:build

EXPOSE 4000

CMD [ "npm", "start" ]
