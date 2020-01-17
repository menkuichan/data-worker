SHELL = /bin/bash
WORKDIR := $(PWD)
IMAGE_URI = ilonamenkui/data-worker
SERVICE_NAME = data-worker
DB_PORT = 27017
DB_NAME = mongodb
IMAGE_VERSION = develop

build-image:
	@ echo "---> Building server Docker image ..."
	@ docker build -t $(IMAGE_URI):$(IMAGE_VERSION) $(WORKDIR)
.PHONY: build-image

run-mongo:
	@ echo "---> Running Docker container with MongoDB ..."
	@ docker run --name $(DB_NAME) --rm -p $(DB_PORT):$(DB_PORT) -d mongo
.PHONY: run-mongo

stop-mongo:
	@ echo "---> Stopping Docker container with MongoDB ..."
	@ docker stop $(DB_NAME)
.PHONY: run-mongo

run-service:
	@ echo "---> Running data-worker Docker container ..."
	@ docker run -P -d --rm --env TMDB_API_KEY=$(TMDB_API_KEY) --name $(SERVICE_NAME) --link $(DB_NAME):db $(IMAGE_URI):$(IMAGE_VERSION)
.PHONY: run-service

stop-service:
	@ echo "---> Stopping service Docker container ..."
	@ docker stop $(SERVICE_NAME)
.PHONY: stop-service
