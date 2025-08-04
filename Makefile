test:
	@echo Running tests...
	@npm run test

test-coverage:
	@echo Running tests with coverage...
	@npm run test:coverage

run:
	@docker-compose up -d --build
	@echo app is running...

docker-build:
	@docker-compose up -d db
