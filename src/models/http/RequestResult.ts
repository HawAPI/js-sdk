/**
 * Formatted result from request
 */
export interface RequestResult<T> {
  /**
   * The current page index
   */
  page?: number | null;

  /**
   * The item size of current page
   */
  page_size?: number | null;

  /**
   * The total of pages
   */
  page_total?: number | null;

  /**
   * The total of items in the database
   */
  item_size?: number | null;

  /**
   * The next page index
   */
  next_page?: number | null;

  /**
   * The previous page index
   */
  prev_page?: number | null;

  /**
   * The content language
   *
   * {@link HawAPIOptions}
   */
  language?: string | null;

  /**
   * The request status code
   */
  status?: number | null;

  /**
   * Determine if data is from cache
   */
  cached?: boolean;

  /**
   * The request result/body
   */
  data?: T;
}
