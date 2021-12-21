#!/bin/sh
concurrently "npm run start" "npm run mq-service" "npm run mq-worker"
