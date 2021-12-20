#!/bin/sh
node rabbitMQ/worker.js &
md-seed run &
npm run start &
npm run seed:clean
