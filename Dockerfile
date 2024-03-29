FROM node:14-alpine

WORKDIR /app
COPY package.json .

RUN yarn install
COPY . .

RUN apk add --no-cache bash
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

RUN npm install -g concurrently

# ADD init.sh /
ADD init.sh /init.sh
RUN chmod +x /init.sh

CMD ["sh","-c","/bin/wait-for-it.sh rabbitMQ:15672 -- sh ./init.sh"]
