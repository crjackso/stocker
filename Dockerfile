FROM node:21.2.0-alpine3.17

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE $NITRO_PORT

ENV PATH=node_modules/.bin:$PATH

CMD ["yarn", "dev"]
