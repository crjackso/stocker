FROM node:21.2.0-alpine3.17

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

ENV NODE_VERSION=21.2.0
ENV NITRO_PORT=3010
ENV PATH=node_modules/.bin:$PATH

EXPOSE 3010

CMD ["yarn", "dev"]
