import { ActorModel, HawAPIOptions } from '../../src';
import { InMemoryCacheManager } from '../../src/cache';
import { Service } from '../../src/service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
const options: HawAPIOptions = new HawAPIOptions();
const cache: InMemoryCacheManager = new InMemoryCacheManager(true);
const service = new Service(options, cache, {
  headers: headers,
  method: 'GET',
});

test('it should create the service', async () => {
  expect(service).toBeDefined();
  expect(service).toBeInstanceOf(Service);
});

describe('Tests for Service with multiple items', () => {
  const headers = {
    'Content-Type': 'application/json',
    'Content-Language': 'en-US',
    'X-Pagination-Page-Index': '1',
    'X-Pagination-Page-Size': '1',
    'X-Pagination-Page-Total': '1',
    'X-Pagination-Item-Total': '1',
  };
  const data = [
    {
      uuid: '69b64913-7429-5bf9-a98c-0068d5718e6a',
      first_name: 'Lorem',
      last_name: 'Ipsum',
      gender: 1,
      nationality: 'American',
    },
  ];

  beforeEach(() => {
    setupFetchWith(headers, data);
  });

  test('it should fetch all actors', async () => {
    const res = await service.fetch<ActorModel[]>('/actors', null, null);

    expect(res.data).not.toBeNull();
    expect(res.data?.length).toBe(1);
  });

  test('it should return actors from cache', async () => {
    const res = await service.fetch<ActorModel[]>('/actors', null, null);

    expect(res.cached).toBe(true);
    expect(res.data).not.toBeNull();
    expect(res.data?.length).toBe(1);
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe('Tests for Service with single item', () => {
  const headers = {
    'Content-Type': 'application/json',
    'Content-Language': 'pt-BR',
  };
  const data = {
    uuid: '69b64913-7429-5bf9-a98c-0068d5718e6a',
    first_name: 'Lorem',
    last_name: 'Ipsum',
    gender: 1,
    nationality: 'American',
  };

  beforeEach(() => {
    setupFetchWith(headers, data);
  });

  test('it should fetch single actor', async () => {
    const res = await service.fetch<ActorModel>(
      '/actors/69b64913-7429-5bf9-a98c-0068d5718e6a',
      null,
      null
    );

    expect(res.data).not.toBeNull();
    expect(res.data?.uuid).toBe('69b64913-7429-5bf9-a98c-0068d5718e6a');
    expect(res.data?.first_name).toBe('Lorem');
    expect(res.data?.last_name).toBe('Ipsum');
    expect(res.data?.gender).toBe(1);
    expect(res.data?.nationality).toBe('American');
  });

  test('it should fetch single actor from cache', async () => {
    const res = await service.fetch<ActorModel>(
      '/actors/69b64913-7429-5bf9-a98c-0068d5718e6a',
      null,
      null
    );

    expect(res.data).not.toBeNull();
    expect(res.data?.uuid).toBe('69b64913-7429-5bf9-a98c-0068d5718e6a');
    expect(res.data?.first_name).toBe('Lorem');
    expect(res.data?.last_name).toBe('Ipsum');
    expect(res.data?.gender).toBe(1);
    expect(res.data?.nationality).toBe('American');
  });
});

function setupFetchWith(
  headers: HeadersInit,
  json: unknown,
  status?: number,
  isOk?: boolean
) {
  jest.restoreAllMocks();
  jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() =>
      Promise.resolve({
        ok: isOk ?? true,
        status: status ?? 200,
        headers: new Headers(headers),
        json: () => Promise.resolve(json),
      })
    ) as jest.Mock
  );
}
