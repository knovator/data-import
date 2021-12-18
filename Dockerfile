FROM node:14-alpine

WORKDIR /app
COPY package.json .
# RUN npm i -g yarn
RUN yarn install
COPY . .
# ADD init.sh /
CMD npm run start
