all: build start

COMPOSE = docker compose -f ./compose.yml

build:
	@$(COMPOSE) build

start:
	@$(COMPOSE) up -d

dev: build
	@$(COMPOSE) watch

stop:
	@$(COMPOSE) stop

down:
	@$(COMPOSE) down

logs:
	@$(COMPOSE) logs -f

re: down all

.PHONY: all build start dev stop down logs re
