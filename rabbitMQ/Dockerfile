FROM node:14-alpine

WORKDIR /rabbitmq
COPY package.json .

RUN yarn install
COPY . .

RUN apk add --no-cache bash
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

# CMD ["sh","-c","/bin/wait-for-it.sh rabbitMQ:15672 -- sh ./init.sh"]
