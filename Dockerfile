FROM node:10-alpine

WORKDIR /srv/chn_react-front-master/

ENV PATH /srv/chn_react-front-master/node_modules/.bin:$PATH

RUN chown -R node:node /srv/chn_react-front-master/

COPY package.json ./

COPY package-lock.json ./

USER node

RUN npm install

COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]
