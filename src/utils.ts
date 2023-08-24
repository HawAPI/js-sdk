import {
  API_HEADER_CONTENT_LANGUAGE,
  API_HEADER_ITEM_TOTAL,
  API_HEADER_PAGE_INDEX,
  API_HEADER_PAGE_SIZE,
  API_HEADER_PAGE_TOTAL,
} from './Constants';
import HawAPIOptions from './HawAPIOptions';
import { Filters, Pageable } from './filters';
import { RequestResult } from './models';

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
  let params = '?';

  // Get all filters names and values
  if (filters) {
    for (const key in filters) {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        params += `${key}=${value}&`;
      }
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
  return options.endpoint + `/${options.version}${target}${params}`;
}
