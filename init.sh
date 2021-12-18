#!/bin/sh
npm start &
npm rabbitMQ/service.js &
npm rabbitMQ/worker.js
