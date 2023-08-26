import { buildResult } from '../../src/Utils';
import { InMemoryCacheManager } from '../../src/cache/index';

test('it should create the cache manager', async () => {
  const manager = new InMemoryCacheManager(true);

  expect(manager).toBeDefined();
  expect(manager).toBeInstanceOf(InMemoryCacheManager);
});

describe('Tests for Utils#handlePagination', () => {
  const manager = new InMemoryCacheManager(true);
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Language': 'en-US',
    'X-Pagination-Page-Index': '1',
    'X-Pagination-Page-Size': '10',
    'X-Pagination-Page-Total': '2',
    'X-Pagination-Item-Total': '13',
  });
  const body = [
    {
      first_name: 'Lorem',
      last_name: 'Ipsum',
      gender: 1,
      nationality: 'American',
    },
  ];

  const data = buildResult(body, headers, 200);

  test('it should save new cache data', async () => {
    manager.set('1', data);

    expect(await manager.size()).toBe(1);
    expect(await manager.get('1')).toEqual(data);
  });

  test('it should clear all cache data', async () => {
    manager.set('1', data);
    manager.set('2', data);

    manager.clear();

    expect(await manager.size()).toBe(0);
  });

  test('it should get all cache keys', async () => {
    manager.set('1', data);

    const keys = Array.from(await manager.keys());
    expect(keys).toHaveLength(1);
    expect(keys[0]).toBe('1');
  });

  test('it should get single cache value', async () => {
    manager.set('1', data);

    expect(await manager.get('1')).not.toBeNull();
  });

  test('it should remove single cache using its key', async () => {
    manager.set('1', data);

    expect(await manager.remove('1')).toBe(true);
    expect(await manager.get('1')).toBeUndefined();
  });

  test('it should remove single cache using its key', async () => {
    manager.set('1', data);
    manager.set('2', data);

    expect(await manager.removeAllIn(['1', '2'])).toBe(2);
    expect(await manager.size()).toBe(0);
  });
});
