test:
	@echo Running tests...
	@npm run test

run:
	@docker-compose up --build

docker-build:
	@docker-compose up -d db
