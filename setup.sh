#!/bin/sh

cp .env.example .env
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/opt \
    -w /opt \
    laravelsail/php80-composer:latest \
    composer install --ignore-platform-reqs
alias sail='vendor/bin/sail'
sail up -d
sail artisan key:generate
sleep 5
sail artisan migrate
sail artisan storage:link
sail npm install

sail npm run dev
