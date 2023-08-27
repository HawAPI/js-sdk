import HawAPIOptions from './HawAPIOptions';
import { isValidTargetOrThrow } from './Utils';
import { InMemoryCacheManager } from './cache';
import { EndpointType, Endpoints } from './enums/EndpointType';
import { Filters, Pageable } from './filters';
import {
  APIInfoModel,
  ActorSocialModel,
  BaseModel,
  BaseTranslation,
  RequestResult,
} from './models';
import { Service } from './service';

/**
 * The [HawAPI](https://github.com/HawAPI/HawAPI) js/ts client.
 *
 * - [TypeDoc](https://hawapi.github.io/js-sdk/v1/)
 * - [Github](https://github.com/HawAPI/js-sdk/)
 * - [Examples (Github)](https://github.com/HawAPI/js-sdk/examples/)
 */
export default class HawAPIClient {
  options: HawAPIOptions;
  cache: InMemoryCacheManager;
  headers: HeadersInit;
  request: RequestInit;
  service: Service;

  constructor(options?: Partial<HawAPIOptions>) {
    this.options = new HawAPIOptions(options);
    this.cache = new InMemoryCacheManager(this.options.inMemoryCache!);
    this.headers = new Headers();
    this.request = {
      method: 'GET',
    };

    // By default, all requests are made with 'ANONYMOUS' tier
    if (options?.token) {
      this.headers.set('Authorization', `Bearer ${options.token}`);
    }

    this.headers.set('Content-Type', 'application/json');
    this.request.headers = this.headers;

    this.service = new Service(this.options, this.cache, this.request);
  }

  /**
   * Method to test API connection
   * @returns If connected. An {@link string} with 'Ping' value
   */
  public async ping(): Promise<string> {
    return fetch(this.options.endpoint + '/ping', this.request)
      .then((response) => response.text())
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Method to get all API informations
   * @returns An new {@link APIInfoModel}
   */
  public async getInfo(): Promise<APIInfoModel> {
    return fetch(`${this.options.endpoint}`, this.request)
      .then((response) => response.json())
      .catch((err) => {
        throw err.json();
      });
  }

  /**
   * Method to get all client options
   * @returns
   */
  public async getOptions(): Promise<HawAPIOptions> {
    return {
      ...this.options,
      token: '',
    };
  }

  /**
   * Method to clear all cached data
   * @returns The count of all cleaned data
   */
  public async clearCache(): Promise<number> {
    return this.cache.clear();
  }

  /**
   * Method to get all keys of cached data
   * @returns All cached keys
   */
  async cacheKeys(): Promise<IterableIterator<string>> {
    return this.cache.keys();
  }

  /**
   * Method to get the size of cached data
   * @returns The count of all cached data
   */
  async cacheSize(): Promise<number> {
    return this.cache.size();
  }

  /**
   * Method to remove specific cache data
   * @param key The cache key
   * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
   */
  async removeCache(key: string): Promise<boolean> {
    return this.cache.remove(key);
  }

  /**
   * Method that get the API overview
   * @param target The target name
   * @param language The result language
   * @returns An new {@link RequestResult} with overview
   */
  public async getOverview<OverviewModel>(
    language: string
  ): Promise<RequestResult<OverviewModel>> {
    return this.service.fetch(`/overview`, { language }, null);
  }

  /**
   * Method that get all items
   * @param target The target name
   * @param filters
   * @param pageable
   * @returns An new {@link RequestResult} with all target items
   */
  public async getAll<T extends BaseModel>(
    target: EndpointType,
    filters?: Filters | null,
    pageable?: Pageable | null
  ): Promise<RequestResult<T[]>> {
    isValidTargetOrThrow(target);
    return this.service.fetch(`/${Endpoints[target]}`, filters, pageable);
  }

  /**
   * Method that get a single item
   * @param target The target name
   * @param uuid The target uuid
   * @returns An new {@link RequestResult} with specific target item
   */
  public async getBy<T extends BaseModel>(
    target: EndpointType,
    uuid: string
  ): Promise<RequestResult<T>> {
    isValidTargetOrThrow(target);
    return this.service.fetch(`/${Endpoints[target]}/${uuid}`);
  }

  /**
   * Method that get a single random item
   * @param target The target name
   * @param uuid The target uuid
   * @returns An new {@link RequestResult} with random target item
   */
  public async getRandom<T extends BaseModel>(
    target: EndpointType
  ): Promise<RequestResult<T>> {
    isValidTargetOrThrow(target);
    return this.service.fetch(`/${Endpoints[target]}/random`);
  }

  /**
   * Method that get all item translations
   * @param target The target name
   * @param uuid The target uuid
   * @returns An new {@link RequestResult} with all target item translations
   */
  public async getAllTranslations<T extends BaseTranslation>(
    target: EndpointType,
    uuid: string
  ): Promise<RequestResult<T[]>> {
    isValidTargetOrThrow(target);
    return this.service.fetch(`/${Endpoints[target]}/${uuid}/translations`);
  }

  /**
   * Method that get a single item
   * @param target The target name
   * @param uuid The target uuid
   * @param language The target translation language
   * @returns An new {@link RequestResult} with specific target item translation
   */
  public async getTranslationBy<T extends BaseTranslation>(
    target: EndpointType,
    uuid: string,
    language: string
  ): Promise<RequestResult<T>> {
    isValidTargetOrThrow(target);
    return this.service.fetch(
      `${Endpoints[target]}/${uuid}/translations/${language}`
    );
  }

  /**
   * Method that get a single random item translation
   * @param target The target name
   * @param uuid The target uuid
   * @returns An new {@link RequestResult} with random target item translation
   */
  public async getRandomTranslation<T extends BaseModel>(
    target: EndpointType,
    uuid: string
  ): Promise<RequestResult<T>> {
    isValidTargetOrThrow(target);
    return this.service.fetch(
      `/${Endpoints[target]}/${uuid}/translations/random`
    );
  }

  /**
   * Method that get all actor socials
   * @param uuid The actor uuid
   * @returns An new {@link RequestResult} with all actor socials
   */
  public async getAllSocials(
    uuid: string
  ): Promise<RequestResult<ActorSocialModel[]>> {
    return this.service.fetch(`/${Endpoints.actors}/${uuid}/socials`);
  }

  /**
   * Method that get a single actor social
   * @param uuid The actor uuid
   * @param social The social name
   * @returns An new {@link RequestResult} with an specific actor social
   */
  public async getSocialBy(
    uuid: string,
    social: string
  ): Promise<RequestResult<ActorSocialModel>> {
    return this.service.fetch(`/${Endpoints.actors}/${uuid}/socials/${social}`);
  }

  /**
   * Method that get a single random actor social
   * @param uuid The actor uuid
   * @returns An new {@link RequestResult} with random social
   */
  public async getRandomSocial(
    uuid: string
  ): Promise<RequestResult<ActorSocialModel>> {
    return this.service.fetch(`/${Endpoints.actors}/${uuid}/socials/random`);
  }
}
