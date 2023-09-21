import anyTest, { TestFn } from 'ava';

import { ClientOptions, ArrowFlightClient } from '../index';

const test = anyTest as TestFn<{ options: ClientOptions; client: ArrowFlightClient }>;

test.beforeEach(async (t) => {
  const options: ClientOptions = {
    username: 'flight_username',
    password: 'testing123',
    tls: false,
    host: '127.0.0.1',
    port: 50051,
    headers: [],
  };
  const client = await ArrowFlightClient.fromOptions(options);
  t.context = { options, client };
});

test('simple query returns data', async (t) => {
  const table = await t.context.client.query('SELECT * FROM delta.test.simple_table');
  t.truthy(table.toString());
});

test('get catalogs returns data', async (t) => {
  const table = await t.context.client.getCatalogs();
  t.truthy(table.toString().includes('catalog_name'));
});

test('get schemas returns data', async (t) => {
  const table = await t.context.client.getDbSchemas({});
  t.truthy(table.toString().includes('db_schema_name'));
});

test('get tables returns data', async (t) => {
  const table = await t.context.client.getTables({});
  t.assert(table.toString().includes('table_name'));
  t.assert(!table.toString().includes('table_schema'));
});

test('get tables with schema returns data', async (t) => {
  const table = await t.context.client.getTables({ includeSchema: true });
  t.assert(table.toString().includes('table_schema'));
});
