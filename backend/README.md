
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build & CLI
To use the CLI, build the app:
```bash
# build
$ npm run build

# exec the built cli
$ node dist/src/main.cli.js give-me-the-odds resources/millenium-falcon.js ../examples/example3/empire.json
90
```

## Swagger
Access the swagger-ui at ```http://localhost:3000/api``` after starting the server