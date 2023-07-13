import {
  API_HEADER_CONTENT_LANGUAGE,
  API_HEADER_ITEM_TOTAL,
  API_HEADER_PAGE_INDEX,
  API_HEADER_PAGE_SIZE,
  API_HEADER_PAGE_TOTAL,
} from './Constants';
import HawAPIOptions from './HawAPIOptions';
import { EndpointType, Endpoints } from './enums/EndpointType';
import { ResponseError } from './exceptions/ResponseError';
import { Filters, Pageable } from './filters';
import {
  APIInfoModel,
  ActorSocialModel,
  BaseModel,
  BaseTranslation,
  RequestResult,
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
   * @returns If connected. An {@link string} with 'Ping' value
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
    return this._fetch(`/${Endpoints[target]}`, filters, pageable);
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
    return this._fetch(`/${Endpoints[target]}/${uuid}`);
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
    return this._fetch(`/${Endpoints[target]}/random`);
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
    return this._fetch(`/${Endpoints[target]}/${uuid}/translations`);
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
    return this._fetch(`${Endpoints[target]}/${uuid}/translations/${language}`);
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
    return this._fetch(`/${Endpoints[target]}/${uuid}/translations/random`);
  }

  /**
   * Method that get all actor socials
   * @param uuid The actor uuid
   * @returns An new {@link RequestResult} with all actor socials
   */
  public async getAllSocials(
    uuid: string
  ): Promise<RequestResult<ActorSocialModel[]>> {
    return this._fetch(`/${Endpoints.actor}/${uuid}/socials`);
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
    return this._fetch(`/${Endpoints.actor}/${uuid}/socials/${social}`);
  }

  /**
   * Method that get a single random actor social
   * @param uuid The actor uuid
   * @returns An new {@link RequestResult} with random social
   */
  public async getRandomSocial(
    uuid: string
  ): Promise<RequestResult<ActorSocialModel>> {
    return this._fetch(`/${Endpoints.actor}/${uuid}/socials/random`);
  }

  /**
   * Method to fetch from HawAPI all resources
   * @param target
   * @param filters
   * @returns An new {@link RequestResult} with body and header information
   */
  private async _fetch<T>(
    target: string,
    filters?: Filters | null,
    pageable?: Pageable | null
  ): Promise<RequestResult<T>> {
    const url = this._getUrl(target, filters, pageable);

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

      return this._buildResult<T>(
        await response.json(),
        response.headers,
        response.status
      );
    } catch (err) {
      throw await this._handleError(response);
    }
  }

  /**
   * Method to handle any request error
   * @param err The request error response
   */
  private async _handleError(err: Response): Promise<ResponseError> {
    const isJson = err.headers.get('Content-Type') == 'application/json';

    if (isJson) return (await err.json()) as ResponseError;

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
   * @returns A complete url path with all params and filters
   */
  private _getUrl(
    target: string,
    filters?: Filters | null,
    pageable?: Pageable | null
  ) {
    let params = '?';

    // Get all filters names and values
    if (filters) {
      for (const key in filters) {
        params += `${key}=${filters[key]}&`;
      }
    }

    // Define the page, sort and order
    if (pageable) {
      if (pageable.page) params += `page=${pageable.page}&`;
      if (pageable.size) params += `size=${pageable.size}&`;

      // 'Order' can only be applied when 'sort' is defined
      if (pageable.sort) {
        if (pageable.order) {
          params += `sort=${pageable.sort},${pageable.order}&`;
        } else {
          params += `sort=${pageable.sort}&`;
        }
      }
    }

    params = params.slice(0, -1);
    return this.options.endpoint + `/${this.options.version}${target}${params}`;
  }

  /**
   * Method to build the client response
   * @param body The body response from API request
   * @param headers The response header
   * @param status The response status code
   * @returns An new {@link RequestResult} with all required information
   * @throws An error if page index ({@link API_HEADER_PAGE_INDEX}) is less then 0
   */
  private _buildResult<T>(
    body: T,
    headers: Headers,
    status: number
  ): RequestResult<T> {
    const page = headers.get(API_HEADER_PAGE_INDEX);
    const page_size = headers.get(API_HEADER_PAGE_SIZE);
    const page_total = headers.get(API_HEADER_PAGE_TOTAL);
    const item_total = headers.get(API_HEADER_ITEM_TOTAL);
    const language = headers.get(API_HEADER_CONTENT_LANGUAGE);

    return {
      page: page ? Number(page) : null,
      page_size: page_size ? Number(page_size) : null,
      page_total: page_total ? Number(page_total) : null,
      item_size: item_total ? Number(item_total) : null,
      next_page: page ? this._handlePage(Number(page), true) : null,
      prev_page: page ? this._handlePage(Number(page), false) : null,
      language: language || null,
      status: status,
      data: body,
    };
  }

  /**
   * Method to handle the next/prev page index
   * @param page The current page index
   * @param increase Determine if page index will be increase or decrease
   * @returns Updated page index
   * @throws An error if page index ({@link API_HEADER_PAGE_INDEX}) is less than 0
   */
  private _handlePage(page: number, increase: boolean): number {
    if (page < 0) throw new Error('Page index cannot be nagative');
    if (increase && page >= 0) return page + 1;
    if (!increase && page > 0) return page - 1;
    return page;
  }
}
