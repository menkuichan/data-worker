SHELL = /bin/bash
WORKDIR := $(PWD)

IMAGE_URI = ilonaMenkui/data-worker
SERVER_NAME = ilona-server
DB_PORT = 27017
DB_NAME = ilona-mongo
IMAGE_VERSION = develop

build-image:
	@ echo "---> Building server Docker image ..."
	@ docker build -t $(IMAGE_URI):$(IMAGE_VERSION) $(WORKDIR)
.PHONY: build-image

run-mongo:
	@ echo "---> Running Docker container with MongoDB ..."
	@ docker run --name $(DB_NAME) -p $(DB_PORT):$(DB_PORT) -d mongo
.PHONY: run-mongo

run-service:
	@ echo "---> Running data-worker Docker container ..."
	@ docker run -P --name $(SERVER_NAME) --link $(DB_NAME) $(IMAGE_URI)
.PHONY: run-service
