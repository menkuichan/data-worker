# data-worker

data-worker is a application for working with data from TMDb and putting it to database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Download Node.js not lower than version 8.10, [Yarn](https://yarnpkg.com/) , [Docker](https://www.docker.com/) and [MongoDB Docker image](https://hub.docker.com/_/mongo).

### Clone

Clone this repo to your local machine using `https://github.com/IlonaMenkui/data-worker.git`

### Running database

Run your docker image with MongoDb.
```
docker run --name some-mongo -d mongo:tag
```
... where ```some-mongo``` is the name you want to assign to your container and ```tag``` is the tag specifying the MongoDB version you want.

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


## Build With
* [Node.js](https://nodejs.org) - is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [MongoDB](https://www.mongodb.com/) - is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

[MIT license](https://choosealicense.com/licenses/mit/)

