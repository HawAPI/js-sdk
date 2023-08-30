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
   * Determine if data is from cache
   */
  cached?: boolean;

  /**
   * The request result/body
   */
  data?: T;
}
