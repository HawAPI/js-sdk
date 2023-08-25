import { API_DEFAULT_LANG, API_URL, API_VERSION } from './Constants';

/**
 * The HawAPI options configuration.
 */
class HawAPIOptions {
  /**
   * The endpoint of the HawAPI instance
   *
   * @default 'https://hawapi.theproject.id/api'
   */
  endpoint: string = API_URL;

  /**
   * The version of the API
   *
   * @default 'v1'
   */
  version: string = API_VERSION;

  /**
   * The language of items in request
   *
   * **Note: This value can be overwritten later**
   *
   * @default 'en-US'
   */
  language: string;

  /**
   * The timeout of a response in milliseconds
   *
   * @default 10 * 1000 // (10 seconds)
   */
  timeout: number;

  /**
   * The HawAPI token (JWT) \
   * By default, all requests are made with **'ANONYMOUS'** tier with limit of **8 req/60s**
   *
   * See more {@link https://hawapi.theproject.id/docs/guides/rate-limiting}
   */
  token?: string;

  /**
   * Define if the package should save (in-memory) all request results
   *
   * @default true
   */
  inMemoryCache: boolean;

  constructor(config: Partial<HawAPIOptions> = {}) {
    this.endpoint = API_URL;
    this.version = API_VERSION;
    this.language = API_DEFAULT_LANG;
    this.timeout = 10 * 1000;
    this.inMemoryCache = true;

    if (config.endpoint) this.endpoint = config.endpoint;

    if (config.version) this.version = config.version;

    if (config.language) this.language = config.language;

    if (config.timeout) this.timeout = config.timeout;

    if (config.token) this.token = config.token;

    if (config.inMemoryCache !== null && config.inMemoryCache !== undefined) {
      this.inMemoryCache = config.inMemoryCache;
    }
  }
}

export default HawAPIOptions;
