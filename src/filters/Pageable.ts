/**
 * The HawAPI page options.
 */
export class Pageable {
  /**
   * The request page
   *
   * @default 0
   */
  page?: number = 0;

  /**
   * The size of items inside each page
   *
   * @default 10
   */
  size?: number = 10;

  /**
   * The sort of items inside each page
   */
  sort?: string;

  /**
   * The order of items inside each page
   *
   * Options:
   *  - Ascending (ASC)
   *  - Descending (DESC)
   *
   * @default 'ASC'
   */
  order?: string = 'ASC';

  constructor(pageable: Pageable = {}) {
    this.page = 0;
    this.size = 10;

    if (pageable.page) this.page = pageable.page;

    if (pageable.size) this.size = pageable.size;

    if (pageable.sort) this.sort = pageable.sort;

    if (pageable.order) this.order = pageable.order;
  }
}
