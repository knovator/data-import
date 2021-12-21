#!/bin/sh
node rabbitMQ/service.js &
node rabbitMQ/worker.js &
npm run start
