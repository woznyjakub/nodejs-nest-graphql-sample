SHELL := /bin/bash

APP_NAME = nodejs-nest-graphql-sample
NODE_APP_NAME = api

help:
	@grep -E '^[1-9a-zA-Z_-]+:.*?## .*$$|(^#--)' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m %-43s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m #-- /[33m/'

#-- Docker
up: ## Up the container images
	docker-compose up -d

down: ## Down the container images
	docker-compose down

ri: ## Remove the images
	docker images -q --filter "reference=${APP_NAME}*" | xargs docker rmi

rv: ## Remove the volumes
	docker volume ls -q --filter "name=${APP_NAME}*" | xargs docker volume rm

watch-api: ## watch nodejs app logs
	docker logs -f ${NODE_APP_NAME}