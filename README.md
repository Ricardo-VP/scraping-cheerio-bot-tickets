# Web/Bot Scraper - Class Music shows

## Description

Send an message every ```30 seconds``` when the tickets are available using a Telegram Bot

## Techonologies
1. Cheerio
2. NodeJS
3. Telegraf
4. Docker and Docker Compose

## Setup
1. You must create a bot using https://t.me/BotFather. Copy and paste the bot token into the .env variable called ```TELEGRAM_BOT_TOKEN```
2. Rename the file .env.example to .env (without .example)
3. Run ```docker-compose up -d``` (You must have docker installed: https://docs.docker.com/engine/install/ubuntu/)

## Logs
```docker-compose logs -f -t```

## Shut down
```docker-compose down```

## Telegram commands
1. Subscribe to the alerts: ```/suscribirmexd```
2. Unsubscribe: ```/stop``` 
