# Rightloom

## Project setup

```
cp .evn.exmaple .env
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/opt \
    -w /opt \
    laravelsail/php80-composer:latest \
    composer install --ignore-platform-reqs
alias sail='vendor/bin/sail'
sail up -d
sail npm install
sail php artisan migrate
sail php artisan storage:link
```

## Compiles for development

```
sail npm run dev
```
