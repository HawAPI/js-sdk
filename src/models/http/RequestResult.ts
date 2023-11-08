export interface Quota {
  remaining?: number;
}

/**
 * Formatted result from request
 */
export interface RequestResult<T> {
  /**
   * The current page index
   */
  page?: number | undefined;

  /**
   * The item size of current page
   */
  page_size?: number | undefined;

  /**
   * The total of pages
   */
  page_total?: number | undefined;

  /**
   * The total of items in the database
   */
  item_size?: number | undefined;

  /**
   * The next page index
   */
  next_page?: number | undefined;

  /**
   * The previous page index
   */
  prev_page?: number | undefined;

  /**
   * The content language
   *
   * {@link HawAPIOptions}
   */
  language?: string | undefined;

  /**
   * The request status code
   */
  status: number;

  /**
   * The quota status
   */
  quota: Quota;

  /**
   * The etag value for the data
   */
  etag: string;

  /**
   * The total content size/length
   */
  length: number;

  /**
   * Determine if data is from cache
   */
  cached?: boolean;

  /**
   * The request result/body
   */
  data?: T;
}
