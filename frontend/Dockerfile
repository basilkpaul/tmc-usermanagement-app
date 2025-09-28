FROM node:18

WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./src /app/src
COPY ./public /app/public
COPY .env /app/.env
EXPOSE 3000
CMD ["npm", "start"]