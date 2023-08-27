import { buildResult, buildUrl, handlePagination } from '../src/Utils';

describe('Tests for Utils#buildResult', () => {
  test('it should return correct request result for multiple results)', async () => {
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

    const res = buildResult(body, headers, 200);

    expect(res.page).toBe(1);
    expect(res.page_size).toBe(10);
    expect(res.page_size).not.toBe('10');
    expect(res.page_total).toBe(2);
    expect(res.page_total).not.toBe('2');
    expect(res.item_size).toBe(13);
    expect(res.item_size).not.toBe('13');
    expect(res.next_page).toBe(2);
    expect(res.next_page).not.toBe('2');
    expect(res.prev_page).toBeNull();
    expect(res.language).toBe('en-US');
    expect(res.status).toBe(200);
    expect(res.data).toHaveLength(1);
  });

  test('it should return correct request result for single result)', async () => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Content-Language': 'en-US',
    });
    const body = {
      first_name: 'Lorem',
      last_name: 'Ipsum',
      gender: 1,
      nationality: 'American',
    };

    const res = buildResult(body, headers, 200);
    expect(res.page).toBeNull();
    expect(res.page_size).toBeNull();
    expect(res.page_total).toBeNull();
    expect(res.item_size).toBeNull();
    expect(res.next_page).toBeNull();
    expect(res.prev_page).toBeNull();
    expect(res.language).toBe('en-US');
    expect(res.status).toBe(200);
    expect(res.data).not.toBeNull();
  });
});

describe('Tests for Utils#handlePagination', () => {
  test('it should return null page index with value 0 (decrease)', async () => {
    const page = handlePagination(0, false);

    expect(page).toBe(null);
  });

  test('it should return null page index with value 0 (increase)', async () => {
    const page = handlePagination(0, false);

    expect(page).toBe(null);
  });

  test('it should return null page index with value -1 (decrease)', async () => {
    const page = handlePagination(-1, false);

    expect(page).toBe(null);
  });

  test('it should return 1 page index with value 2 (decrease)', async () => {
    const page = handlePagination(2, false);

    expect(page).toBe(1);
  });

  test('it should return null page index with value 1 (decrease)', async () => {
    const page = handlePagination(1, false);

    expect(page).toBe(null);
  });

  test('it should return 2 page index with value 1 (increase)', async () => {
    const page = handlePagination(1, true);

    expect(page).toBe(2);
  });
});

describe('Tests for Utils#buildUrl', () => {
  const URL = 'https://hawapi.theproject.id/api';
  const options = {
    endpoint: 'https://hawapi.theproject.id/api',
    version: 'v1',
    language: 'en-US',
    timeout: 10000,
    inMemoryCache: true,
  };

  test('it should create correct url without params', async () => {
    const url = buildUrl('/actors', options, null, null);

    expect(url).toBe(`${URL}/v1/actors`);
  });

  test('it should create correct url with params', async () => {
    const url = buildUrl(
      '/actors',
      options,
      { language: 'pt-BR', first_name: 'Lorem' },
      null
    );

    expect(url).toBe(`${URL}/v1/actors?language=pt-BR&first_name=Lorem`);
  });

  test('it should create correct url with pageable', async () => {
    const url = buildUrl('/actors', options, null, {
      page: 1,
      size: 4,
    });

    expect(url).toBe(`${URL}/v1/actors?page=1&size=4`);
  });

  test('it should create correct url with sort and order', async () => {
    const url = buildUrl('/actors', options, null, {
      sort: 'gender',
      order: 'asc',
    });

    expect(url).toBe(`${URL}/v1/actors?sort=gender,asc`);
  });

  test('it should create correct url with params, pageable, sort and order', async () => {
    const url = buildUrl(
      '/actors',
      options,
      { language: 'pt-BR', first_name: 'Lorem' },
      { page: 1, size: 4, sort: 'gender', order: 'asc' }
    );

    expect(url).toBe(
      `${URL}/v1/actors?language=pt-BR&first_name=Lorem&page=1&size=4&sort=gender,asc`
    );
  });

  test('it should create correct url with sort without order', async () => {
    const url = buildUrl('/actors', options, null, {
      sort: 'gender',
    });

    expect(url).toBe(`${URL}/v1/actors?sort=gender`);
    expect(url).not.toBe(`${URL}/v1/actors?sort=gender,asc`);
  });

  test('it should create clean url when order is defined without sort', async () => {
    const url = buildUrl('/actors', options, null, {
      order: 'asc',
    });

    expect(url).not.toBe(`${URL}/v1/actors?order=asc`);
    expect(url).toBe(`${URL}/v1/actors`);
  });
});
