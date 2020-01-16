SHELL = /bin/bash
WORKDIR := $(PWD)

IMAGE_URI = projects
MODULE_NAME = data-worker
SERVER_NAME = ilona-server
DB_PORT = 27017
DB_NAME = ilona-mongo
DB_URI = mongodb://$(DB_NAME):$(DB_PORT)/super-enigma-db
IMAGE_VERSION = develop
APP_PORT = 8080

build-server:
	@ echo "---> Building server Docker image ..."
	@ docker build -t $(IMAGE_URI)/$(MODULE_NAME):$(IMAGE_VERSION) $(WORKDIR)
.PHONY: image-build

run-mongodb:
	@ echo "---> Running Docker container with MongoDB ..."
	@ docker run --name $(DB_NAME) -p $(DB_PORT):$(DB_PORT) -d mongo
.PHONY: run-db

run-server:
	@ echo "---> Running Docker container with server ..."
	@ docker run -P --env APP_PORT=$(APP_PORT) --env DB_URI=$(DB_URI) --name $(SERVER_NAME) --link $(DB_NAME) $(IMAGE_URI)/$(MODULE_NAME)
.PHONY: run-server
