.DEFAULT_GOAL := help

COMPOSE := docker compose -f compose.yaml

.PHONY: help dev prod dev-down prod-down dev-logs prod-logs

help: ## Show available local environment commands
	@awk 'BEGIN {FS = ":.*##"}; /^[a-zA-Z_-]+:.*##/ {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start the hot-reloading development environment
	$(COMPOSE) -f compose.dev.yaml up --build

prod: ## Start the production-like environment
	$(COMPOSE) -f compose.prod.yaml up --build

dev-down: ## Stop the development environment
	$(COMPOSE) -f compose.dev.yaml down

prod-down: ## Stop the production-like environment
	$(COMPOSE) -f compose.prod.yaml down

dev-logs: ## Follow development container logs
	$(COMPOSE) -f compose.dev.yaml logs --follow

prod-logs: ## Follow production container logs
	$(COMPOSE) -f compose.prod.yaml logs --follow
