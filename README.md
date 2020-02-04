# data-worker

data-worker is a application for working with data from TMDb and putting it to database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Download Node.js not lower than version 8.10, [Yarn](https://yarnpkg.com/), [Docker](https://www.docker.com/) and [MongoDB Docker image](https://hub.docker.com/_/mongo).

### Clone

Clone this repo to your local machine using `https://github.com/IlonaMenkui/data-worker.git`

### Run database <a name="run-db"></a>

Run your docker image with MongoDB.
```
docker run --name some-mongo -d mongo:tag
```
... where ```some-mongo``` is the name you want to assign to your container and ```tag``` is the tag specifying the MongoDB version you want.

... or run the ```make``` utility in the project directory.
```
make run-mongo
```

### Declare environment variables in .env file

Create and add application configuration to .env file in the root of the project:

```
APP_PORT=3000
TMDB_API_KEY=YOURSECRETAPIKEY
DB_URI=mongodb://localhost:27017/super-enigma-db
TMDB_BASE_URL=https://api.themoviedb.org/3/
```

You should to register for an API key, click the [API link](https://www.themoviedb.org/settings/api) from within your account settings page.

## Installation

Use the package manager Yarn to install all the dependencies of data-worker.

```
yarn install
```

## Available Scripts

In the project directory, you can run:

```
yarn start
```

Runs the app.<br>

The app will reload if you make changes to the code.<br>

## Run Docker container with project and MongoDB
First, make sure that [MongoDB is running](#run-db).
Then you need to build a docker image.
```
make build-image
```

In the end, run the docker container with server.
```
docker run -P -d --rm --env TMDB_API_KEY=YOURSECRETAPIKEY --name service-name --link db-name:db image-uri:image-version
```
... where ```service-name``` is the server name, ```db-name``` is the database name and so on.

... or run the following command:

```
make run-service
```

## Stop Docker container with project and MongoDB
To stop the service use:
```
docker stop service-name
```
... or:
```
make stop-service
```
And to stop Docker container with MongoDB use:
```
docker stop some-mongo
```
... or:
```
make stop-mongo
```

## Build With
* [Node.js](https://nodejs.org) - is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [MongoDB](https://www.mongodb.com/) - is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

[MIT license](https://choosealicense.com/licenses/mit/)
