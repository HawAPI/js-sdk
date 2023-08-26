import HawAPIOptions from '../HawAPIOptions';
import { buildResult, buildUrl } from '../Utils';
import { InMemoryCacheManager } from '../cache';
import { Filters, Pageable } from '../filters';
import { RequestResult } from '../models';

export class Service {
  options: HawAPIOptions;
  cache: InMemoryCacheManager;
  request: RequestInit;

  constructor(
    options: HawAPIOptions,
    cache: InMemoryCacheManager,
    request: RequestInit
  ) {
    this.options = options;
    this.cache = cache;
    this.request = request;
  }

  /**
   * Method to fetch from HawAPI all resources
   * @param baseUrl The base fetch url (e.g: target and uuid)
   * @param filters The map containing all request filters
   * @param filters The map containing all pageable filters (page, size, sort and order)
   * @returns An new {@link RequestResult} with body and header information
   */
  async fetch<T>(
    baseUrl: string,
    filters?: Filters | null,
    pageable?: Pageable | null
  ): Promise<RequestResult<T>> {
    const url = buildUrl(baseUrl, this.options, filters, pageable);

    const cache = await this.cache.get<T>(url);
    if (cache !== undefined) return { ...cache, cached: true };

    // Setup timeout
    let timeout;
    const controller = new AbortController();
    if (this.options.timeout) {
      timeout = setTimeout(() => controller.abort(), this.options.timeout);
    }

    const response = await fetch(url, {
      ...this.request,
      signal: controller.signal,
    });

    clearTimeout(timeout);
    try {
      // Handle any possible not 2XX code
      if (!response.ok) throw new Error('Code is not OK (200)');

      const result = buildResult<T>(
        await response.json(),
        response.headers,
        response.status
      );

      await this.cache.set(url, result);

      return { ...result, cached: true };
    } catch (err) {
      const isJson = response.headers.get('Content-Type') == 'application/json';

      let error = `${err}`;
      if (isJson) error = await response.json();

      throw error;
    }
  }
}
