# Randemon API

This folder is the API folder of Randemon.

# Requirements

-   [Node.js](https://nodejs.org/en/) 14.16
-   [Docker](https://www.docker.com/)
-   [Docker-compose](https://docs.docker.com/compose/)

# Usage

Create a .env file based on the .sample, fill it with your own variables.

| Command              | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `docker-compose up`  | Run the dev server and Redis inside Docker (no reloading is needed)   |
| `npm start`          | Start the server without Docker                                       |
| `npm test`           | Run tests                                                             |
| `dev`                | Run with nodemon                                                      |
| `npm run t:i`        | Run integration tests (the `docker-compose` script above is required) |
| `npm run lint`       | Check linting with ESlint                                             |
| `npm run lint:fix`   | Fix linting                                                           |
| `npm run format:fix` | Format code with Prettier                                             |
