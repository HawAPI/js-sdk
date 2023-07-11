import HawAPIOptions from './HawAPIOptions';
import { EndpointType, Endpoints } from './enums/EndpointType';
import { RequestError } from './exceptions/RequestError';
import { Filters, Pageable } from './filters';
import {
  APIInfoModel,
  ActorSocialModel,
  BaseModel,
  BaseTranslation,
} from './models';

/**
 * The HawAPI client.
 */
export default class HawAPIClient {
  options: HawAPIOptions;
  headers: HeadersInit;
  request: RequestInit;

  constructor(options?: HawAPIOptions) {
    this.options = new HawAPIOptions(options);
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
  }

  /**
   * Method to test API connection
   * @returns 'Ping' if connection is open
   */
  public async ping(): Promise<string> {
    return fetch(this.options.endpoint + '/ping', this.request)
      .then((response) => response.text())
      .catch((err) => {
        throw err.json();
      });
  }

  /**
   * Method to get all API informations
   * @returns
   */
  public async info(): Promise<APIInfoModel> {
    return fetch(`${this.options.endpoint}`, this.request)
      .then((response) => response.json())
      .catch((err) => {
        throw err.json();
      });
  }

  /**
   *
   * @param target
   * @param filters
   * @param pageable
   * @returns
   */
  public async getAll<T extends BaseModel>(
    target: EndpointType,
    filters?: Filters | null,
    pageable?: Pageable | null
  ): Promise<T[]> {
    return this._fetch(Endpoints[target], filters, pageable);
  }

  /**
   *
   * @param target
   * @param uuid
   * @returns
   */
  public async getBy<T extends BaseModel>(
    target: EndpointType,
    uuid: string
  ): Promise<T> {
    return this._fetch(`/${Endpoints[target]}/${uuid}`);
  }

  /**
   *
   * @param target
   * @param uuid
   * @returns
   */
  public async getRandom<T extends BaseModel>(
    target: EndpointType
  ): Promise<T> {
    return this._fetch(`/${Endpoints[target]}/random`);
  }

  /**
   *
   * @param target
   * @param uuid
   * @returns
   */
  public async getAllTranslations<T extends BaseTranslation>(
    target: EndpointType,
    uuid: string
  ): Promise<T[]> {
    return this._fetch(`/${Endpoints[target]}/${uuid}/translations`);
  }

  /**
   *
   * @param target
   * @param uuid
   * @param language
   * @returns
   */
  public async getTranslationBy<T extends BaseTranslation>(
    target: EndpointType,
    uuid: string,
    language: string
  ): Promise<T> {
    return this._fetch(`${Endpoints[target]}/${uuid}/translations/${language}`);
  }

  /**
   *
   * @param target
   * @param uuid
   * @returns
   */
  public async getRandomTranslation<T extends BaseModel>(
    target: EndpointType,
    uuid: string
  ): Promise<T> {
    return this._fetch(`/${Endpoints[target]}/${uuid}/translations/random`);
  }

  /**
   *
   * @param uuid
   * @returns
   */
  public async getAllSocials(uuid: string): Promise<ActorSocialModel[]> {
    return this._fetch(`/${Endpoints.actor}/${uuid}/socials`);
  }

  /**
   *
   * @param uuid
   * @param social
   * @returns
   */
  public async getSocialBy(
    uuid: string,
    social: string
  ): Promise<ActorSocialModel> {
    return this._fetch(`/${Endpoints.actor}/${uuid}/socials/${social}`);
  }

  /**
   *
   * @param target
   * @param uuid
   * @returns
   */
  public async getRandomSocial(uuid: string): Promise<ActorSocialModel> {
    return this._fetch(`/${Endpoints.actor}/${uuid}/socials/random`);
  }

  /**
   * Method to fetch from HawAPI all resources
   * @param target
   * @param filters
   * @returns
   */
  private async _fetch(
    target: string,
    filters?: Filters | null,
    pageable?: Pageable | null
  ) {
    const url = this._getUrl(target, filters, pageable);
    const response = await fetch(url, this.request);
    try {
      return await response.json();
    } catch (err) {
      return await this._handleError(response);
    }
  }

  /**
   * Method to handle any request error
   * @param err The request error response
   */
  private async _handleError(err: Response) {
    const isJson = err.headers.get('Content-Type') == 'application/json';

    if (isJson) throw (await err.json()) as RequestError;

    throw new Error(await err.text());
  }

  /**
   * Method to create the url using API:
   * - Url
   * - Version
   * - Target
   * - Params
   *   - Filters
   *   - Pageable
   *
   * @param target
   * @param filters
   * @param pageable
   * @returns
   */
  private _getUrl(
    target: string,
    filters?: Filters | null,
    pageable?: Pageable | null
  ) {
    let params = '';

    // Get all filters names and values
    if (filters) {
      params = '?';

      for (const key in filters) {
        params += `${key}=${filters[key]}&`;
      }

      params = params.slice(0, -1);
    }

    // Define the page, sort and order
    if (pageable) {
      params += '?';

      params = params.slice(0, -1);
    }

    return (
      this.options.endpoint + `/${this.options.version}/${target}${params}`
    );
  }
}
