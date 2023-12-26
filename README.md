## Description

This NestJS demo app demonstrates how to send emails using message queues.

## Project setup

To install the NodeJS dependencies, run the following command:

```bash
$ yarn install
```

This project utilizes the [Bull](https://github.com/nestjs/bull) message bus, which requires a running Redis instance. The simplest way to set this up is by using Docker. The `package.json` file includes a script that runs a [Redis instance in Docker](https://hub.docker.com/_/redis). Use the following command to start it:

```bash
$ yarn run start:docker:create-run
```

To run the project, several environment variables need to be set. The easiest way to do this is by creating a copy of the `.env.template` file and renaming it to `.env`. This file contains the default values for the project.

For email sending, a free SMTP server is used. To view the received emails, visit the following website: https://www.wpoven.com/tools/free-smtp-server-for-testing. The default sender email is `noreply@prb.com`. Enter this address on the website to view the emails sent from it.

## Running the app

```bash
# development
$ yarn run start

# development + watch mode
$ yarn run start:dev

# development + watch + debug mode
$ yarn run start:debug

```

## Test

```bash
$ yarn run test
```

## License

This project is [MIT licensed](LICENSE).
