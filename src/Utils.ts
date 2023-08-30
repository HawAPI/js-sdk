import {
  API_HEADER_CONTENT_LANGUAGE,
  API_HEADER_ITEM_TOTAL,
  API_HEADER_PAGE_INDEX,
  API_HEADER_PAGE_SIZE,
  API_HEADER_PAGE_TOTAL,
} from './Constants';
import HawAPIOptions from './HawAPIOptions';
import { EndpointType, Endpoints } from './enums';
import { Filters, Pageable } from './filters';
import { RequestResult } from './models';

/**
 * Method to validate target
 * @param target The target name
 * @returns true if is a valid target or throw a error
 */
export function isValidTargetOrThrow(target: EndpointType): boolean {
  if (Endpoints[target]) return true;
  throw new Error(`Invalid target: ${target}`);
}

/**
 * Method to build the client response
 * @param body The body response from API request
 * @param headers The response header
 * @param status The response status code
 * @returns An new {@link RequestResult} with all required information
 * @throws An error if page index ({@link API_HEADER_PAGE_INDEX}) is less then 0
 */
export function buildResult<T>(
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
    page: Number(page) || null,
    page_size: Number(page_size) || null,
    page_total: Number(page_total) || null,
    item_size: Number(item_total) || null,
    next_page: handlePagination(Number(page), true) || null,
    prev_page: handlePagination(Number(page), false) || null,
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
export function handlePagination(
  page: number,
  increase: boolean
): number | null {
  if (page == null || page <= 0) return null;
  if (increase) page = page + 1;
  else page = page - 1;
  return page == 0 ? null : page;
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
export function buildUrl(
  target: string,
  options: HawAPIOptions,
  filters?: Filters | null,
  pageable?: Pageable | null
) {
  let params: string[] = [];

  if (options.language) params.push(`language=${options.language}`);
  if (options.size) params.push(`size=${options.size}`);

  // Get all filters names and values
  if (filters) {
    for (const key in filters) {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        params = pushOrOverwrite(params, key, value);
      }
    }
  }

  // Define the page, sort and order
  if (pageable) {
    if (pageable.page) params = pushOrOverwrite(params, 'page', pageable.page);
    if (pageable.size) params = pushOrOverwrite(params, 'size', pageable.size);

    // 'Order' can only be applied when 'sort' is defined
    if (pageable.sort) {
      if (pageable.order) {
        params = pushOrOverwrite(
          params,
          'sort',
          `${pageable.sort},${pageable.order}`
        );
      } else {
        params = pushOrOverwrite(params, 'sort', pageable.sort);
      }
    }
  }

  const stringOfParams = params.length !== 0 ? '?' + params.join('&') : '';
  return options.endpoint + `/${options.version}${target}${stringOfParams}`;
}

/**
 * Method to push new key/value or overwrite existing one
 * @param params A array of strings
 * @param key The param name
 * @param value The param value
 * @returns A array of strings with new key/value or overwritten value
 */
function pushOrOverwrite(params: string[], key: string, value: unknown) {
  const param = params.find((e) => e.includes(key));

  if (param !== undefined) params[params.indexOf(param)] = `${key}=${value}`;
  else params.push(`${key}=${value}`);

  return params;
}
