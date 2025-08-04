test:
	@echo Running tests...
	@npm run test

test-coverage:
	@echo Running tests with coverage...
	@npm run test:coverage

run:
	@echo Starting application with Docker...
	@docker-compose up -d --build
	@echo App is running...

docker-build:
	@echo Starting database only...
	@docker-compose up -d db

docker-down:
	@echo Stopping database...
	@docker-compose down

clean:
	@echo Stopping all containers and removing volumes...
	@docker-compose down -v --remove-orphans
	@docker system prune -f
	@echo Build cleanup completed!
