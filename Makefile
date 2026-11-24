.DEFAULT_GOAL := help

COMPOSE := docker compose -f compose.yaml
# Pass command-specific Docker Compose flags with COMPOSE_ARGS, for example:
# make dev COMPOSE_ARGS="--detach"
COMPOSE_ARGS ?=
# Run multiple identical CRM service containers through the local load balancer.
CRM_REPLICAS ?= 2

.PHONY: help dev prod dev-down prod-down dev-logs prod-logs dev-api-logs dev-load-balancer-logs

help: ## Show available local environment commands
	@awk 'BEGIN {FS = ":.*##"}; /^[a-zA-Z_-]+:.*##/ {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@printf "\nPass Docker Compose flags with COMPOSE_ARGS, e.g. make dev COMPOSE_ARGS=\"--detach\"\n"

dev: ## Start the hot-reloading development environment
	$(COMPOSE) -f compose.dev.yaml up --build --scale crm-api=$(CRM_REPLICAS) $(COMPOSE_ARGS)

prod: ## Start the production-like environment
	$(COMPOSE) -f compose.prod.yaml up --build --scale crm-api=$(CRM_REPLICAS) $(COMPOSE_ARGS)

dev-down: ## Stop the development environment
	$(COMPOSE) -f compose.dev.yaml down $(COMPOSE_ARGS)

prod-down: ## Stop the production-like environment
	$(COMPOSE) -f compose.prod.yaml down $(COMPOSE_ARGS)

dev-logs: ## Follow development container logs
	$(COMPOSE) -f compose.dev.yaml logs --follow $(COMPOSE_ARGS)

prod-logs: ## Follow production container logs
	$(COMPOSE) -f compose.prod.yaml logs --follow $(COMPOSE_ARGS)

dev-api-logs: ## Follow structured CRM API request logs
	$(COMPOSE) -f compose.dev.yaml logs --follow crm-api

dev-load-balancer-logs: ## Follow development load-balancer access logs
	$(COMPOSE) -f compose.dev.yaml logs --follow crm-load-balancer
