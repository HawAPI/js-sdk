import { createClient, HawAPIClient, HawAPIOptions } from '../src/index';

test('it should create the client', async () => {
  const client = createClient();

  expect(client).toBeDefined();
  expect(client).toBeInstanceOf(HawAPIClient);
});

test('it use default client options', async () => {
  const client = createClient();
  const options: HawAPIOptions = await client.getOptions();

  expect(options.endpoint).toBe('https://hawapi.theproject.id/api');
  expect(options.version).toBe('v1');
  expect(options.language).toBe(undefined);
  expect(options.size).toBe(undefined);
  expect(options.timeout).toBe(10000);
  expect(options.token).toBe('');
  expect(options.inMemoryCache).toBe(true);
});

test('it should overwrite default options', async () => {
  const myOptions: HawAPIOptions = {
    endpoint: 'https://hawapi.lucasjosino.com',
    version: 'v2',
    language: 'pt-BR',
    timeout: 20000,
    token: 'MYTOKEN',
    inMemoryCache: false,
  };
  const client = createClient(myOptions);
  const options: HawAPIOptions = await client.getOptions();

  expect(options.endpoint).toBe('https://hawapi.lucasjosino.com');
  expect(options.version).toBe('v2');
  expect(options.language).toBe('pt-BR');
  expect(options.timeout).toBe(20000);
  expect(options.token).toBe(''); // Cannot expose token
  expect(options.inMemoryCache).toBe(false);
});
