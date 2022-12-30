FROM node:16-alpine3.16

WORKDIR /dist
COPY package.json /dist
RUN npm install --force

COPY ./ /dist

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev" ]