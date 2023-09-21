# `@lakehouse-rs/flight-sql-client`

![https://github.com/napi-rs/package-template/actions](https://github.com/roeap/flight-sql-client-node/workflows/CI/badge.svg)
[![npm version](https://img.shields.io/npm/v/@lakehouse-rs/flight-sql-client.svg)](https://www.npmjs.com/package/@lakehouse-rs/flight-sql-client)

A client library for interacting with [Arrow Flight SQL] enabled databases from Node.js.

## Usage

Install library

```sh
yarn add @lakehouse-rs/flight-sql-client
# or
npm install @lakehouse-rs/flight-sql-client
# or
pnpm add @lakehouse-rs/flight-sql-client
```

Create a new client instance

```ts
import { ClientOptions, ArrowFlightClient } from '@lakehouse-rs/flight-sql-client';

const options: ClientOptions = {
  username: 'flight_username',
  password: 'testing123',
  tls: false,
  host: '127.0.0.1',
  port: 50051,
  headers: [],
};

const client = await ArrowFlightClient.fromOptions(options);
```

Execute a query against the service

```ts
const table = await client.query('SELECT * FROM my_tyble');
```

Or inspect some server metadata

```ts
const tablesTable = await client.getTables({ includeSchema: true });
```

## Development

Requirements:

- Rust
- node.js >= 12
- Yarn

Install dependencies via

```sh
yarn install
```

Build native module

```sh
yarn build
```

Run tests

```sh
yarn test
```

## Release

Releases are automated via github actions.

To create a release, first increment the version.

```sh
yarn version <patch | minor | major | ...>
```

this will bump all version fields, and create a new commit with the version number.

Then trigger the release.

```sh
git push --follow-tags
```

[Arrow Flight SQL]: https://arrow.apache.org/docs/format/FlightSql.html
