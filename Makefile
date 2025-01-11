up-dev:
	docker-compose -f docker-compose.dev.yml up -d && docker-compose -f docker-compose.dev.yml exec dev sh

down-dev:
	docker-compose -f docker-compose.dev.yml down

up-prod:
	docker-compose -f docker-compose.prod.yml up

down-prod:
	docker-compose -f docker-compose.prod.yml down
