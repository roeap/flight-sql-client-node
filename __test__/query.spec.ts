import { tableFromIPC } from 'apache-arrow';
import anyTest, { TestFn } from 'ava';

import { ClientArgs, createFlightSqlClient } from '../index';

const test = anyTest as TestFn<{ options: ClientArgs }>;

test.beforeEach((t) => {
  const options: ClientArgs = {
    username: 'flight_username',
    password: 'testing123',
    tls: false,
    host: '127.0.0.1',
    port: 50051,
    headers: [],
  };
  t.context = { options };
});

test('create a client', async (t) => {
  const client = await createFlightSqlClient(t.context.options);
  t.truthy(client);
});

test('simple query returns data', async (t) => {
  const client = await createFlightSqlClient(t.context.options);
  const buffer = await client.query('SELECT * FROM delta.test.simple_table');
  const table = tableFromIPC(buffer);
  t.truthy(table.toString());
});
